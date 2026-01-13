import {
  createSlice,
  type Reducer,
  type SliceSelectors,
} from '@reduxjs/toolkit';
import { camelCase } from 'lodash';

import { createPath } from './create-path';
import { createReducers, type DynamicReducers } from './create-reducers';
import { createSelectState } from './create-select-state';
import { createSelectors, type DynamicSelectors } from './create-selectors';

interface Config<Type> {
  extraReducers?: (builder: any) => void;
  extraSelectors?: SliceSelectors<any>;
  initialState: Type;
  name: string;
  reducers?: Record<string, any>;
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
  const {
    extraReducers,
    extraSelectors,
    initialState = {},
    name: nameParam = '',
    reducers,
  } = config;

  if (!nameParam) throw new Error('"name" is required.');

  const name = camelCase(nameParam);
  if (name !== nameParam) {
    // eslint-disable-next-line no-console
    console.warn(
      `"${nameParam}" is not camelCase. The name will be converted to "${name}".`,
    );
  }

  const path = createPath(name);
  const selectState = createSelectState(path, initialState);

  const initialStateSelectors = createSelectors(selectState, initialState);
  const initialStateReducers = createReducers(initialState);

  const slice = createSlice({
    extraReducers,
    initialState,
    name: path,
    reducers: { ...initialStateReducers, ...reducers },
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
      ...extraSelectors,
      selectState,
    },
  } as Duck<Type>;
}
