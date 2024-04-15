import React from 'react';
import RegisterPageLayout from './components/RegisterPageLayout';
import RegisterDone from './components/RegisterDone';
import { AnimatePresence, motion } from 'framer-motion';

const RegisterDonePage = ({ mode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <RegisterPageLayout children={<RegisterDone mode={mode} />} paddingtop="150px" />
    </motion.div>
  );
};

export default RegisterDonePage;
