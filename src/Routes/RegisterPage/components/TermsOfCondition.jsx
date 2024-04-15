import React, { useCallback, useEffect, useState } from 'react';
import RegisterBtn from './RegisterBtn';
import { AnimatePresence, motion } from 'framer-motion';
import { TermsConditionStyle } from './TermsConditionStyle';
import TermsFull from './TermsFull';
import {useTranslation} from "react-i18next";

import ko_terms from '../data/ko_terms.json';
import en_terms from '../data/en_terms.json';
import {i18n} from "../../../language/i18n";

const TermsOfCondition = ({ num , mode }) => {
  const {t} = useTranslation();
  const [neccessitySelected, setNeccesitySelected] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const [popup, setPopup] = useState(false);
  const [whichTerm, setWhichTerm] = useState(1);
  const [marketingCollect, setMarketingCollect] = useState(false);
  const [marketingSend, setMarketingSend] = useState(false);
  const [language, setLanguage] = useState("ko");
  const [terms, setTerms] = useState(null);

  const handleNeccessityCheck = (e) => {
    e.target.checked
      ? setNeccesitySelected((current) => current + 1)
      : setNeccesitySelected((current) => current - 1);
  };
  const handleMarketingCollectCheck = (e) => {
    e.target.checked ? setMarketingCollect(true) : setMarketingCollect(false);
  };
  const handleMarketingSendCheck = (e) => {
    e.target.checked ? setMarketingSend(true) : setMarketingSend(false);
  };
  const onCheckedAll = (checked) => {
    if (checked) {
      let checkedListArray = [];
      terms.forEach((term) => checkedListArray.push(term));
      setCheckedList(checkedListArray);
      setNeccesitySelected(2);
      setMarketingCollect(true);
      setMarketingSend(true);
    } else {
      setCheckedList([]);
      setNeccesitySelected(0);
      setMarketingCollect(false);
      setMarketingSend(false);
    }
  };
  const onCheckedElement = (checked, term) => {
    if (checked) {
      setCheckedList([...checkedList, term]);
    } else {
      setCheckedList(checkedList.filter((el) => el !== term));
    }
  };
  const showPopup = (index) => {
    console.log(index);
    setPopup(true);
    setWhichTerm(index);
    // setFullterm(index);
  };

  useEffect(() => {
    if(i18n.language === "en") {
      setTerms(en_terms);
    } else {
      setTerms(ko_terms);
    }
    setLanguage(i18n.language)
  }, [i18n.language]);

  return (
    <>
      <AnimatePresence>
        {popup ? <TermsFull setPopup={setPopup} whichTerm={whichTerm} language={language} /> : null}
      </AnimatePresence>
      <TermsConditionStyle mode={mode}>
        <h1>{t("signup.terms_title")}</h1>
        <div className="box">
          <form>
            <ul className="termUl">
              {terms != null ? terms.map((term, index) => (
                <li key={index}>
                  {term.neccessity ? (
                    <input
                      type="checkbox"
                      id={term.term + index}
                      onChange={(e) => {
                        handleNeccessityCheck(e);
                        onCheckedElement(e.target.checked, term);
                      }}
                      checked={checkedList.includes(term) ? true : false}
                    />
                  ) : term.marketingCollect ? (
                    <input
                      type="checkbox"
                      id={term.term + index}
                      onChange={(e) => {
                        handleMarketingCollectCheck(e);
                        onCheckedElement(e.target.checked, term);
                      }}
                      checked={checkedList.includes(term) ? true : false}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      id={term.term + index}
                      onChange={(e) => {
                        handleMarketingSendCheck(e);

                        onCheckedElement(e.target.checked, term);
                      }}
                      checked={checkedList.includes(term) ? true : false}
                    />
                  )}
                  <label htmlFor={term.term + index}>
                    <p>
                      {term.neccessity ? (
                        <span className="nec">{t("signup.must")}</span>
                      ) : (
                        <span style={{ color: '#151515' }}>{t("signup.selection")}</span>
                      )}
                      {term.term}
                    </p>
                  </label>
                  <span onClick={() => showPopup(index)} className="readAll">
                    {t("signup.show_all")}
                  </span>
                </li>
              )): null}
            </ul>
            <hr />
            <input
              id="selectAll"
              type="checkbox"
              onChange={(e) => onCheckedAll(e.target.checked)}
              checked={
                checkedList.length === 0
                  ? false
                  : checkedList.length === terms.length
                  ? true
                  : false
              }
            />
            <label htmlFor="selectAll">{t("signup.all")}</label>
            <p>{t("signup.all_comment")}</p>
            <RegisterBtn
              context={t("signup.next")}
              disabled={neccessitySelected === 2 ? false : true}
              link={'/signup/infoRegister'}
              state={{
                userType: num,
                marketingCollectInfo: marketingCollect,
                marketingSendInfo: marketingSend,
              }}
            />
          </form>
        </div>
      </TermsConditionStyle>
    </>
  );
};

export default TermsOfCondition;
