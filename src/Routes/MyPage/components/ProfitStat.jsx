import React from 'react';
import styles from './ProfitStat.module.scss';

const ProfitStat = () => {
  const profCalc = 1;

  return (
    <div className={styles.ProfitStat}>
      <div className={styles.left}>
        <div>
          <p>
            수익<span>(원)</span>
          </p>
          <p></p>
        </div>
      </div>
      <div className={styles.right}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ProfitStat;
