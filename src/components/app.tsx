import { TestComponent } from 'components/test-component';
import { useDispatch, useSelector } from 'react-redux';
import { sampleSlice } from 'store/sample';

import type { RootState } from '../store';

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
        <button
          type="button"
          onClick={onIncrementClick}
          className="mr-1 rounded border p-1"
        >
          increase +
        </button>
        <button
          type="button"
          onClick={onDecrementClick}
          className="rounded border p-1"
        >
          decrease -
        </button>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}
