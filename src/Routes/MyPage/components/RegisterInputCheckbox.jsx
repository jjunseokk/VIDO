import React from 'react';
import styles from './RegisterInputCheckbox.module.scss';

const RegisterInputCheckbox = ({
  id,
  txt = ['', ''],
  onChange = () => {},
  checked = () => {},
}) => {
  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id={id} onChange={onChange} checked={checked} />
      <label htmlFor={id}>
        <p>
          <span>{txt[1]}</span>
          {txt[0]}
        </p>
      </label>
    </div>
  );
};

export default RegisterInputCheckbox;
