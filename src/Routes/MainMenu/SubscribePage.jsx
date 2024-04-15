import React from 'react';
import LoadingVido from '../Components/LoadingVido';
import styles from './SubscribePage.module.scss';

const SubscribePage = () => {
  return (
    <div className={styles.SubscribePage}>
      SubscribePage
      <svg
        viewBox="0 0 160 41.296"
        version="1.1"
        id="svg22"
        xmlns="http://www.w3.org/2000/svg"
        width="0px"
        height="0px"
      >
        <defs>
          <g id="그룹_1" data-name="그룹 1" transform="translate(0 -0.006)">
            <g
              id="그룹_2"
              data-name="그룹 2"
              transform="translate(0 0.006)"
              clip-path="url(#clip-path)"
            >
              <clipPath id="vido">
                <path
                  id="path30"
                  transform="translate(-263.374 -0.002)"
                  d="M 402.726,41.3 A 20.648,20.648 0 1 1 423.374,20.652 20.648,20.648 0 0 1 402.726,41.3 m 0,-39.217 A 18.567,18.567 0 1 0 421.291,20.652 18.567,18.567 0 0 0 402.726,2.079 M 284.674,41.3 263.374,0 h 2.334 L 284.674,36.66 303.641,0 h 11.238 v 39.213 h 38.666 a 18.567,18.567 0 0 0 0,-37.134 h -30.82 V 0 h 30.82 a 20.65,20.65 0 0 1 0,41.3 H 312.787 V 2.079 h -7.864 z"
                />
              </clipPath>
            </g>
          </g>
        </defs>
      </svg>
      <section>
        <LoadingVido />
      </section>
      <div></div>
    </div>
  );
};

export default SubscribePage;
