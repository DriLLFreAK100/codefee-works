import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { withStore } from '@codefee/model';

import App from './app/app';

const AppWithStore = withStore(App);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AppWithStore />
  </StrictMode>
);
