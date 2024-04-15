import React from 'react';
import ServiceTermsEN from "../data/ServiceTermsEN";
import ServiceTermsKO from "../data/ServiceTermsKO";

const TermMain = (
    {language}
) => {

    const getTerms = () => {
        if(language === "en") {
            return (<ServiceTermsEN />)
        }

        return (<ServiceTermsKO />)
    }

  return (
    <>
        {getTerms()}
    </>
  );
};

export default TermMain;
