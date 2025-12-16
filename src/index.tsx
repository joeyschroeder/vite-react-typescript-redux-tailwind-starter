import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './components/app';
import { store } from './store';

const ELEMENT_ID = 'root';
const container = document.getElementById(ELEMENT_ID);

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error(
    `Root element with ID '${ELEMENT_ID}' was not found in the document. Ensure there is acorresponding HTML element with the ID '${ELEMENT_ID}' in your HTML file.`,
  );
}
