import React from 'react';
import MarketingTermEN from "../data/MarketingTermEN";
import MarketingTermKO from "../data/MarketingTermKO";

const TermMarketing = (
    {language}
) => {
    const getTerms = () => {
        if (language === "en") {
            return (<MarketingTermEN />)
        }

        return (<MarketingTermKO />)
    }

    return (
        <>
            {getTerms()}
        </>
    )
};

export default TermMarketing;
