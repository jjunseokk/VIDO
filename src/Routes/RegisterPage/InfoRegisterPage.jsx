import React from 'react';
import InfoRegister from './components/InfoRegister';
import RegisterPageLayout from './components/RegisterPageLayout';
import { AnimatePresence, motion } from 'framer-motion';

const InfoRegisterPage = ({mode}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <RegisterPageLayout mode={mode} children={<InfoRegister mode={mode} />} width={480} />
    </motion.div>
  );
};

export default InfoRegisterPage;
