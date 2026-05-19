import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case '/':
        document.title = 'Brew Bliss - Craft Beer, Delivered Fresh';
        break;
      case '/about':
        document.title = 'Our Story - Brew Bliss';
        break;
      case '/blog':
        document.title = 'Beer Blog - Brew Bliss';
        break;
      case '/cart':
        document.title = 'Your Cart - Brew Bliss';
        break;
      case '/checkout':
        document.title = 'Checkout - Brew Bliss';
        break;
      case '/contact':
        document.title = 'Get in Touch - Brew Bliss';
        break;
      case '/login':
        document.title = 'Sign In - Brew Bliss';
        break;
      case '/profile':
        document.title = 'My Profile - Brew Bliss';
        break;
      case '/register':
        document.title = 'Join the Brewery - Brew Bliss';
        break;
      case '/shop':
        document.title = 'Shop Our Beers - Brew Bliss';
        break;
      case '/wishlist':
        document.title = 'My Wishlist - Brew Bliss';
        break;
      default:
        if (pathname.startsWith('/shop/')) {
          document.title = 'Beer Details - Brew Bliss';
        } else {
          document.title = 'Brew Bliss - Craft Beer, Delivered Fresh';
        }
    }
  }, [pathname]);
};

export default useDocumentTitle;