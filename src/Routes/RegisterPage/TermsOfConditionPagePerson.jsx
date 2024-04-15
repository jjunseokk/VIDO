import React from 'react';
import TermsOfCondition from './components/TermsOfCondition';
import { AnimatePresence, motion } from 'framer-motion';
import RegisterPageLayout from './components/RegisterPageLayout';

const TermsOfConditionPagePerson = ({mode}) => {
  return (
    <div>
      <AnimatePresence>
        <RegisterPageLayout mode={mode} children={<TermsOfCondition mode={mode} num={1} />} />
      </AnimatePresence>
    </div>
  );
};

export default TermsOfConditionPagePerson;
