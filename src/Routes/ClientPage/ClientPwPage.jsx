import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import AxiosConfig from '../../AxiosConfig';

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 64px;
  > div {
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: #fff;
    padding: 32px;
    border: ${({ theme }) => theme.border};
    width: fit-content;
    border-radius: 16px;

    li {
      margin-bottom: 32px;
      width: 360px;
      justify-content: space-between;
      display: flex;
      flex-wrap: wrap;
      > p {
        font: 500 16px/32px ${({ theme }) => theme.noto};
        color: #151515;
        &.error {
          font: 400 14px/20px ${({ theme }) => theme.noto};
          margin-top: 12px;
          color: ${({ theme }) => theme.errorColor};
        }
      }
      > input {
        width: 240px;
        height: 32px;
        padding: 0 12px;
        font: 400 16px/32px ${({ theme }) => theme.noto};
        border: ${({ theme }) => theme.border};
      }
    }
    button {
      margin: 0 auto;
      display: block;
      width: 80px;
      height: 32px;
      font: 500 16px/32px ${({ theme }) => theme.noto};
      color: #fff;
      background-color: ${({ theme }) => theme.mainColor};
      transition: ${({ theme }) => theme.transition};
      &:disabled {
        background-color: #e0e0e0;
      }
    }
  }
`;

const Popup = styled.div`
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 32px;
    width: 300px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    > p {
      font: 500 16px/32px ${({ theme }) => theme.noto};
      text-align: center;
      margin-bottom: 24px;
    }
    > button {
      margin: 0 auto;
      display: block;
      width: 80px;
      height: 32px;
      font: 500 16px/32px ${({ theme }) => theme.noto};
      color: #fff;
      background-color: ${({ theme }) => theme.mainColor};
      transition: ${({ theme }) => theme.transition};
    }
  }
`;

const ClientPwPage = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [popup, setPopup] = useState('');

  const handleSubmit = () => {
    AxiosConfig.post(`/client/password`, {
      userId: id,
      oldPassword: pw,
      newPassword: newPw,
    }).then((res) => {
      if (res.data.statusCode == 200) {
        setPopup('비밀번호 변경에 성공했습니다.');
      } else {
        setPopup('잘못된 정보입니다.');
      }
    });
  };
  return (
    <>
      <Div>
        <div>
          <ul>
            <li>
              <p>아이디</p>
              <input value={id} onChange={(e) => setId(e.target.value)} />
            </li>
            <li>
              <p>기존 비밀번호</p>
              <input
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                type="password"
              />
            </li>
            <li>
              <p>새 비밀번호</p>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
              />
            </li>
            <li>
              <p>비밀번호 확인</p>
              <input
                value={checkPw}
                onChange={(e) => setCheckPw(e.target.value)}
                type="password"
              />
              {newPw != checkPw && checkPw ? (
                <p className="error">비밀번호가 일치하지 않습니다.</p>
              ) : null}
            </li>
          </ul>
          <button
            disabled={!id || !pw || !newPw || newPw != checkPw}
            onClick={handleSubmit}
          >
            확인
          </button>
        </div>
      </Div>
      {popup ? (
        <Popup>
          <div className="modal" onClick={() => setPopup(false)}></div>
          <div className="inner">
            <p>{popup}</p>
            <button onClick={() => setPopup(false)}>확인</button>
          </div>
        </Popup>
      ) : null}
    </>
  );
};

export default ClientPwPage;
