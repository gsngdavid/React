import React, {useEffect, useState} from 'react';

const AuthContext = React.createContext(
    {
        isLoggedIn: false,
        onLogout: () => {},
        onLogin: (email, password) => {}
    }
);

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedinInformation = localStorage.getItem('isLoggedin');

    if(storedUserLoggedinInformation) {
    setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedin', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedin');
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler
  }}>
    {props.children}
  </AuthContext.Provider>

}

export default AuthContext;