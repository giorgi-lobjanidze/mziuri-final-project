import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoaderProvider } from './context/LoaderContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext.jsx';
import './i18n/i18n.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CartProvider>
        <WishlistProvider>
          <UserProvider>
            <LoaderProvider>
              <App />
            </LoaderProvider>
          </UserProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  </StrictMode>
);
