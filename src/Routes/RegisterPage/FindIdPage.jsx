import React from 'react';
import RegisterPageLayout from './components/RegisterPageLayout';
import FindLoginInfo from './components/FindLoginInfo';
import {useTranslation} from "react-i18next";

const FindIdPage = ({mode}) => {
  const {t} = useTranslation();
  return (
    <RegisterPageLayout
      title={t("find.title_id")}
      children={<FindLoginInfo id_={true} pw={false} />}
      mode={mode}
    />
  );
};

export default FindIdPage;
