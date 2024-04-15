import React from 'react';
import Footer from '../Components/Footer';
import MoodOfToday from './components/MoodOfToday';
import MoodMediaArt from '../MainPage/components/MoodMediaArt';
import Suggest from './components/Suggest';
import styles from './EditorPickPage.module.scss';
import TaggedArt from './components/TaggedArt';
import { AnimatePresence, motion } from 'framer-motion';
import FramerMotionAnimate from '../util/FramerMotionAnimate.json';

const EditorPickPage = () => {
  return (
    <>
      <AnimatePresence>
        <div className={styles.EditorPickPage}>
          {/* <MoodOfToday today={'오늘같은 날'} /> */}
          {/* <MoodMediaArt /> */}
          <Suggest />
          <TaggedArt />
        </div>
      </AnimatePresence>
      <Footer mode={mode} />
    </>
  );
};

export default EditorPickPage;
