import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AcademicErrorBoundary } from './components/common/AcademicErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AcademicErrorBoundary fallbackTitle="Academic Portal Encountered an Interruption">
      <App />
    </AcademicErrorBoundary>
  </React.StrictMode>,
);
