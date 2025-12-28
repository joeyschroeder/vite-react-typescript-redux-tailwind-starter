import type { SliceSelectors } from '@reduxjs/toolkit';

import type { NonFunction } from '../../types/non-function';
import { getNormalizedStateParamName } from './get-normalized-state-parent-name';
import { isInitialStatePrimitive } from './is-initial-state-primitive';

function getSelectorName(key = ''): string {
  const normalizedKeyName = getNormalizedStateParamName(key);
  return `select${normalizedKeyName}`;
}

interface PrimitiveSelectors<Type, State = NonFunction<Type>> {
  selectState: (state: object) => State;
}

type NonPrimitiveSelectors<Type = object, State = NonFunction<Type>> = {
  [Key in keyof State as `select${Capitalize<string & Key>}`]: (
    state: object,
  ) => State[Key];
} & PrimitiveSelectors<Type, State>;

export type DynamicSelectors<Type> = Type extends object
  ? NonPrimitiveSelectors<Type>
  : PrimitiveSelectors<Type>;

export function createSelectors<Type = object>(
  selectState: (state: object) => any,
  initialState: Type,
): SliceSelectors<any> {
  const selectors: Record<string, any> = {
    selectState: (state: object): Type => selectState(state),
  };

  // If the typeof `initialState` is a primitive type, then we do not need any more
  // selectors, we simply return `selectState`.
  const initialStateIsPrimitive = isInitialStatePrimitive(initialState);
  if (initialStateIsPrimitive) return selectors;

  Object.entries(initialState as Record<string, any>).forEach(
    ([key, initialStateValue]) => {
      const selectorName = getSelectorName(key);

      selectors[selectorName] = (state: object): any => {
        const value = selectState(state)?.[key];
        if (value === undefined) return initialStateValue;

        return value;
      };
    },
  );

  return selectors;
}
