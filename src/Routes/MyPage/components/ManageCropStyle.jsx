import { motion } from 'framer-motion';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';

export const ManageCropStyle = styled(motion.div)`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 40;
  > .modal {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #151515;
    opacity: 0.3;
  }
  > div.popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: ${px2vw(870)};
    height: ${px2vw(785)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    > button {
      &:nth-of-type(1) {
        position: absolute;
        top: 4px;
        right: 4px;
        border: none;
        background: none;
        cursor: pointer;
        > svg path {
          stroke: #707070;
        }
      }
    }
    > div {
      &:nth-of-type(1) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 26px;

        > h1 {
          font: 400 22px/29px ${({ theme }) => theme.noto};
          color: #707070;
          margin-bottom: 16px;
          margin-left: 20px;
        }
        > div {
          position: relative;
          display: flex;
          > div {
            position: relative;
            width: 120px;
            height: 24px;
            margin-right: 24px;
            > button {
              cursor: pointer;
              width: 120px;
              height: 24px;
              border: 1px solid #e0e0e0;
              background-color: #fff;
              position: absolute;
              top: 0;
              left: 0;
              padding: 0 4px;
              text-align: left;
              font: 400 14px ${({ theme }) => theme.noto};
              color: #707070;
              > svg {
                position: absolute;
                right: 4px;
                top: 4px;
              }
            }
            > ul {
              width: 120px;
              box-shadow: ${({ theme }) => theme.boxShadow};
              background-color: #fff;
              top: 24px;
              position: absolute;
              z-index: 100;
              > li {
                width: 120px;
                height: 24px;
                line-height: 24px;
                font: 400 14px ${({ theme }) => theme.noto};
                padding-left: 4px;
                color: #151515;
                cursor: pointer;
                transition: all 0.2s;
                &:hover {
                  color: ${({ theme }) => theme.mainColor};
                  background-color: #f8f8f8;
                }
              }
            }
          }
          > button {
            margin-left: 12px;
            background-color: #fff;
            width: 97px;
            height: 24px;
            border: 1px solid $border-color;
            cursor: pointer;
            font: 400 14px ${({ theme }) => theme.noto};
            color: #707070;
            transition: all 0.2s;
            &:hover {
              color: ${({ theme }) => theme.mainColor};
            }
          }
          > .checkbox {
            position: relative;
            width: ${px2vw(65)};
            margin-top: 6px;
            height: 12px;
          }
        }
      }
      &:nth-of-type(2) {
      }
    }
    .table {
      width: 100%;
      .row {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr ${px2vw(130)} 2fr 1fr 1fr 1fr ${px2vw(60)};
        > div {
          &:nth-of-type(1) {
            > p {
              margin-left: ${px2vw(20)};
            }
          }
          &:nth-of-type(n + 4) {
            text-align: center;
            justify-content: center;
          }
          &:last-of-type {
          }
        }
      }
      > .head {
        background-color: #f8f8f8;
        height: 48px;
        font: 500 14px/48px ${({ theme }) => theme.noto};
        color: #707070;
      }
      > .body {
        margin-bottom: 30px;
        .row {
          height: ${px2vw(96)};
          border-bottom: 1px solid #e0e0e0;
          > div {
            display: flex;
            align-items: center;
            &:nth-of-type(1) {
              > p {
                font: 400 14px ${({ theme }) => theme.roboto};
                color: #151515;
              }
            }
            &:nth-of-type(2) {
              img {
                width: ${px2vw(90)};
                height: ${px2vw(60)};
                object-fit: cover;
              }
            }
            &:nth-of-type(3) {
              width: ${px2vw(216)};
              color: #707070;
              p {
                &:nth-of-type(1) {
                  font: 500 14px/20px ${({ theme }) => theme.noto};
                  letter-spacing: 0.35px;
                  margin-bottom: 4px;
                }
                &:nth-of-type(2) {
                  font: 400 12px/20px ${({ theme }) => theme.noto};
                }
              }
            }
            &:nth-of-type(4) {
              font: 500 12px ${({ theme }) => theme.roboto};
              color: #707070;
            }
            &:nth-of-type(5) {
              font: 500 12px ${({ theme }) => theme.roboto};
              color: #707070;
            }
            &:nth-of-type(6) {
              font: 500 12px ${({ theme }) => theme.roboto};
              color: #707070;
            }
            &:nth-of-type(7) {
              font: 500 12px ${({ theme }) => theme.noto};
              color: #707070;
              > p {
                width: 100%;
              }
              .delete {
                display: grid;
                grid-template-columns: ${px2vw(64)} ${px2vw(24)};
                grid-gap: ${px2vw(20)};
                padding-right: ${px2vw(2)};

                > p {
                  text-align: right;
                  text-decoration: underline;
                }
                > div {
                  margin-top: 3px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 1600px) {
    > div.popup {
      width: ${px2vw(1070)};
      height: ${px2vw(885)};
    }
  }
  @media (max-width: 1260px) {
    > div.popup {
      width: ${px2vw(1270)};
      height: ${px2vw(925)};
      > div {
        &:nth-of-type(1) {
          padding-top: 12px;
          > h1 {
            font: 400 16px/29px ${({ theme }) => theme.noto};
            margin-bottom: 12px;
          }
          > div > div {
            > button {
              font: 400 12px ${({ theme }) => theme.noto};
            }
            > ul > li {
              font: 400 12px ${({ theme }) => theme.noto};
            }
          }
        }
      }
      .table {
        > .head {
          font: 500 12px/36px ${({ theme }) => theme.noto};
          height: 30px;
        }
        > .body .row {
          height: 48px;
          > div {
            &:nth-of-type(1) > p {
              font: 400 12px ${({ theme }) => theme.roboto};
            }
            &:nth-of-type(3) {
              p {
                &:nth-of-type(1) {
                  font: 500 12px/15px ${({ theme }) => theme.noto};
                }
                &:nth-of-type(2) {
                  display: none;
                  font: 400 10px/15px ${({ theme }) => theme.noto};
                }
              }
            }
            &:nth-of-type(4) {
              font: 500 10px ${({ theme }) => theme.roboto};
            }
            &:nth-of-type(5) {
              font: 500 10px ${({ theme }) => theme.roboto};
            }
            &:nth-of-type(6) {
              font: 500 10px ${({ theme }) => theme.roboto};
            }
            &:nth-of-type(7) {
              font: 500 10px ${({ theme }) => theme.roboto};
            }
          }
        }
      }
    }
  }
  @media (max-width: 840px) {
    > div.popup {
      width: 550px;

      height: 440px;
    }
  }
  @media (max-width: 600px) {
    > div.popup {
      width: 450px;

      height: 440px;
      .table {
        .row {
          grid-template-columns: 0.5fr ${px2vw(130)} 2fr 1fr 1fr 1fr ${px2vw(
              60
            )};
        }
        > .body .row {
          > div {
            &:nth-of-type(1) > p {
              font: 400 10px ${({ theme }) => theme.roboto};
            }
            &:nth-of-type(3) p:nth-of-type(1) {
              font: 400 10px ${({ theme }) => theme.noto};
            }
          }
        }
      }
    }
  }
`;
