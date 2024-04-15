import React, { useState } from 'react';
import styles from './ToggleCheck.module.scss';

const ToggleCheck = ({
  id = 'toggleCheckId',
  agree = false,
  onClick = () => {},
  handleCheck = () => {},
}) => {
  let handleToggle = agree ? 'On' : 'Off';
  let checked = agree;
  return (
    <div className={styles.ToggleCheck}>
      <input
        onClick={onClick}
        onChange={handleCheck}
        type="checkbox"
        id={id}
        checked={checked ? true : false}
      />
      <label htmlFor={id}>
        <span>{handleToggle}</span>
      </label>
    </div>
  );
};

export default ToggleCheck;
