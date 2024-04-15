import styled from 'styled-components';
import px2vw from '../util/px2vw';

export const PaymentPageStyle = styled.div`
  .popup {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    > div {
      position: absolute;
      &:nth-of-type(1) {
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
      }
      &:nth-of-type(2) {
        background-color: #fff;
        width: 300px;
        box-shadow: ${({ theme }) => theme.boxShadow};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 24px 12px;
        > p {
          font: $bold 14px ${({ theme }) => theme.noto};
          text-align: center;
          margin-bottom: 12px;
        }
        > div {
          width: 276px;
          height: 164px;
          border-radius: 4px;
          background-color: #f8f8f8;
          padding: 12px;
          margin-bottom: 16px;
          > p {
            font: 400 12px/20px ${({ theme }) => theme.noto};
            color: #151515;
          }
        }
        > button {
          margin-left: 98px;
        }
      }
    }
  }
  .duplication {
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
      opacity: 0.3;
    }
    > .popup {
      padding: 36px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 156px;
      box-shadow: ${({ theme }) => theme.boxShadow};
      > p {
        font: 400 16px ${({ theme }) => theme.noto};
        text-align: center;
        margin-bottom: 32px;
      }
      > button {
        width: 80px;
        margin: 0 auto;
        display: block;
        background-color: ${({ theme }) => theme.mainColor};
        color: #fff;
        height: 32px;
      }
    }
  }
  padding: 20px 30px;
  width: ${px2vw(970)};

  border: ${({ theme }) => theme.border};
  border-radius : 5px;
  >div{
    
  }
  > h1 {
    font: 500 16px/23.68px ${({ theme }) => theme.noto};
    color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
    margin-bottom: 11px;
  }
  > h2 {
    font: 500 24px/35.52px ${({ theme }) => theme.noto};
    color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
  }
  > ul {
    margin-top: 12px;
    z-index: 10;
    > li {
      margin-top: 36px;
      > div {
        > p {
          font: 400 12px/17.76px ${({ theme }) => theme.noto};
          color: ${({ mode }) => (mode == 'light' ? '#002E85' : '#1152CC')};
          margin-bottom: 10px;
        }
        button.btn {
          width: 104px;
          height: 32px;
          border: none;
          background-color: ${({ theme }) => theme.mainColor};
          font: 500 14px ${({ theme }) => theme.noto};
          color: #fff;
          transition: all 0.2s;
          cursor: pointer;
          position: relative;
          &:disabled {
            background-color: #9d9d9d;
            cursor: default;
            &:hover {
              &::before,
              &::after {
                width: 0;
              }
            }
          }
          &::before {
            content: '';
            display: block;
            position: absolute;
            z-index: 10;
            top: 4px;
            right: 4px;
            left: auto;
            height: 1px;
            width: 0px;
            background-color: #fff;
            transition: all 0.2s;
          }
          &::after {
            content: '';
            display: block;
            position: absolute;
            z-index: 10;
            right: 4px;
            bottom: 4px;
            left: auto;
            height: 1px;
            width: 0px;
            background-color: #fff;
            transition: all 0.2s;
          }
          &:hover {
            &::after,
            &::before {
              width: 96px;
              right: auto;
              left: 4px;
            }
          }
        }
        span.error {
          position: absolute;
          font: 500 12px/16px ${({ theme }) => theme.noto};
          color: ${({ theme }) => theme.errorColor};
          width: max-content;
          top: 0;
          right: 0;
        }
      }

      &:nth-of-type(1) {
        > div {
          > div {
            position: relative;
            display: flex;
            gap: ${px2vw(12)};

            > div {
              position: relative;
              height: 32px;
              width: ${px2vw(180)};
              > button {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                border: ${({ theme }) => theme.border};
                width: ${px2vw(180)};
                height: 32px;
                background-color: #fff;
                text-align: left;
                padding: 0 12px;
                font: 500 16px/32px ${({ theme }) => theme.noto};
                color: #525252;
                word-wrap: break-word;
                overflow: hidden;
                
                > svg {
                  position: absolute;
                  right: 4px;
                  top: 8px;
                }
              }
              > ul {
                position: absolute;
                z-index: 30;
                width: ${px2vw(180)};
                
                left: 0;
                background-color: #fff;
                box-shadow: ${({ theme }) => theme.boxShadow};
                top: 33px;
                height: 320px;
                overflow-y: scroll;
                overflow-x: hidden;
                > li {
                  font: 500 16px/32px ${({ theme }) => theme.noto};
                  overflow-x: hidden;
                  width: ${px2vw(180)};
                  color: #707070;
                  padding-left: 12px;
                  height: 32px;
                  cursor: pointer;
                  transition: all 0.2s;
                  &:hover {
                    color: ${({ theme }) => theme.mainColor};
                    background-color: #f8f8f8;
                  }
                }
              }
            }
            > input {
              background-color: #fff;
              border: ${({ theme }) => theme.border};
              height: 32px;
              color: #151515;
              font: 400 14px ${({ theme }) => theme.noto};
              padding-left: 12px;
              transition: all 0.2s;
              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              &::placeholder {
                color: #9d9d9d;
              }
              &:focus {
                outline: none;
                border: 1px solid ${({ theme }) => theme.mainColor};
                &::placeholder {
                  opacity: 0;
                }
              }
              width: ${px2vw(396)};
              &:last-of-type{
                width: ${px2vw(200)};
              }
            }
          }
        }
      }
      &:nth-of-type(2) {
        div {
          position: relative;
          > input {
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            border: none;
            outline: none;
            border-bottom: ${({ theme }) => theme.border};
            transition: all 0.2s;
            padding-left: 12px;
            height: 32px;
            font: 400 14px/32px ${({ theme }) => theme.noto};
            margin-right: ${px2vw(12)};
            width: ${px2vw(396)};
            &:focus {
              outline: none;

              border-bottom: 1px solid ${({ theme }) => theme.mainColor};
              &::placeholder {
                opacity: 0;
              }
            }
            &::placeholder {
              color: #9d9d9d;
            }
          }
          > span {
            &:nth-of-type(1) {
              position: absolute;
              left: ${px2vw(376)};
              top: 32px;
              color: #151515;
              font: 400 14px ${({ theme }) => theme.noto};
            }
            &.error {
              left: 520px;
              top: 40px;
            }
          }
        }
      }
      &:nth-of-type(3) {
        > div {
          div {
            > p {
              font: 500 20px ${({ theme }) => theme.noto};
              color: #525252;
            }
          }
        }
      }
      &:nth-of-type(4) {
        > div {
          > div {
            display: flex;
            gap: 12px;
            > div {
              &:nth-of-type(1) {
                width: 180px;
                height: 32px;
                position: relative;
                > button {
                  position: relative;
                  width: 180px;
                  height: 32px;
                  padding: 0 12px;
                  border: 1px solid #e0e0e0;
                  font: 400 16px/32px ${({ theme }) => theme.noto};
                  text-align: left;
                  letter-spacing: -0.32px;
                  color: #525252;
                  > img {
                    right: 12px;
                    top: 6px;
                    position: absolute;
                  }
                  &:disabled {
                    border: 1px solid #e0e0e0;
                    background-color: #f0f0f0;
                    cursor: default;
                  }
                }
                > ul {
                  box-shadow: ${({ theme }) => theme.boxShadow};
                  > li {
                    width: 180px;
                    height: 32px;
                    > p {
                      letter-spacing: -0.32px;
                      color: #525252;
                      padding-left: 12px;
                      font: 400 16px/32px ${({ theme }) => theme.noto};
                      transition: all 0.2s;
                      background-color: #fff;
                      &:hover {
                        background-color: #f0f0f0;
                        color: ${({ theme }) => theme.mainColor};
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      &:last-of-type {
        table {
          border-collapse: collapse;
          width: 100%;
          position: relative;
          tr {
            td {
              padding-left: 12px;
              height: 44px;
              border: ${({ theme }) => theme.border};
              
              &:nth-of-type(1) {
                border-left: none;
                width: 86px;
              }
              &:nth-of-type(2) {
                width: 209px;
              }
              &:nth-of-type(3) {
                width: 148px;
              }
              &:nth-of-type(4) {
                width: 148px;
              }
              &:nth-of-type(5) {
                border-right: none;
                /* width: 114px; */
                cursor: pointer;
              }
            }
          }
          thead {
            td {
              border-top: 2px solid #707070;
              border-bottom: 2px solid #707070;
              p {
                font: 500 16px ${({ theme }) => theme.noto};
                color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
                > span {
                  font: 400 12px ${({ theme }) => theme.noto};
                }
              }
             
            }
          }
          tbody {
            color: ${({ mode }) => (mode == 'light' ? '#151551' : '#ffffff')};
            font: 400 16px ${({ theme }) => theme.noto};
            .gray{
              color: #E0E0E0;
            }
            .red{
              color: #D00000;
            }
            tr{
              >div{
                position: absolute;
                /* width: ${px2vw(319)}; */
                /* width: 319px; */
                /* height: ${px2vw(247)}; */
                /* height: 247px; */
                border: 1px solid #707070;
                box-shadow: 0px 3px 3px 0px #9d9d9d;
                background: #ffff;
                padding: 0px 11px;
                margin-top: 20px;
                z-index: 10;
                >img{
                  position: absolute;
                  top: 11px;
                  right: 11px;
                  cursor: pointer;
                }
                >p{
                  font: 400 12px ${({ theme }) => theme.noto};
                  color: #002E85;
                  margin-top: 25px;
                }
                >div{
                  width: ${px2vw(297)};
                  /* width: 297px; */
                  height: ${px2vw(185)};
                  /* height: 185px; */
                  border: 1px solid #E0E0E0;
                  margin-top: 8px;
                  margin-bottom: 11px;
                  padding: 5px 9px;
                  color: #9D9D9D;
                  font: 400 14px ${({ theme }) => theme.noto};
                }
              }
            }
          }
        }
      }
      .pagination{
        display: flex;
        justify-content: center;
        width: ${px2vw(500)};
        margin: 0 auto;
        margin-top: 15px;
        
        >p{
          margin-top: 3.5px;
          padding: 0px 10px;
          font: 400 14px/20px;
          color: #9d9d9d;
          cursor: pointer;
        }
        >p.active{
          color: ${({ mode }) => (mode == 'light' ? '#1152CC' : 'white')};
        }
        >button{
          padding: 0px 5px;
        }
      }
    }
  }
  @media (max-width: 1600px) {
    width: ${px2vw(1020)};
    > ul > li {
      &:nth-of-type(1) {
        > div {
          > div {
            > div {
              width: 160px;
              > button {
                font: 500 14px/32px ${({ theme }) => theme.noto};
              }
              > ul {
                width: ${px2vw(180)};

                > li {
                  font: 400 12px/25px ${({ theme }) => theme.noto};
                  width: ${px2vw(180)};
                }
              }
            }
            > input {
              font: 400 12px ${({ theme }) => theme.noto};
            }
          }
        }
      }
      &:nth-of-type(2) {
        div {
          > input {
            font: 400 12px ${({ theme }) => theme.noto};
            width: ${px2vw(446)};
          }
          > span {
            &:nth-of-type(1) {
              font: 400 12px ${({ theme }) => theme.noto};
              top: 36px;
              left: ${px2vw(426)};
            }
            &.error {
              position: relative;
              top: 0;
              left: 20px;
            }
          }
        }
      }
      &:nth-of-type(4) {
        > div > div > div {
          &:nth-of-type(1) {
            width: 160px;
            > button {
              width: 160px;
              font: 500 14px/32px ${({ theme }) => theme.noto};
            }
            > ul > li {
              width: 160px;
              > p {
                font: 400 14px/32px ${({ theme }) => theme.noto};
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 1240px) {
    width: ${px2vw(1040)};
    > ul > li {
      &:nth-of-type(1) {
        > div > div {
          flex-direction: column;
          > div {
            width: 180px;
            > button {
              width: 180px;
            }
            > ul {
              width: 180px;
              > li {
                width: 180px;
              }
            }
          }
          > input {
            width: 260px;
          }
        }
      }
      &:nth-of-type(2) {
        div {
          > input {
            width: 300px;
            display: block;
            margin-bottom: ${px2vw(12)};
          }
          > span {
            &:nth-of-type(1) {
              left: 290px;
            }
          }
        }
      }
    }
  }
  @media (max-width: 842px) {
    width: 90vw;
    > ul > li {
      &:last-of-type {
        table {
          thead td p {
            font: 500 12px ${({ theme }) => theme.noto};
          }
          tbody {
            font: 400 12px ${({ theme }) => theme.noto};
          }
        }
      }
    }
  }

  span.request_error {
    font: 500 12px/12px ${({ theme }) => theme.noto};
    color: ${({ theme }) => theme.errorColor};
    width: max-content;
    margin-left: 10px;
  }
`;
