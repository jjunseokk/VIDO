import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import LoginBox from './components/LoginBox';
import RegisterPageLayout from './components/RegisterPageLayout';

const LoginPage = ({mode}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        <RegisterPageLayout mode={mode} children={<LoginBox mode={mode} />} />
      </AnimatePresence>
    </motion.div>
  );
};

export default LoginPage;
