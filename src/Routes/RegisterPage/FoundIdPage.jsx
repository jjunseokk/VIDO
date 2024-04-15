import React from 'react';
import RegisterPageLayout from './components/RegisterPageLayout';
import FoundLoginInfo from './components/FoundLoginInfo';
import {useTranslation} from "react-i18next";

const FoundIdPage = () => {
  const {t} = useTranslation();
  return (
    <RegisterPageLayout
      title={t("find.title_id")}
      children={<FoundLoginInfo _id={true} pw={false} />}
    />
  );
};

export default FoundIdPage;
