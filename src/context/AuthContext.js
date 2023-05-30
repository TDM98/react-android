import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);


  // register
  const register = (name, email, password) => {
    setLoading(true);

    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      })
      .then(res => {
        let user = res.data;
        setUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
      })
      .catch(e => {
        console.log(`Error on register ${e.message}`);
      });
  };

  //login
  const login = (username, password) => {
    setLoading(true);

    axios
      .post(`${BASE_URL}/authenticate`, {username, password})
      .then(res => {
        let user = res.data;
        setUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on login ${e.message}`);
      });
  };


  //log out
  const logout = () => {
    setLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${user.id_token}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('user');
        setUser({});
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on logout ${e.message}`);
      });
  };


  const isLoggedIn = async () => {
    setSplashLoading(true);

    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    if (user) {
      setUser(user);
    }

    setSplashLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{login, register, logout, loading, user, splashLoading}}>
      {children}
    </AuthContext.Provider>
  );
};