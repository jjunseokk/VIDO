import React from 'react';
import SignUpChoose from './components/SignUpChoose';
import SignupFooter from './components/SignupFooter';
import { AnimatePresence, motion } from 'framer-motion';

const SignupPage = ({ setUserInfo, mode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <SignUpChoose mode={mode} footer={<SignupFooter mode={mode} setUserInfo={setUserInfo} />} />
    </motion.div>
  );
};

export default SignupPage;
