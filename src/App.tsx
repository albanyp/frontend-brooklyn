import React, { useState } from 'react'
import './App.css';
import AuthModule from 'modules/auth/routes';
import { AuthContext } from 'contexts/AuthContext';
import { HomeModule } from 'modules/home/routes';
import { storage } from 'utils/storage';
import { isTokenValid } from 'utils/helpers';
import { MediaModule } from 'modules/media/routes';

export const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem('auth') && isTokenValid(localStorage.getItem('auth')))
    
  const login = (auth) => {
    setAuth(auth)
    storage.setObject('auth', auth)
  }
  
  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      login 
    }}>
      <AuthModule />
      <HomeModule />
      <MediaModule />
    </AuthContext.Provider>
  );
}
