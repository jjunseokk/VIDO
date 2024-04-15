import React from 'react';
import styles from './Closebutton.module.scss';

const CloseButton = ({ onClick = () => {} }) => {
  return <button className={styles.close} onClick={onClick}></button>;
};

export default CloseButton;
