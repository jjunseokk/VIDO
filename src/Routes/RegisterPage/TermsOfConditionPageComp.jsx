import React from 'react';
import TermsOfCondition from './components/TermsOfCondition';
import { AnimatePresence, motion } from 'framer-motion';
import RegisterPageLayout from './components/RegisterPageLayout';

const TermsOfConditionPageComp = ({mode}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        <RegisterPageLayout mode={mode} children={<TermsOfCondition mode={mode} num={2} />} />
      </AnimatePresence>
    </motion.div>
  );
};

export default TermsOfConditionPageComp;
