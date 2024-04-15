import React from 'react';
import styles from './Roundbtn.module.scss';

const RoundBtn = ({
  active,
  context,
  disabled = false,
  onClick = (e) => {
    null;
  },
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };
  return (
    <button
      className={styles.roundbtn}
      disabled={disabled}
      onClick={handleClick}
    >
      {context}
    </button>
  );
};

export default RoundBtn;
