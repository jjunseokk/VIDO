import styled from 'styled-components';
import px2vw from '../../util/px2vw';

const ArtPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  > .modal {
    position: absolute;
    top: 0;
    left: 0;
    background: #151515;
    opacity: 0.3;
    width: 100%;
    height: 100vh;
  }
  > .popup {
    .artApprove {
      position: absolute;
      bottom: 0;
    }
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: ${px2vw(878)};
    height: 92vh;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 14px;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      background: #f2f2f2;
      width: 12px;
      margin-right: 2px;
      border-radius: 6px;
      border: 2px solid #fff;
    }
    box-shadow: ${({ theme }) => theme.boxShadow};
    padding: 36px;
    > img {
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
    }
    > div.inner {
      display: flex;
      position: relative;
      gap: ${px2vw(26)};
      > div {
        &:nth-of-type(1) {
          position: relative;
          width: ${px2vw(300)};
          > div {
            width: 100%;
            height: ${px2vw(200)};
            position: relative;
            img.btn {
              position: absolute;
              height: auto;
              transform: translate(-50%, -50%);
              top: 35%;
              left: 50%;
              width: ${px2vw(34)};
              height: auto;
            }
            img.thumb {
              width: 100%;

              height: ${px2vw(200)};
              top: 0;
              left: 0;
              object-fit: cover;
              position: absolute;
            }
            .info {
              font: 500 12px/20px ${({ theme }) => theme.noto};
            }
          }
          > ul.authorInfo {
            margin-top: 20px;
            > li {
              display: flex;
              margin-bottom: 12px;
              > p {
                font: 400 14px/20px ${({ theme }) => theme.noto};
                color: #707070;
                position: relative;
                margin-right: ${px2vw(12)};
                word-break: keep-all;
              }
              > span {
                font: 500 14px/20px ${({ theme }) => theme.noto};
                color: #151515;
              }
              > input {
                border: ${({ theme }) => theme.border};
                color: #151515;
                font: 500 14px/20px ${({ theme }) => theme.noto};
                width: calc(${px2vw(288)} - 42px);
              }
            }
          }
          div.upload-info {
            margin-top: 9px;
            height: fit-content;
            padding: 12px;
            background-color: #f7f7f7;
            border-radius: 4px;
            > p {
              color: ${({ theme }) => theme.highlightColor};
              font: 400 14px/1.5 ${({ theme }) => theme.noto};
              word-break: keep-all;
              letter-spacing: -0.35px;
            }
          }
          div.rejectReason {
            position: relative;
            top: ${px2vw(40)};
            width: ${px2vw(300)};
            height: ${px2vw(240)};
            border: 1px solid ${({ theme }) => theme.highlightColor};
            padding: 12px;
            background-color: #f8f8f8;
            > p {
              color: ${({ theme }) => theme.highlightColor};
              text-align: left;
              position: relative;
              bottom: 0;
              letter-spacing: -0.35px;
              &:nth-of-type(1) {
                font: 600 14px/20px ${({ theme }) => theme.noto};
              }
              &:nth-of-type(2) {
                margin-left: 8px;
                margin-top: 12px;
                font: 400 14px/20px ${({ theme }) => theme.noto};
              }
            }
          }
        }
        &:nth-of-type(2) {
          width: ${px2vw(480)};
          > .text {
            margin-bottom: 12px;
            input,
            textarea {
              width: ${px2vw(480)};
              border: ${({ theme }) => theme.border};
              font: 500 14px/20px ${({ theme }) => theme.noto};
              padding: 10px 12px;
              color: #151515;
              letter-spacing: -0.35px;
              &::placeholder {
                letter-spacing: -0.35px;

                color: #9d9d9d;
              }
              &:focus {
                outline: none;
              }
            }
            textarea {
              resize: none;
              height: 140px;
            }
            > p {
              margin-top: 4px;
              font: 400 10px ${({ theme }) => theme.roboto};
              transform: scale(0.8);
              color: #707070;
              letter-spacing: -0.2px;
              transform-origin: left;
            }
          }
          > .thumbnail {
            margin: 22px 0;
            > p {
              font: 500 14px/20px ${({ theme }) => theme.noto};
              color: #151515;
              margin-bottom: 4px;
              > span {
                font: 400 12px/30px ${({ theme }) => theme.noto};
                color: ${({ theme }) => theme.highlightColor};
              }
            }
            > div {
              position: relative;
              height: ${px2vw(100)};
              width: ${px2vw(150)};
              background-color: #e0e0e0;
              .btn {
                width: 48px;
                height: auto;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              > input {
                position: absolute;
                width: 0;
                height: 0;
              }
              > label {
                height: ${px2vw(100)};
                width: ${px2vw(150)};
                display: block;
                position: absolute;
                z-index: 10;
                top: 0;
                left: 0;
                cursor: pointer;
              }
              > img {
                height: ${px2vw(100)};
                width: ${px2vw(150)};
                object-fit: cover;
                position: relative;
              }
            }
          }
          > .btnCont {
            display: flex;
            gap: 12px;
            justify-content: end;
          }
        }
      }
    }
  }
  span.error {
    position: absolute;
    font: 400 12px/30px ${({ theme }) => theme.noto};
    text-align: center;
    width: 100%;
    top: 10%;
    color: ${({ theme }) => theme.errorColor};
  }
  @media (max-width: 1600px) {
    > .popup > div.inner > div:nth-of-type(1) > div {
      .info {
        font: 500 10px/20px ${({ theme }) => theme.noto};
      }
    }
  }
  @media (max-width: 1362px) {
    > .popup {
      width: ${px2vw(1028)};
      > div.inner {
        gap: ${px2vw(20)};
        > div {
          &:nth-of-type(1) {
            width: ${px2vw(324)};
            height: ${px2vw(216)};
            > div {
              height: ${px2vw(216)};
              img.thumb {
                height: ${px2vw(216)};
              }
              img.btn {
                width: ${px2vw(28)};
                top: 30%;
              }
              .info {
                font: 500 10px/1.2 ${({ theme }) => theme.noto};
              }
            }
            > ul.authorInfo {
              margin-top: 16px;
              > li {
                margin-bottom: 10px;
                > p {
                  font: 400 12px/18px ${({ theme }) => theme.noto};
                }
                > span {
                  font: 500 12px/18px ${({ theme }) => theme.noto};
                }
                > input {
                  font: 500 12px/18px ${({ theme }) => theme.noto};
                  width: calc(${px2vw(300)} - 32px);
                }
              }
            }
            div.upload-info {
              margin-top: 4px;
              padding: 8px;
              > p {
                font: 400 12px ${({ theme }) => theme.noto};
              }
            }
          }
          &:nth-of-type(2) {
            width: ${px2vw(600)};
            > .text {
              input,
              textarea {
                font: 500 12px/18px ${({ theme }) => theme.noto};
                width: ${px2vw(600)};
              }
            }
            > .thumbnail {
              > p {
                font: 500 12px/20px ${({ theme }) => theme.noto};
                > span {
                  font: 400 10px/30px ${({ theme }) => theme.noto};
                }
              }
              > div {
                .btn {
                  width: 32px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 960px) {
    > .popup {
      width: ${px2vw(1248)};
      > div.inner {
        gap: ${px2vw(20)};
        > div {
          &:nth-of-type(1) {
            > div {
              img.btn {
                width: ${px2vw(20)};
              }
            }
            > ul.authorInfo {
              > li {
                > p {
                  font: 400 10px ${({ theme }) => theme.noto};
                }
                > span {
                  font: 500 10px ${({ theme }) => theme.noto};
                }
                > input {
                  font: 500 10px ${({ theme }) => theme.noto};
                }
              }
            }
            div.upload-info {
              > p {
                font: 400 10px ${({ theme }) => theme.noto};
              }
            }
          }
          &:nth-of-type(2) {
            width: ${px2vw(780)};
            > .text {
              input,
              textarea {
                font: 500 10px/20px ${({ theme }) => theme.noto};
                width: ${px2vw(780)};
              }
            }
            > .thumbnail {
              > p {
                font: 500 10px/20px ${({ theme }) => theme.noto};
                > span {
                  font: 400 10px/30px ${({ theme }) => theme.noto};
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 842px) {
    > .popup {
      width: ${px2vw(1248)};
      > div.inner {
        gap: ${px2vw(20)};
        flex-direction: column;
        > div {
          &:nth-of-type(1) {
            > div {
              img.btn {
                width: ${px2vw(20)};
              }
            }
            > ul.authorInfo {
              > li {
                > p {
                  font: 400 10px ${({ theme }) => theme.noto};
                }
                > span {
                  font: 500 10px ${({ theme }) => theme.noto};
                }
                > input {
                  font: 500 10px ${({ theme }) => theme.noto};
                }
              }
            }
            div.upload-info {
              > p {
                font: 400 10px ${({ theme }) => theme.noto};
              }
            }
          }
          &:nth-of-type(2) {
            width: ${px2vw(780)};
            > .text {
              input,
              textarea {
                font: 500 10px/20px ${({ theme }) => theme.noto};
                width: ${px2vw(780)};
              }
            }
            > .thumbnail {
              > p {
                font: 500 10px/20px ${({ theme }) => theme.noto};
                > span {
                  font: 400 10px/30px ${({ theme }) => theme.noto};
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ArtPopup;
