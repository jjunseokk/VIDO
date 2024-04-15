import React, { useState } from 'react';
import styled from 'styled-components';
import AxiosConfig from '../../../AxiosConfig';
import BtnSmall from '../../Components/BtnSmall';
import OpenMenuSvg from '../../Components/OpenMenuSvg';
import {useTranslation} from "react-i18next";

const Div = styled.div`
  > div.dropDown {
    margin-bottom: 24px;
    > p {
      display: block;
      border: ${({ theme }) => theme.border};
      border-radius: 4px;
      width: 290px;
      height: 40px;
      color: #333333;
      font: 400 18px/40px ${({ theme }) => theme.noto};
      padding-left: 12px;
      cursor: pointer;
      position: relative;
      background-color: #fff;
      letter-spacing: -0.36px;
      > span {
        position: absolute;
        right: 12px;
      }
    }
    > ul {
      position: absolute;
      width: 290px;
      border: ${({ theme }) => theme.border};
      border-radius: 4px;

      > li {
        padding-left: 12px;
        font: 400 18px/40px ${({ theme }) => theme.noto};
        cursor: pointer;
        background-color: #fff;
        transition: ${({ theme }) => theme.transition};
        &:hover {
          color: ${({ theme }) => theme.highlightColor};
          background-color: #f0f0f0;
        }
      }
    }
  }
  textArea,
  input {
    width: ${({ theme }) => theme.pgWidth};
    border: ${({ theme }) => theme.border};
    color: #333;
    font: 500 16px/24px ${({ theme }) => theme.noto};
    border-radius: 4px;
    &::placeholder {
      color: #707070;
    }
  }
  input {
    font: 500 16px/40px ${({ theme }) => theme.noto};
    height: 40px;
    margin-bottom: 24px;
    padding: 0 12px;
  }
  textArea {
    resize: none;
    height: 511px;
    padding: 20px 12px;
    margin-bottom: 27px;
    &::placeholder {
    }
    &:focus {
      outline: none;
    }
  }
  &.disabled {
    > div.dropDown {
      > p {
        cursor: default;
        color: #707070;
        background-color: #f0f0f0;
      }
    }
  }
  button {
    display: block;
    width: 180px;
    height: 48px;
    border-radius: 24px;
    border: ${({ theme }) => theme.border};
    font: 500 18px ${({ theme }) => theme.noto};
    letter-spacing: 1.08px;
    color: #363636;
    margin: 0 auto;
    transition: ${({ theme }) => theme.transition};
    &:hover {
      border: 1px solid ${({ theme }) => theme.highlightColor};
      color: ${({ theme }) => theme.mainColor};
    }
    &:disabled {
      cursor: default;
      &:hover {
        border: ${({ theme }) => theme.border};
        color: #363636;
      }
    }
  }
`;

const Popup = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  > div {
    width: 400px;
    height: 172px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: #fff;
    > img {
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
    }
    > p {
      margin-top: 48px;
      margin-bottom: 24px;
      text-align: center;
      font: 600 14px/20px ${({ theme }) => theme.noto};
      letter-spacing: -0.35px;
    }
    > div {
      margin: 0 auto;
    }
  }
`;

const SendAsk = ({ disabled }) => {
  const {t} = useTranslation();
  const categoryList = [
    t("service.inquiry.category.service"),
    t("service.inquiry.category.collector"),
    t("service.inquiry.category.artist"),
    t("service.inquiry.category.account"),
    t("service.inquiry.category.etc"),
  ];
  const [selected, setSelected] = useState(categoryList[0]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [popup, setPopup] = useState(false);

  const sendAsk = () => {
    const ask = {
      type: selected,
      title: title,
      content: text,
    };

    AxiosConfig.post(`contact/inquiry`, ask).then((res) => {
      if (res.data.statusCode == 200) {
        setPopup(true);
        setText('');
        setTitle('');
      }
    });
  };
  return (
    <>
      <Div className={disabled ? 'disabled' : null}>
        <div className="dropDown">
          <p onClick={() => (disabled ? null : setShow((prev) => !prev))}>
            {selected}
            <span>
              <OpenMenuSvg />
            </span>
          </p>
          {show ? (
            <ul>
              {categoryList.map((val, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setShow(false);
                    setSelected(val);
                  }}
                >
                  {val}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <form>
          <input
            placeholder={t("service.inquiry.send.title_hint")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={disabled}
            maxLength={100}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={disabled}
            placeholder={t("service.inquiry.send.description_hint")}
            maxLength={1000}
          />
        </form>
        <button disabled={disabled} onClick={sendAsk}>
          {t("service.inquiry.send.submit")}
        </button>
      </Div>
      {popup ? (
        <Popup>
          <div onClick={() => setPopup(false)}></div>
          <div>
            <img src="/img/close-art.svg" onClick={() => setPopup(false)} />
            <p>{t("service.inquiry.send.done")}</p>
            <BtnSmall blue onClick={() => setPopup(false)}>
              <p>{t("service.inquiry.send.close")}</p>
            </BtnSmall>
          </div>
        </Popup>
      ) : null}
    </>
  );
};

export default SendAsk;
