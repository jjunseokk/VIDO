import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Div = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  > .modal {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #151515;
    opacity: 0.3;
  }
  > .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* padding: 24px; */
    /* background-color: #fff; */
    box-shadow: ${({ theme }) => theme.boxSahdow};
  }
`;
// 미디어 캔버스 갤러리 이미지 누를 때
const ImgPopup = ({ setPopup, src }) => {
  return (
    <Div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="modal" onClick={() => setPopup(null)}></motion.div>
      <div className="inner">
        <img src={src} alt="canvas" style={{width: "65vh"}} />
      </div>
    </Div>
  );
};

export default ImgPopup;
