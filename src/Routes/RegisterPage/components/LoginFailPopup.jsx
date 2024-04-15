import React from 'react';
import styled from 'styled-components';
import BtnSmall from '../../Components/BtnSmall';

const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  > .modal {
    top: 0;
    left: 0;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #151515;
    opacity: 0.3;
  }
  > .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 80px;
    background-color: #fff;
    box-shadow: ${({ theme }) => theme.boxShadow};
    > p {
      color: #151515;
      font: 400 14px/20px ${({ theme }) => theme.noto};
      letter-spacing: -0.35px;
      text-align: center;
      margin-bottom: 30px;
    }
    > div {
      margin: 0 auto;
    }
  }
`;

const LoginFailPopup = ({ context, setPopup }) => {
  return (
    <Div>
      <div className="modal"></div>
      <div className="popup">
        <p>{context}</p>
        <BtnSmall blue onClick={() => setPopup(0)}>
          <p>확인</p>
        </BtnSmall>
      </div>
    </Div>
  );
};

export default LoginFailPopup;
