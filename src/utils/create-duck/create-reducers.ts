/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { type Draft, type PayloadAction } from '@reduxjs/toolkit';
import type { NonFunction } from 'types/non-function';

import { getNormalizedStateParamName } from './get-normalized-state-parent-name';
import { isInitialStatePrimitive } from './is-initial-state-primitive';

function getActionName(key: string): string {
  const normalizedKeyName = getNormalizedStateParamName(key);
  return `update${normalizedKeyName}`;
}

interface BaseReducers<Type, State = NonFunction<Type>> {
  update: (value: State) => PayloadAction<State>;
  reset: () => PayloadAction<State>;
}

type NonBaseReducers<Type = object, State = NonFunction<Type>> = {
  [Key in keyof Type as `update${Capitalize<string & Key>}`]: (
    value: Type[Key],
  ) => PayloadAction<Type[Key]>;
} & BaseReducers<Type, State>;

export type DynamicReducers<Type> = Type extends object
  ? NonBaseReducers<Type>
  : BaseReducers<Type>;

export function createReducers<Type extends object>(
  initialState: Type,
  stateKey?: string,
): Record<string, any> {
  const reducers: Record<string, any> = {
    reset: (_state: Draft<Type>): void | Type => {
      if (!stateKey) return initialState;
    },
    update: (state: Draft<Type>, action: PayloadAction<Type>): void | Type => {
      if (!stateKey) return action.payload;
      (state as any)[stateKey] = action.payload;
    },
  };

  // If the typeof `initialState` is a primitive type, then we do not need any more
  // reducers, we simply return `update` and `reset`.
  if (isInitialStatePrimitive(initialState)) return reducers;

  Object.keys(initialState).forEach((key) => {
    const actionName = getActionName(key);

    reducers[actionName] = (
      state: Draft<Type>,
      action: PayloadAction<Type[Extract<keyof Type, string>]>,
    ): void => {
      if (!stateKey) {
        (state as any)[key] = action.payload;
      } else {
        (state as any)[stateKey][key] = action.payload;
      }
    };
  });

  return reducers;
}
