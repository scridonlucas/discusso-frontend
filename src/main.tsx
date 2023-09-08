import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';

import store from './app/store.ts';
import queryClient from './app/query.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
