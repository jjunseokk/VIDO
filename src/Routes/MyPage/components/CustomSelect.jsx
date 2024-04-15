import React from 'react';
import styles from './CustomSelect.module.scss';

const CustomSelect = ({ opt }) => {
  return (
    <ul className={styles.CustomSelect}>
      {opt.map((value, index) => (
        <li key={value + index}>{value}</li>
      ))}
    </ul>
  );
};

export default CustomSelect;
