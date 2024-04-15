import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import px2vhMobile from '../../util/px2vhMobile';
import px2vwMobile from '../../util/px2vwMobile';
import ScrollTop from './ScrollTop';

const Div = styled.footer`
  background-color: #e0e0e0;
  padding: ${px2vhMobile(10)} ${px2vwMobile(40)};
  width: 100vw;
  height: ${px2vhMobile(295)};
  position: relative;
  address {
    font-style: normal;
    margin-bottom: ${px2vhMobile(26)};
    margin-top: ${px2vhMobile(39)};
    > ul {
      display: flex;
      gap: ${px2vwMobile(10)};
      flex-wrap: wrap;
      > li {
        position: relative;
        font: 400 10px ${({ theme }) => theme.noto};
        transform: scale(0.9);
        transform-origin: 0%;
        color: #707070;
        letter-spacing: -0.18px;
        &:not(:last-of-type):after {
          display: block;
          content: '';
          position: absolute;
          right: -${px2vwMobile(20)};
          width: 1px;
          height: 10px;
          background-color: #707070;
          top: 4px;
        }
        &.email {
          transform: scale(0.8);
        }
      }
    }
  }
  p {
    white-space: pre-wrap;
    font: 400 10px ${({ theme }) => theme.noto};
    color: #707070;
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > p {
    transform-origin: 0%;
    margin-top: ${px2vhMobile(4)};
    transform: scale(0.8);
  }
`;

const MobileFooter = ({ toTop }) => {
  const winHeight = window.innerHeight;
  const [showTop, setShowTop] = useState(false);
  const scrollHandle = async () => {
    if (window.pageYOffset >= winHeight / 2) {
      setShowTop(true);
    } else {
      setShowTop(false);
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener('scroll', scrollHandle);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', scrollHandle);
    };
  }, []);
  return (
    <Div>
      <div>
        <address>
          <ul>
            <li>상호: 주식회사 벌스</li>
            <li>대표이사: 심상훈</li>
            <li>개인정보처리관리: 백경인</li>
          </ul>
          <ul>
            <li>서울시 강남구 논현로 151길 50 301호</li>
            <li>+82 512 0982</li>
            <li className="email">vidogallery@gmail.com</li>
          </ul>
        </address>
        {/* <a target="_blank" href="https://instagram.com/vido.gallery/">
          <img src="/img/instagram.svg" />
        </a> */}
      </div>
      <p>ⓒ VIDO Corp. All Rights Reserved.</p>
      <AnimatePresence>
        {toTop && showTop ? <ScrollTop /> : null}
      </AnimatePresence>
    </Div>
  );
};

export default MobileFooter;
