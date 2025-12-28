import { createDuck } from 'utils/create-duck/create-duck';

interface SampleState {
  value: number;
}

const initialState: SampleState = {
  value: 0,
};

export const sampleSlice = createDuck({
  name: 'sample',
  initialState,
});
