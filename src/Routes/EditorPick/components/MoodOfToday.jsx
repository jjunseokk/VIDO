import React from 'react';
import styles from './MoodOfToday.module.scss';

const MoodOfToday = ({ today, description, moodImg }) => {
  return (
    <div className={styles.MoodOfToday}>
      <div>
        <div>
          <p>오늘의 감성</p>
          <h1>{today}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div>
        <div style={{ backgroundImage: moodImg }}></div>
      </div>
    </div>
  );
};

export default MoodOfToday;
