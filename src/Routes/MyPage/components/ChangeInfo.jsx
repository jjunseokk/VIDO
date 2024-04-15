import React, { useState, useContext } from 'react';
import styles from './Changeinfo.module.scss';
import RegisterInputText from './RegisterInputText';
import RegisterBtn from './RegisterBtn';
import RoundBtn from './RoundBtn';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AppContext from '../../AppContext';
import AxiosConfig from '../../../AxiosConfig';

const ChangeInfo = ({ title, setPopup }) => {
  const myContext = useContext(AppContext);
  const validNickname = /^[\w|가-힣|\.\_\-]{1,10}$/;
  const characterNeccessaryKor = /[A-Z|가-힣|a-z|0-9]+/;

  let spanMessege = {
    default:
      '한글/영문과 숫자 및 특수문자(-_.)를 사용하여, 12자이내로 입력해주세요.',
    error: '사용할 수 없는 ' + title + ' 입니다.',
    avail: '사용 가능한 ' + title + ' 입니다.',
    exist: '이미 있는 ' + title + ' 입니다.',
  };

  const [error, setError] = useState(false);
  const [exist, setExist] = useState(0);
  const [input, setInput] = useState('');
  const nickNameAlreadyExist = async () => {
    try {
      const res = await AxiosConfig.get(`account/exist?authorName=${input}`);
      console.log(res);
      res.data.statusCode === 200 ? setExist(2) : setExist(1);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    if (title === '닉네임') {
      let testResult =
        validNickname.test(e.target.value) &&
        characterNeccessaryKor.test(e.target.value);
      setError(!testResult);
    }
    setInput(e.target.value);
  };
  return (
    <div className={styles.changeInfo}>
      <div>
        <button
          className={styles.close}
          onClick={() => setPopup(false)}
        ></button>
        <h1>{title} 변경</h1>
        <div className={styles.input}>
          <RegisterInputText
            placeHolder={`${title} 입력`}
            value={input}
            onChange={handleChange}
          />
          {title === '닉네임' ? (
            <RoundBtn
              context={'중복확인'}
              onClick={nickNameAlreadyExist}
              disabled={!input || error}
            />
          ) : null}
          {title === '닉네임' ? (
            !input ? (
              <span style={{ color: '#D00000' }}>{spanMessege.default}</span>
            ) : error ? (
              <span style={{ color: '#D00000' }}>{spanMessege.error}</span>
            ) : exist === 0 ? null : exist === 1 ? (
              <span style={{ color: '#D00000' }}>{spanMessege.exist}</span>
            ) : (
              <span style={{ color: '#707070' }}>{spanMessege.avail}</span>
            )
          ) : null}
        </div>
        <RegisterBtn
          context={'확인'}
          disabled={exist === 2 && !error ? false : true}
        />
      </div>
    </div>
  );
};

export default ChangeInfo;
