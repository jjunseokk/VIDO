import React from 'react';
import RegisterPageLayout from './components/RegisterPageLayout';
import FoundLoginInfo from './components/FoundLoginInfo';
import {useTranslation} from "react-i18next";

const FoundPwPage = ({mode}) => {
    const {t} = useTranslation();
  return (
    <RegisterPageLayout mode={mode} title={t("find.title")}>
      <FoundLoginInfo />
    </RegisterPageLayout>
  );
};

export default FoundPwPage;
