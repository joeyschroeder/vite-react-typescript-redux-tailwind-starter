import { TestComponent } from 'components/test-component';
import { useDispatch, useSelector } from 'react-redux';
import { sampleSlice } from 'store/sample';

import type { RootState } from '../store';

export function App() {
  const dispatch = useDispatch();

  const countValue = useSelector((state: RootState) =>
    sampleSlice.selectors.selectValue(state),
  );

  const onIncrementClick = () =>
    dispatch(sampleSlice.actions.updateValue(countValue + 1));
  const onDecrementClick = () =>
    dispatch(sampleSlice.actions.updateValue(countValue - 1));

  // const onUpdateClick = () =>
  //   dispatch(sampleSlice.actions.update({ value: 10 }));
  // const onResetClick = () => dispatch(sampleSlice.actions.reset());

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
