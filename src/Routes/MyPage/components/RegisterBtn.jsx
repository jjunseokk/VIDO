import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterBtn.module.scss';

const RegisterBtn = ({
  context,
  link = '#',
  disabled = false,
  onClick = null,
  state = null,
  type = 'button',
}) => {
  return (
    <div className={styles.link} onClick={onClick}>
      {disabled ? null : <Link to={link} state={state}></Link>}
      <button className={styles.RegisterBtn} type={type} disabled={disabled}>
        {context}
      </button>
    </div>
  );
};

export default RegisterBtn;
