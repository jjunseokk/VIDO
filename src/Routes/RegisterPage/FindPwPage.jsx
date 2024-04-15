import React from 'react';
import RegisterPageLayout from './components/RegisterPageLayout';
import FindLoginInfo from './components/FindLoginInfo';
import {useTranslation} from "react-i18next";

const FindPwPage = ({mode}) => {
  const {t} = useTranslation();
  return (
    <RegisterPageLayout
      title={t("find.title")}
      children={<FindLoginInfo id_={false} pw={true} />}
      mode={mode}
    />
  );
};

export default FindPwPage;
