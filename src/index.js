import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import store from './redux/store';
import { ErrorBoundary } from 'react-error-boundary';
import Button from './components/styled-components/button';
import Dashboard from './components/DashboardModule/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-boundary" role="alert">
      <p>Something went wrong:</p>
      <pre>Error message: {error.message}</pre>
      <Button
        onClick={resetErrorBoundary}
        text="Try again"
        style={{
          backgroundColor: "#ff6666",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          fontSize: "16px"
        }}
      />
    </div>
  )
}

root.render(
  <Provider store={store}>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}>
      <Dashboard />
    </ErrorBoundary>
  </Provider>
);
