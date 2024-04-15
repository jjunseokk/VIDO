import React, { useState } from 'react';
import styled from 'styled-components';
import AxiosConfig from '../../AxiosConfig';
import px2vw from '../util/px2vw';
import { motion } from 'framer-motion';
import { validEmail } from '../util/Regex';

const Div = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  > .modal {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #151515;
    opacity: 0.3;
  }
  > .inner {
    z-index: 100;
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: ${px2vw(800)};
    padding: ${px2vw(30)};
    max-height: 98vh;
    overflow-y: auto;
    > img {
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
    }
    > button {
      display: block;
      margin: 0 auto;
      width: 180px;
      height: 36px;
      border-radius: 18px;
      border: 1px solid #707070;
      color: #151515;
      font: 400 16px ${({ theme }) => theme.roboto};
      transition: ${({ theme }) => theme.transition};
      &:disabled {
        cursor: default;
        background-color: #f0f0f0;
        color: #707070;
      }
      &:not(:disabled):hover {
        border: 1px solid ${({ theme }) => theme.mainColor};
        background-color: ${({ theme }) => theme.highlightColor};
        color: #fff;
      }
    }
    .long {
      width: ${px2vw(740)};
    }
    .short {
      width: ${px2vw(360)};
    }
    textarea {
      resize: none;
      height: 290px;
      padding: 8px 8px;
      &:focus {
        outline: none;
      }
    }
    textarea,
    input {
      font: 400 16px ${({ theme }) => theme.noto};
      color: #151515;
      border: ${({ theme }) => theme.border};
      transition: ${({ theme }) => theme.transition};
      &:focus {
        border: 1px solid ${({ theme }) => theme.highlightColor};
      }
    }
    input {
      height: 36px;
      padding: 0 8px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 16px ${px2vw(20)};
      margin-bottom: 20px;
      li {
        position: relative;
        > p {
          font: 500 16px/24px ${({ theme }) => theme.noto};
          color: #151515;
          margin-bottom: 4px;
          > span {
            font: 400 14px/19px ${({ theme }) => theme.roboto};
            color: #676666;
            margin-left: 12px;
          }
        }
        > span {
          font: 400 12px/19px ${({ theme }) => theme.roboto};
          color: ${({ theme }) => theme.errorColor};
          position: absolute;
          top: 8px;
          right: 4px;
        }
      }
    }
  }
  @media (max-width: 1252px) {
    > .inner {
      width: ${px2vw(1060)};
      .long {
        width: ${px2vw(1000)};
      }
      .short {
        width: ${px2vw(490)};
      }
    }
  }
`;

const FooterAsk = ({ setPopup }) => {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [regexEmail, setRegexEmail] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tel, setTel] = useState('');
  const [sent, setSent] = useState(false);
  const disabled = name && from && message && title && regexEmail;
  const handleSend = () => {
    AxiosConfig.post(`/inquiryMail`, {
      name: name,
      from: from,
      title: title,
      message: message,
      number: tel,
    }).then((res) => {
      console.log(res);
      setPopup(false);
    });
  };
  return (
    <Div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="modal" onClick={() => setPopup(false)}></div>
      <div className="inner">
        <img src="/img/close-art.svg" onClick={() => setPopup(false)} />
        <ul>
          <li>
            <p>
              성명 / 회사명<span>NAME / NAME OF COMPANY</span>
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="long"
            />
          </li>
          <li>
            <p>
              이메일<span>E-MAIL</span>
            </p>
            {from && regexEmail == false ? (
              <span className="error">올바른 이메일 형식을 입력해주세요.</span>
            ) : null}
            <input
              type="text"
              value={from}
              onChange={(e) => {
                setRegexEmail(validEmail.test(e.target.value));

                setFrom(e.target.value);
              }}
              className="short"
            />
          </li>
          <li>
            <p>
              연락처<span>PHONE</span>
            </p>
            <input
              type="text"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="short"
            />
          </li>
          <li>
            <p>
              제목<span>TITLE</span>
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="long"
            />
          </li>
          <li>
            <p>
              내용<span>CONTENTS</span>
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="long"
            />
          </li>
        </ul>
        <button disabled={!disabled} onClick={handleSend}>
          SEND
        </button>
      </div>
    </Div>
  );
};

export default FooterAsk;
