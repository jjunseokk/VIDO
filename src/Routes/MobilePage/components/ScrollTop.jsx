import { motion } from 'framer-motion';
import styled from 'styled-components';
import px2vhMobile from '../../util/px2vhMobile';
import px2vwMobile from '../../util/px2vwMobile';

const Div = styled(motion.div)`
  position: fixed;
  box-shadow: 0px 0px 12px #00000041;
  z-index: 50;
  border-radius: 6px;
  display: flex;
  padding: ${px2vwMobile(16)} ${px2vwMobile(11)};
  display: flex;
  flex-direction: column;
  gap: ${px2vwMobile(6)};
  bottom: calc(${px2vhMobile(60)});
  right: ${px2vwMobile(79)};
  justify-content: center;
  background-color: #fff;
  > img {
    display: block;
    margin-top: ${px2vwMobile(4)};
    height: ${px2vwMobile(24)};
    width: ${px2vwMobile(24)};
    object-fit: cover;
  }
`;

const ScrollTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Div
      onClick={scrollToTop}
      initial={{ opacity: 0, y: 40 }}
      exit={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween' }}
    >
      <img src="/img/mobile-to-top.svg" />
      <p>맨위로</p>
    </Div>
  );
};

export default ScrollTop;
