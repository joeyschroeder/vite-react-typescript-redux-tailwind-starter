import { createSlice, type Reducer } from '@reduxjs/toolkit';

import { createPath } from './create-path';
import { createReducers, type DynamicReducers } from './create-reducers';
import { createSelectState } from './create-select-state';
import { createSelectors, type DynamicSelectors } from './create-selectors';

interface Config<Type> {
  name: string | string[];
  initialState: Type;
}

interface Duck<Type> {
  actions: DynamicReducers<Type>;
  config: Config<Type>;
  initialState: Type;
  name: string;
  path: string;
  reducer: Reducer;
  selectors: DynamicSelectors<Type>;
}

export function createDuck<Type extends object>(
  config: Config<Type>,
): Duck<Type> {
  const { initialState = {}, name } = config;

  if (!name) throw new Error('Name is required');

  const path = createPath(name);
  const selectState = createSelectState(path, initialState);

  const initialStateSelectors = createSelectors(selectState, initialState);
  const initialStateReducers = createReducers(initialState);

  const slice = createSlice({
    initialState,
    name: path,
    reducers: initialStateReducers,
    selectors: initialStateSelectors,
  });

  return {
    actions: slice.actions,
    config,
    initialState,
    name,
    path,
    reducer: slice.reducer,
    selectors: {
      ...slice.getSelectors(),
      selectState,
    },
  } as Duck<Type>;
}
