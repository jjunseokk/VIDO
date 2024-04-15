import React from 'react';
import PersonalTermEN from "../data/PersonalTermEN";
import PersonalTermKO from "../data/PersonalTermKO";

const TermPersonalInfo = (
    {language}
) => {

  const getTerms = () => {
    if(language === "en") {
      return (<PersonalTermEN />)
    }

    return (<PersonalTermKO />)
  }

  return (
    <>
      {getTerms()}
    </>
  );
};

export default TermPersonalInfo;
