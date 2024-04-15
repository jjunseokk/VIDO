import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './ContextProvider';
import { Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from './util/recoilState';
import AxiosConfig from '../AxiosConfig';

const NoneAuthRoute = ({ authenticated, mode }) => {
  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useRecoilState(loginState);
  // const [login, setLogin] = useState('waiting');
  // const checkLogin = async () => {
  //   setLogin('waiting');
  //   setLoggedIn('waiting');
  //   const res = await AxiosConfig.get('/account/user');
  //   if (res.data.statusCode == 200) {
  //     setLogin(true);
  //     setLoggedIn(true);
  //   } else {
  //     setLogin(false);
  //     setLoggedIn(false);
  //   }
  // };
  // useEffect(() => {
  //   checkLogin();
  //   console.log('recoil' + loggedIn);
  //   console.log('useState' + login);
  // }, []);
  useEffect(() => {
    if (authenticated == true) {
      navigate('/');
    }
  }, [authenticated]);

  return <Outlet />;
};

export default NoneAuthRoute;
