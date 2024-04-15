import React from 'react';
import CloseSmall from './CloseSmall';
import styles from './ErrorPopup.module.scss';
import SquareBtn from './SquareBtn';
import { errorState } from '../util/recoilState';
import { useSetRecoilState } from 'recoil';

const ErrorPopup = ({
  context = 'API',
  errorMessage = '',
  setErrorPopup = () => {},
}) => {
  const setWholeErrorPopup = useSetRecoilState(errorState);
  return (
    <div className={styles.ErrorPopup}>
      <div
        onClick={() => {
          setWholeErrorPopup({
            errorMessage: '',
            popup: false,
          });
          setErrorPopup(false);
        }}
      ></div>
      <div>
        <button
          onClick={() => {
            setWholeErrorPopup({
              errorMessage: '',
              popup: false,
            });
            setErrorPopup(false);
          }}
        >
          <CloseSmall />
        </button>
        <p>
          <span>{errorMessage} 오류.</span>
          <br />
          지속적으로 동일 오류 발생시 고객센터 문의 부탁드립니다.
        </p>
        <SquareBtn
          context="확인"
          onClick={() => {
            setWholeErrorPopup({
              errorMessage: '',
              popup: false,
            });
            setErrorPopup(false);
          }}
        />
      </div>
    </div>
  );
};

export default ErrorPopup;
