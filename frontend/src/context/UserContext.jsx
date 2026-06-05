import { createContext, useState, useContext } from 'react';

const UserContext = createContext({ userData: null });

export const useUserData = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (userData) => {
    setUserData(userData);
    setLoggedIn(true);
  };

  const logout = async () => {
    await fetch('/api/users/logout', { method: 'POST' });
    setUserData(null);
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ loggedIn, userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
