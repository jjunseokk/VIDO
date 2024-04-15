import styled from 'styled-components';
import React from 'react';
import CloseSmall from './CloseSmall';
import BtnSmall from './BtnSmall';
const AlertPopupStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  > .modal {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: #151515;
    opacity: 0.3;
  }
  > .popup {
    width: ${(props) => (props.width ? props.width : '400px')};
    height: max-content;
    padding: 24px 64px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: ${({ theme }) => theme.boxShadow};
    div.close {
      cursor: pointer;
      > svg {
        position: absolute;
        top: 4px;
        right: 4px;
      }
    }
    > p {
      font: 500 16px/24px ${({ theme }) => theme.noto};
      text-align: center;
      white-space: pre-wrap;
      margin-bottom: 24px;
    }
    > div {
      display: flex;
      justify-content: center;
      gap: 12px;
    }
  }
`;

const AlertPopup = ({
  width = false,
  content,
  btnCont,
  btnCont2,
  setPopup,
  onClick,
  onClick2,
}) => {
  return (
    <AlertPopupStyle width={width}>
      <div
        className="modal"
        onClick={() => (setPopup ? setPopup(false) : onClick())}
      ></div>
      <div className="popup">
        <div
          className="close"
          onClick={() => (setPopup ? setPopup(false) : onClick())}
        >
          <CloseSmall />
        </div>
        <p>{content}</p>
        <div>
          <BtnSmall blue onClick={onClick}>
            <p>{btnCont}</p>
          </BtnSmall>
          {btnCont2 ? (
            <BtnSmall onClick={onClick2}>
              <p>{btnCont2}</p>
            </BtnSmall>
          ) : null}
        </div>
      </div>
    </AlertPopupStyle>
  );
};

export default AlertPopup;
