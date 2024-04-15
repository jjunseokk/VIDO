import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import px2vw from '../../util/px2vw';
import { motion } from 'framer-motion';

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
    width: 400px;
    height: 154px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: #fff;
    padding: 32px;
    > p {
      font: 400 14px/20px ${({ theme }) => theme.noto};
      color: #151515;
      letter-spacing: -0.32px;
      text-align: center;
    }
    > .button {
      width: 100%;
      margin-top: 30px;
      display: flex;
      justify-content: center;
      gap: 4px;
      > button {
        width: 138px;
        height: 32px;
        font: 400 14px/20px ${({ theme }) => theme.noto};
        letter-spacing: -0.28px;
        &.blue {
          background-color: ${({ theme }) => theme.mainColor};
          color: #fff;
        }
        &.gray {
          background-color: #f7f7f7;
          color: ${({ theme }) => theme.mainColor};
        }
      }
    }
  }
`;

const FindError = ({ setPopup, id = true }) => {
  const navigate = useNavigate();
  return (
    <Div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="modal" onClick={() => setPopup(false)}></div>
      <div className="inner">
        <p>
          {id
            ? '일치하는 회원정보가 존재하지 않습니다.'
            : '올바른 회원정보를 입력해주세요.'}
        </p>
        <div className="button">
          {id ? (
            <>
              <button className="blue" onClick={() => navigate(`/signup`)}>
                회원가입
              </button>
              <button className="gray" onClick={() => setPopup(false)}>
                취소
              </button>
            </>
          ) : (
            <button className="blue" onClick={() => setPopup(false)}>
              확인
            </button>
          )}
        </div>
      </div>
    </Div>
  );
};

export default FindError;
