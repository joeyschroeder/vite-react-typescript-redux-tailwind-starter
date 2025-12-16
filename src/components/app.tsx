import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../store';
import { sampleSlice } from '../store/sample/sample';
import { TestComponent } from './test-component';

export function App() {
  const dispatch = useDispatch();

  const onIncrementClick = () => dispatch(sampleSlice.actions.increment());
  const onDecrementClick = () => dispatch(sampleSlice.actions.decrement());

  const countValue = useSelector((state: RootState) => state.sample.value);

  return (
    <>
      <TestComponent message="test" />
      <h1>Vite, React, Redux</h1>
      <p>The count value is: {countValue}</p>
      <div>
        <button type="button" onClick={onIncrementClick}>
          increase +
        </button>
        <button type="button" onClick={onDecrementClick}>
          decrease -
        </button>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}
