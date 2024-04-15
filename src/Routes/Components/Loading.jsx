import React from 'react';
import styles from './Loading.module.scss';
const Loading = () => {
  return (
    <div className={styles.LoadingWrap}>
      <div className={styles.Loading}>
        <div className={styles.bar}></div>
        <div className={styles.cover}></div>
      </div>
    </div>
  );
};

export default Loading;
