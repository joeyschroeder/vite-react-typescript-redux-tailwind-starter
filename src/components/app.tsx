import { useState } from 'react';

import { TestComponent } from './test-component';

export function App() {
  const [countValue, setCountValue] = useState(0);

  return (
    <>
      <TestComponent message="test" />
      <h1>Vite + React</h1>
      <div>
        <button
          onClick={() => setCountValue((count) => count + 1)}
          type="button"
        >
          count is {countValue}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}
