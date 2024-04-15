import React, { useContext, useEffect, useState } from 'react';
import { Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { loginState, userBaseInfoState } from './util/recoilState';
import { useRecoilState, useRecoilValue } from 'recoil';

const AuthRoute = ({ authenticated }) => {
  const loggedIn = useRecoilValue(loginState);
  const [login, setLogin] = useState('waiting');
  const navigate = useNavigate();
  // useEffect(() => {
  //   setLogin(loggedIn);
  // }, [loggedIn]);
  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }
  }, [authenticated]);
  // return login ? (
  //   <Outlet />
  // ) : (
  //   // <Outlet />
  //   <Navigate to="/login" />
  // );
  return <Outlet />;
};

export default AuthRoute;
