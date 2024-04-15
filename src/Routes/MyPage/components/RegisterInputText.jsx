import React from 'react';
import styles from './RegisterInputText.module.scss';

const RegisterInputText = ({
  type = 'text',
  placeHolder,
  value = '',
  onChange = null,
}) => {
  return (
    <input
      type={type}
      className={styles.text}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      autoComplete="off"
    ></input>
  );
};

export default RegisterInputText;
