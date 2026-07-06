import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';
import './styles/style.scss';
import Home from './routes/Home';
import About from './routes/About';
import Blog from './routes/Blog';
import Cart from './routes/Cart';
import Checkout from './routes/Checkout';
import Contact from './routes/Contact';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Profile from './routes/Profile';
import Register from './routes/Register';
import Shop from './routes/Shop';
import SingleProduct from './routes/SingleProduct';
import Wishlist from './routes/Wishlist';
import useDocumentTitle from './hooks/useDocumentTitle';
import useScrollTop from './hooks/useScrollTop';
import useAppScale from './hooks/useAppScale';
import { useLoader } from './context/LoaderContext';
import Spinnerloader from './components/Spinnerloader';
import ForgotPasword from './routes/ForgotPasword';
import ResetPassword from './routes/ResetPassword';
import ScrollToTopButton from './components/ScrollToTopButton';
import Addresses from './routes/Addresses';
import MobileBottomNav from './components/MobileBottomNav';

function App() {
  useDocumentTitle();
  useScrollTop();
  useAppScale();

  const { loading } = useLoader();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Header
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      <Main>
        {loading && <Spinnerloader />}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/blog"
            element={<Blog />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/checkout"
            element={<Checkout />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPasword />}
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/shop"
            element={<Shop />}
          />
          <Route
            path="/shop/:id"
            element={<SingleProduct />}
          />
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />
          <Route
            path="/addresses"
            element={<Addresses />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
        <ScrollToTopButton />
      </Main>
      <Footer />
      <MobileBottomNav
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      <div className="mobile-bottom-nav-spacer" />
    </>
  );
}

export default App;
