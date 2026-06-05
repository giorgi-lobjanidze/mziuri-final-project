import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoaderProvider } from './context/LoaderContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </UserProvider>
    </Router>
  </StrictMode>
);
