import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext({ userData: null });

export const useUserData = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const login = (userData) => {
    setUserData(userData);
    setLoggedIn(true);
  };

  const logout = async () => {
    await fetch('/api/users/logout', { method: 'POST', credentials: 'include' });
    setUserData(null);
    setLoggedIn(false);
  };

  // ✅ restore session on page load/refresh using the httpOnly cookie
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const tokenRes = await fetch('/api/users/get-token', { credentials: 'include' });
        const tokenData = await tokenRes.json();

        if (tokenData.err) {
          setAuthChecked(true);
          return;
        }

        const userRes = await fetch('/api/users/get-user', {
          headers: { Authorization: tokenData.data },
          credentials: 'include',
        });
        const userData = await userRes.json();

        if (userData.data) {
          setUserData(userData.data);
          setLoggedIn(true);
        }
      } catch (err) {
        console.error('Session restore error:', err);
      } finally {
        setAuthChecked(true);
      }
    };

    restoreSession();
  }, []);

  return (
    <UserContext.Provider value={{ loggedIn, userData, login, logout, authChecked }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
