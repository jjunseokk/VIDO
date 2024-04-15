import React from 'react';
import MOOD from '../data/MOOD.json';
import styles from './moodmediaart.module.scss';

const MoodMediaArt = () => {
  return (
    <div className={styles.moodMediaArt}>
      <h1>분위기별 미디어아트</h1>
      <ul>
        {MOOD.map((content, index) => (
          <li key={index}>
            <img src={content.bg} />
            <p>{content.mood}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodMediaArt;
