import styled from 'styled-components';
import px2vw from '../../util/px2vw';

export const MyArtStyle = styled.div`
  width: ${px2vw(970)};
  height: 785px;
  border: ${({ theme }) => theme.border};
  position: relative;
  overflow: hidden;
  color: #151515;
  font-family: ${({ theme }) => theme.noto};
  > button {
    position: absolute;
    top: 24px;
    left: 24px;
    width: 148px;
    font-family: ${({ theme }) => theme.noto};
    color: #707070;
    height: 32px;
    background: none;
    border: ${({ theme }) => theme.border};
    border-radius: 16px;
    transition: all 0.2s;
    cursor: pointer;
    &:nth-of-type(1) {
      background-color: #002e85;
      color: #fff;
      border: 1px solid #002e85;
      &:hover {
        background-color: #fff;
        border-color: ${({ theme }) => theme.mainColor};
        color: ${({ theme }) => theme.mainColor};
      }
    }
    &:nth-of-type(2) {
      left: 180px;
    }
    &:hover {
      border-color: ${({ theme }) => theme.mainColor};
      color: ${({ theme }) => theme.mainColor};
    }
  }
  > ul {
    display: flex;
    color: #707070;
    font-size: 14px;
    position: absolute;
    top: 44px;
    right: 53px;
    width: fit-content;
    gap: 15px;
    li {
      padding: 0 6px;
      line-height: 12px;
      position: relative;
      cursor: pointer;

      &:last-of-type {
        padding: 0 0 0 6px;
      }
    }
  }
  table,
  th,
  td {
    border: none;
  }
  table {
    position: relative;
    top: 72px;
    width: 100%;

    overflow-x: hidden;
    thead {
      height: 48px;
      background-color: #f8f8f8;
      color: #707070;
      td {
        height: 48px;
        margin: 0 12px;
        font: 500 14px/20.72px ${({ theme }) => theme.noto};
        text-align: center;
        border-top: ${({ theme }) => theme.border};
        border-bottom: ${({ theme }) => theme.border};
        font-family: ${({ theme }) => theme.noto};
        color: #707070;
        // &:nth-of-type(1) {
        //   width: 120px;

        //   padding-left: 3%;
        // }
        // &:nth-of-type(2) {
        //   margin: 0 10px;

        //   width: 70px;
        // }
        &:nth-of-type(1) {
          text-align: center;
          padding-left: 30px;
        }
        &:nth-of-type(2) {
          padding-left: 0px;
          text-align: center;
        }
        &:nth-of-type(3) {
          text-align: center;
          width: 25%;
        }
        // &:nth-of-type(4) {
        //   width: 78px;
        // }

        // &:nth-of-type(5) {
        // }
        // &:nth-of-type(6) {
        // }
        // &:nth-of-type(7) {
        // }
        &:last-of-type {
          width: 8%;
        }
      }
    }
    tbody {
      tr {
        &:not(.removed) {
          cursor: pointer;
          transition: all 0.2s;
          &:hover {
            background-color: #f8f8f8;
          }
        }
        td {
          > span {
            font: 500 12px ${({ theme }) => theme.noto};
            color: #707070;
            text-align: center;
            display: inline-block;
          }
          height: 96px;
          border-bottom: ${({ theme }) => theme.border};
          &:nth-of-type(1) {
            padding-left: 3%;
            font-family: ${({ theme }) => theme.roboto};
            font-weight: 400;
            text-align: center;
            color: #151515;
            margin: 0 12px;
          }
          &:nth-of-type(2) {
            img {
              height: 70px;
              width: 105px;
              object-fit: cover;
              margin: 0 auto;
              display: block;
            }
          }
          &:nth-of-type(3) {
            padding: 0 12px;
            word-break: break-all;
            width: 25%;
            p {
              word-break: break-all;
              font-family: ${({ theme }) => theme.noto};
              font-size: 14px;
              letter-spacing: -0.35px;
              font-weight: 500;
              color: #707070;
              margin-bottom: 4px;
              &:last-of-type {
                font-size: 12px;
                letter-spacing: -0.3px;
                font-weight: 400;
              }
            }
          }
          &:nth-of-type(4) {
            text-align: center;
            font-family: ${({ theme }) => theme.noto};
            color: #707070;
            font-size: 12px;
            margin: 0 12px;
          }

          &:nth-of-type(5) {
            text-align: center;
            margin: 0 12px;
            font-size: 12px;
            font-family: ${({ theme }) => theme.noto};
            color: #707070;
          }
          &:nth-of-type(6) {
            font-family: ${({ theme }) => theme.noto};
            margin: 0 12px;
            font-size: 12px;
            color: #707070;
            text-align: center;
          }
          &:nth-of-type(7) {
            font-size: 12px;
            font-family: ${({ theme }) => theme.noto};
            color: #707070;
            margin: 0 12px;
            text-align: center;
            > a {
              position: relative;
              color: ${({ theme }) => theme.errorColor};
              text-decoration: underline;
              &:hover {
                color: ${({ theme }) => theme.mainColor};
              }
            }
          }

          &:last-of-type {
            position: relative;
            div:nth-of-type(1) {
              position: absolute;
              top: 42px;
              right: 55px;
              margin: 0;
              padding: 0;
              input {
                position: absolute;
              }
            }
            img {
              position: absolute;
              top: 23px;
              right: 19px;
              cursor: pointer;
              object-position: center;
              padding: 20px 20px;
            }
            div.popup {
              width: 48px;
              height: max-content;
              box-shadow: 0px 3px 6px #00000029;
              position: absolute;
              right: 39px;
              top: 56px;
              background: #fff;
              display: none;
              z-index: 20;
              span {
                font-size: 12px;
                color: #707070;
                display: block;
                line-height: 16px;
                padding: 8px 0 9px 0;
                text-align: center;
                cursor: pointer;
              }
              > div {
                display: block;
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                z-index: -1000;
                width: 100vw;
                height: 100vh;
              }
            }
          }
        }
      }
    }
    td {
      padding: 0 10px;
      &:nth-of-type(1) {
        width: 100px;
      }
    }
  }
  > div {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    .pagination{
      display: flex;
      justify-content: center;
      width: ${px2vw(500)};
      margin: 0 auto;
  
      >p{
        padding: 0px 10px;
        font: 500 14px/20px;
        color: #9d9d9d;
        cursor: pointer;
      }
      >p.active{
       color: ${({ mode }) => (mode == 'light' ? '#363636' : 'white')};
      }
      >button{
        padding: 0px 5px;
      }
    }
  }
  @media (max-width: 1600px) {
    width: ${px2vw(1020)};
    table {
      thead td {
        font-size: 12px;
        letter-spacing: -0.5px;
        &:nth-of-type(1) {
          padding-left: 20px;
        }
        &:nth-of-type(2) {
          padding-left: 20px;
        }
        &:last-of-type {
          width: 7%;
        }
      }
      tbody tr td {
        > span {
          font: 400 10px ${({ theme }) => theme.noto};
        }
        &:nth-of-type(1) {
          font-size: 14px;
        }
        &:nth-of-type(2) {
          img {
            height: ${px2vw(70)};
            width: ${px2vw(105)};
          }
        }
        &:nth-of-type(3) {
          p {
            font-size: 12px;
            &:last-of-type {
              font-size: 10px;
            }
          }
        }
        &:nth-of-type(4) {
          font-size: 10px;
        }
        &:nth-of-type(5) {
          font-size: 10px;
        }
        &:nth-of-type(6) {
          font-size: 10px;
        }
        &:nth-of-type(7) {
          font-size: 10px;
        }
        &:last-of-type {
          img {
          }
        }
      }
    }
  }
  @media (max-width: 1442px) {
  }
  @media (max-width: 1240px) {
    width: ${px2vw(1040)};
  }
  @media (max-width: 1150px) {
    width: ${px2vw(1020)};

    > button {
      font-size: 12px;
      width: 132px;
      &:nth-of-type(2) {
        left: 164px;
      }
    }
    table {
      thead td {
        height: 24px;
        font-size: 10px;
        letter-spacing: -0.5px;
        margin: 0 4px;
        &:nth-of-type(1) {
          padding-left: 0px;
          width: 50px;
        }
        &:nth-of-type(2) {
          padding-left: 0px;
        }
        &:nth-of-type(3) {
          width: 12%;
        }
        &:last-of-type {
          width: 7%;
        }
      }
      tbody tr td {
        height: 70px;
        > span {
          font: 400 10px ${({ theme }) => theme.noto};
        }
        &:nth-of-type(1) {
          width: 50px;
          font-size: 12px;
          padding-left: 0;
          margin: 0 4px;
        }
        &:nth-of-type(2) {
          img {
            height: ${px2vw(70)};
            width: ${px2vw(105)};
          }
        }
        &:nth-of-type(3) {
          padding: 0;
          width: 15%;
          p {
            font-size: 10px;
            &:last-of-type {
            }
          }
        }
        &:nth-of-type(4) {
          font-size: 10px;
        }
        &:nth-of-type(5) {
          font-size: 10px;
        }
        &:nth-of-type(6) {
          font-size: 10px;
        }
        &:nth-of-type(7) {
          font-size: 10px;
        }
        &:last-of-type {
          img {
            top: 10px;
            right: 10px;
          }
        }
      }
    }
  }
  @media (max-width: 842px) {
    height: 685px;
    width: ${({ theme }) => theme.pgWidth};
    width: 90vw;
  }
`;
