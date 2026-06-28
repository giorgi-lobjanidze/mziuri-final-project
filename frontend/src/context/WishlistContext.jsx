import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useUserData } from './UserContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { loggedIn, userData, authChecked } = useUserData();
  const hasLoadedFromUser = useRef(false);

  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (authChecked && loggedIn && userData?.wishlist && !hasLoadedFromUser.current) {
      setWishlist(userData.wishlist);
      hasLoadedFromUser.current = true;
    }
    if (authChecked && !loggedIn) {
      hasLoadedFromUser.current = false;
    }
  }, [authChecked, loggedIn, userData]);

  useEffect(() => {
    if (!loggedIn || !hasLoadedFromUser.current) return;

    const syncWishlist = async () => {
      try {
        const tokenRes = await fetch('/api/users/get-token', { credentials: 'include' });
        const tokenData = await tokenRes.json();
        if (tokenData.err) return;

        await fetch('/api/users/update-wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: tokenData.data },
          credentials: 'include',
          body: JSON.stringify({ wishlist }),
        });
      } catch (err) {
        console.error('Wishlist sync error:', err);
      }
    };

    syncWishlist();
  }, [wishlist, loggedIn]);

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (id) => wishlist.some((p) => p.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
