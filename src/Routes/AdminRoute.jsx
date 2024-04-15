import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './ContextProvider';
import { Route, Navigate, Outlet } from 'react-router-dom';
import AxiosAdminConfig from '../AxiosAdminConfig';

const AdminRoute = () => {
  const { isAdmin } = useContext(UserContext);
  return isAdmin ? (
    <Outlet />
  ) : (
    // <Outlet />
    <Navigate to="/admin" />
  );
};

export default AdminRoute;
