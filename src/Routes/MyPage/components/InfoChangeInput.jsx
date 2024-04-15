import React, { useState, useEffect } from 'react';
import {useTranslation} from "react-i18next";

const InfoChangeInput = ({ val = '', setVal, checkExist, maxLength = 20 }) => {
  const {t} = useTranslation();
  const [input, setInput] = useState(false);
  const [value, setValue] = useState(val);
  useEffect(() => {
    setVal ? setVal(value) : null;
  }, [value]);
  useEffect(() => {
    !input ? setValue(val) : null;
  }, [input]);
  return (
    <div>
      {input && setVal ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
        />
      ) : (
        <p>{val}</p>
      )}
      {setVal ? (
        input ? (
          <span onClick={() => checkExist(value)}>{t("mypage.info.change.check")}</span>
        ) : (
          <span onClick={() => setInput(true)}>{t("mypage.info.change.change")}</span>
        )
      ) : null}
    </div>
  );
};

export default InfoChangeInput;
