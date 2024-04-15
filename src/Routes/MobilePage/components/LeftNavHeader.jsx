import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import px2vhMobile from '../../util/px2vhMobile';
import px2vwMobile from '../../util/px2vwMobile';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const Div = styled.header`
  border-bottom: ${({ theme }) => theme.border};
  height: ${px2vhMobile(280)};
  padding: 0 ${px2vwMobile(40)};
  position: relative;
  > svg {
    display: block;
    height: ${px2vhMobile(56)};
    position: relative;
    top: ${px2vhMobile(172)};
  }
  > h1 {
    bottom: ${px2vhMobile(45)};
    display: flex;
    align-items: center;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    font: 500 18px/1.2 ${({ theme }) => theme.noto};
    color: #151515;
    letter-spacing: -0.45px;
  }
  > div {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    .bg {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      backdrop-filter: blur(30px);
      background-color: #3636369c;
    }
    > nav {
      position: relative;
      z-index: 20;
      padding: ${px2vhMobile(141.89)} ${px2vwMobile(40)};
      background-color: #fff;
      width: ${px2vwMobile(698)};
      border: 1px solid #707070;
      height: 100vh;
      display: flex;
      flex-direction: column;
      > .logo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: ${px2vhMobile(156)};
        > img {
          display: block;
          height: ${px2vhMobile(80.11)};
        }
        > svg {
          height: ${px2vhMobile(72)};
          display: block;
        }
      }
      > .nav {
        display: flex;
        flex-direction: column;
        gap: ${px2vhMobile(120)};
        margin-left: ${px2vwMobile(40)};
        a {
          font: 700 14px ${({ theme }) => theme.noto};
          letter-spacing: -0.36;
          transition: ${({ theme }) => theme.transition};
          &.active {
            color: ${({ theme }) => theme.highlightColor};
          }
        }
      }
    }
  }
`;

const LeftNavHeader = ({ title = '' }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <Div>
      <svg
        onClick={() => setOpen(true)}
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="43"
        viewBox="0 0 56 43"
      >
        <g
          id="그룹_713"
          data-name="그룹 713"
          transform="translate(3526.678 -13604.5)"
        >
          <path
            id="패스_901"
            data-name="패스 901"
            d="M-3523.678,13603h56"
            transform="translate(-3 3)"
            fill="none"
            stroke="#363636"
            stroke-width="3"
          />
          <path
            id="패스_902"
            data-name="패스 902"
            d="M-3523.678,13603h56"
            transform="translate(-3 23)"
            fill="none"
            stroke="#363636"
            stroke-width="3"
          />
          <path
            id="패스_903"
            data-name="패스 903"
            d="M-3523.678,13603h56"
            transform="translate(-3 43)"
            fill="none"
            stroke="#363636"
            stroke-width="3"
          />
        </g>
      </svg>
      <h1>{title ?? null}</h1>
      <AnimatePresence>
        {open ? (
          <motion.div>
            <motion.div
              className="bg"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0, transition: { delay: 0.1 } }}
              transition={{ duration: 0.1 }}
            ></motion.div>
            <motion.nav
              initial={{ x: -500 }}
              animate={{ x: 0 }}
              exit={{ x: -500 }}
              transition={{ type: 'tween' }}
            >
              <div className="logo">
                <img onClick={() => navigate('/')} src="/img/logo_line.svg" />

                <svg
                  onClick={() => setOpen(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="72"
                  height="72"
                  viewBox="0 0 72 72"
                >
                  <g
                    id="그룹_717"
                    data-name="그룹 717"
                    transform="translate(-516 -11038)"
                  >
                    <g
                      id="그룹_716"
                      data-name="그룹 716"
                      transform="translate(4224 -2496)"
                    >
                      <rect
                        id="사각형_1875"
                        data-name="사각형 1875"
                        width="72"
                        height="72"
                        transform="translate(-3708 13534)"
                        fill="none"
                      />
                    </g>
                    <path
                      id="패스_905"
                      data-name="패스 905"
                      d="M516,11047.073l48,48"
                      transform="translate(12.5 3.427)"
                      fill="none"
                      stroke="#363636"
                      stroke-width="3"
                    />
                    <path
                      id="패스_906"
                      data-name="패스 906"
                      d="M516,11047.073l48,48"
                      transform="translate(-10518.573 11614.5) rotate(-90)"
                      fill="none"
                      stroke="#363636"
                      stroke-width="3"
                    />
                  </g>
                </svg>
              </div>
              <div className="nav">
                <NavLink to="/main">홈</NavLink>
                <NavLink to="/media-art">미디어아트</NavLink>
                <NavLink to="/author">아티스트</NavLink>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Div>
  );
};

export default LeftNavHeader;
