import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SelectDropDown from '../../Components/SelectDropdown';
import px2vw from '../../util/px2vw';
import { motion, AnimatePresence } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';
import { instagram, youtube } from '../../util/Regex';
import {i18n} from "../../../language/i18n";
import {useTranslation} from "react-i18next";

const Div = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 8px;
  li.disable {
    cursor: default;
    color: #707070;
    background-color: #e0e0e0;
    &:hover {
      background-color: #e0e0e0;
      color: #707070;
    }
  }
  > div {
    > input.url {
      position: relative;
      left: 8px;
      top: -1px;
      height: 30px;
      width: ${px2vw(648)};
      padding: 0 4px;
      background-color: #f8f8f8;
      &:disabled {
        ::placeholder {
          color: #b0b0b0;
        }
      }
    }
  }
  > p {
    position: absolute;
    right: 0;
    top: 3px;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};
    color: #707070;
    &:hover {
      color: ${({ theme }) => theme.mainColor};
    }
  }
  @media (max-width: 1428px) {
    > div {
      &:nth-of-type(1) {
        background-size: 12px;
        background-position: 92%;
        p {
          font: 600 10px/24px ${({ theme }) => theme.noto};
          height: 24px;
        }
        > ul {
          top: 24px;
          li {
            font: 400 10px/24px ${({ theme }) => theme.noto};
          }
        }
      }
      > input.url {
        height: 24px;
      }
    }
    > p {
      top: 1px;
      > img {
        width: 10px;
      }
    }
  }
  @media (max-width: 1064px) {
    > div {
      &:nth-of-type(1) {
        background-size: 10px;
        background-position: 95%;
        p {
          font: 600 10px/24px ${({ theme }) => theme.noto};
          height: 24px;
          width: 70px;
        }
        > ul {
          top: 24px;
          li {
            width: 70px;
            font: 400 10px/24px ${({ theme }) => theme.noto};
          }
        }
      }
      > input.url {
        height: 24px;
      }
    }
    > p {
      top: 1px;
      > img {
        width: 10px;
      }
    }
  }
  @media (max-width: 776px) {
    > div {
      &:nth-of-type(1) {
        background-size: 10px;
        background-position: 95%;
        p {
          font: 600 10px/24px ${({ theme }) => theme.noto};
          height: 24px;
          width: 70px;
        }
        > ul {
          top: 24px;
          li {
            width: 70px;
            font: 400 10px/24px ${({ theme }) => theme.noto};
          }
        }
      }
      > input.url {
        height: 24px;
      }
    }
    > p {
      top: 1px;
      > img {
        width: 10px;
      }
    }
  }
`;

const AddLinkInfo = ({
  urlTypeList,
  selectUrlType,
  urlChange,
  valueUrlType,
  valueUrl,
  idx,
  deleteItem,
}) => {
  const {t} = useTranslation();
  const linkKo = ['홈페이지', '유튜브', '인스타그램'];
  const linkEn = ["Web", "Youtube", "Instagram"];
  const [urlType, setUrlType] = useState(valueUrlType);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState(valueUrl);
  const [links, setLinks] = useState(null);

  const handleUrlChange = (e) => {
    if (!urlTypeList.includes('인스타그램')) {
      instagram.test(e.target.value) ? setUrlType('인스타그램') : null;
    }
    if (!urlTypeList.includes('유튜브')) {
      youtube.test(e.target.value) ? setUrlType('유튜브') : null;
    }
    setUrl(e.target.value);
    urlChange(e.target.value, idx);
  };

  useEffect(() => {
    selectUrlType(urlType, idx);
  }, [urlType]);

  useEffect(() => {
    if(i18n.language === "en") {
      setLinks(linkEn);
    } else {
      setLinks(linkKo);
    }
  }, [i18n.language]);
  // useEffect(() => {
  //   urlChange(url, idx);
  // }, [url]);
//mypage.info.change.link (en)' returned an object instead of string.
  return (
    <Div>
      <SelectDropDown height="30px">
        {links? <p onClick={() => setShow((prev) => !prev)}>{valueUrlType !== "선택하기" ? links[linkKo.indexOf(valueUrlType)]: t("mypage.info.change.link.select")}</p>
            : <p onClick={() => setShow((prev) => !prev)}>{valueUrlType !== "선택하기" ? linkKo[linkKo.indexOf(valueUrlType)]: t("mypage.info.change.link.select")}</p>}

        <AnimatePresence>
          {show ? (
            <motion.ul
              variants={FramerMotionAnimate[3]}
              initial="initial"
              animate="animate"
              transition="transition"
              exit="exit"
              onClick={() => setShow((prev) => !prev)}
            >
              {links != null ? links.map((value, index) => (
                <li
                  key={linkKo[index]}
                  className={urlTypeList.includes(value) ? 'disable' : null}
                  onClick={() =>
                    urlTypeList.includes(linkKo[index]) ? null : setUrlType(linkKo[index])
                  }
                >
                  {value}
                </li>
              )): null}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </SelectDropDown>
      <div>
        <input
          className="url"
          value={valueUrl}
          onChange={(e) => handleUrlChange(e)}
          placeholder={
            urlType === "선택하기" ? t("mypage.info.change.link.select_hint") : t("mypage.info.change.link.input_hint")
          }
          disabled={urlType === '선택하기'}
        />
      </div>
      <p onClick={() => deleteItem(idx)}>
        <img src="/img/delete-link.svg" />
      </p>
    </Div>
  );
};

export default AddLinkInfo;
