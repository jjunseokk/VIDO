import { React, useContext, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import SignupPage from './RegisterPage/SignupPage';
import TermsOfConditionPagePerson from './RegisterPage/TermsOfConditionPagePerson';
import TermsOfConditionPageComp from './RegisterPage/TermsOfConditionPageComp';
import InfoRegisterPage from './RegisterPage/InfoRegisterPage';
import RegisterDonePage from './RegisterPage/RegisterDonePage';
import NotFoundPage from './MainPage/NotFoundPage';
import NoneAuthRoute from './NoneAuthRoute';
import { UserContext } from './ContextProvider';
import { AnimatePresence, motion } from 'framer-motion';

const RegisterRoutes = () => {
  const location = useLocation();
  const loggedIn = useContext(UserContext);

  return (
    <Route key={location.pathname}>
      <Route path="/signup" element={<Header />}>
        <Route
          path="/signup"
          element={<NoneAuthRoute authenticated={loggedIn} />}
        >
          <Route path="" element={<SignupPage />} />
          <Route
            path="terms-and-conditions-pers"
            element={<TermsOfConditionPagePerson />}
          />
          <Route
            path="terms-and-conditions-comp"
            element={<TermsOfConditionPageComp />}
          />
          <Route path="infoRegister" element={<InfoRegisterPage />} />
          <Route path="registerDone" element={<RegisterDonePage />} />
        </Route>
      </Route>
    </Route>
  );
};

export default RegisterRoutes;
