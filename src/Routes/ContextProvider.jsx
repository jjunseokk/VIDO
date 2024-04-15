import React, { createContext, useState, useEffect } from 'react';
// import useInterval from './MyPage/utils/useInterval';
// import AxiosAdminConfig from '../AxiosAdminConfig';

import AxiosConfig from '../AxiosConfig';

export const UserContext = createContext('');

const ContextProvider = ({ children }) => {
  // 개발
  // const serverAddress = import.meta.env.VITE_BASE_ADDRESS;

  // 실서버
  const serverAddress = 'https://vido.gallery:8443';
  
  // const adminServerAddress = 'https://office.vers.kr:8443/admin/';
  const adminServerAddress = import.meta.env.VITE_ADMIN_URL;
  // const serverAddress = 'https://192.168.0.162:8080/';
  const [loggedIn, setLoggedIn] = useState();
  const setLoggedInHandler = (value) => {
    setLoggedIn(value);
  };
  const [isAdmin, setIsAdmin] = useState(true);

  const setIsAdminHandler = (value) => {
    setIsAdmin(value);
  };
  const [loginLoading, setLoginLoading] = useState(true);
  const setLoginLoadingHandler = (value) => {
    setLoginLoading(value);
  };

  // useInterval(() => getLoggedIn(), 60000);
  const [id, setId] = useState('');
  const [nickName, setNickname] = useState('');
  const [userData, setUserData] = useState(false);
  const url = 'https://office.vers.kr:8443';

  return (
    <UserContext.Provider
      value={{
        serverAddress,
        userData,
        setUserData,
        loggedIn,
        setLoggedInHandler,
        id,
        nickName,
        setLoginLoadingHandler,
        loginLoading,
        isAdmin,
        setIsAdmin,
        setIsAdminHandler,
        adminServerAddress,
        url,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
