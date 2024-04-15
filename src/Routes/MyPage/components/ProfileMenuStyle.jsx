import styled from 'styled-components';
import px2vw from '../../util/px2vw';

export const ProfileMenuStyle = styled.div`
  width: ${px2vw(290)};
  height: 785px;
  border-radius: 4px;
  border: ${({ theme }) => theme.border};
  position: relative;
  > .upper {
    width: 100%;
    height: ${px2vw(232)};
    background-color: ${({ mode }) => (mode == 'light' ? '#f8f8f8' : '#151515')};
    padding-top: ${px2vw(32)};
    position: relative;
    border-bottom: ${({ theme }) => theme.border};
    display: flex;
    flex-direction: column;
    > .profImg {
      width: ${px2vw(120)};
      height: ${px2vw(120)};
      border-radius: 100%;
      margin-left: ${px2vw(85)};
      margin: 0 auto;
      position: relative;
      > .input {
        position: absolute;
        bottom: 1px;
        right: 1px;
        width: 30px;
        height: 30px;
        .info {
          position: absolute;
          top: -44px;
          left: -142px;
          box-shadow: ${({ theme }) => theme.boxShadow};
          background-color: #fff;
          padding: 10px;
          text-align: center;
          overflow: hidden;
          font: 400 14px ${({ theme }) => theme.noto};
          color: ${({ theme }) => theme.highlightColor};
          opacity: 0;
          transition: opacity 0.2s;
          width: 0;
          height: 0;
        }
        &:hover {
          .info {
            transition: opacity 0.2s;
            opacity: 1;
            width: 160px;
            height: 60px;
          }
        }
        > form {
          position: absolute;
          top: 0;
          left: 0;
          > input {
            filter: drop-shadow(${({ theme }) => theme.boxShadow});
            display: block;
            border: 1px solid #141414;
            position: absolute;
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    > .name {
      margin-top: 20px;
      text-align: center;
      font: 700 14px ${({ theme }) => theme.noto};
      letter-spacing: 0.35px;
      color:  ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};;

      > span {
        font: 400 14px ${({ theme }) => theme.noto};
      }
    }
  }
  > .nav {
    width: 100%;
    > li {
      height: 42px;
      padding-left: ${px2vw(60)};
      font: 400 16px/42px ${({ theme }) => theme.noto};
      color: #151515;
      border-bottom: ${({ theme }) => theme.border};
      &:hover {
        color: ${({ theme }) => theme.mainColor};
      }
      a {
        display: block;
        width: 97%;
        &.active {
          font: 700 16px/42px ${({ theme }) => theme.noto};
        }
      }
    }
  }
  @media (max-width: 1600px) {
    width: ${px2vw(240)};
    > .upper {
      > .profImg {
        > .input {
          .info {
            left: -104px;
            width: 120px;
            padding: 8px;
          }
        }
      }
      > .name {
        margin-top: 13px;
        font: 700 12px ${({ theme }) => theme.noto};
      }
    }
    > .nav > li {
      height: 36px;
      font: 400 14px/36px ${({ theme }) => theme.noto};

      padding-left: ${px2vw(40)};
      a.active {
        font: 700 14px/36px ${({ theme }) => theme.noto};
      }
    }
  }
  @media (max-width: 1240px) {
    width: ${px2vw(220)};
    > .upper {
      > .profImg {
        > .input {
          .info {
            left: -104px;
            padding: 6px;
            font: 400 12px ${({ theme }) => theme.noto};
          }
          &:hover {
            .info {
              height: 48px;
              width: 140px;
            }
          }
        }
      }
      > .name {
        margin-top: 13px;
        font: 700 12px ${({ theme }) => theme.noto};
        > span {
          font: 400 12px ${({ theme }) => theme.noto};
        }
      }
    }
    > .nav > li {
      height: 36px;
      font: 400 12px/36px ${({ theme }) => theme.noto};

      padding-left: ${px2vw(30)};
      a.active {
        font: 700 12px/36px ${({ theme }) => theme.noto};
      }
    }
  }
  @media (max-width: 1052px) {
    width: ${px2vw(220)};
    > .upper {
      > .profImg {
        > .input {
          width: 20px;
          height: 20px;
          img {
            width: 20px;

            height: 20px;
          }
          > input {
            width: 20px;

            height: 20px;
          }
          .info {
            left: -104px;
            padding: 6px;
            font: 400 10px ${({ theme }) => theme.noto};
          }
          &:hover {
            .info {
              height: 40px;
              width: 120px;
            }
          }
        }
      }
      > .name {
        margin-top: 8px;
        font: 500 10px ${({ theme }) => theme.noto};
        letter-spacing: -0.8px;
        > span {
          font: 400 10px ${({ theme }) => theme.noto};
        }
      }
    }
    > .nav > li {
      height: 36px;
      font: 400 10px/36px ${({ theme }) => theme.noto};

      padding-left: ${px2vw(20)};
      a.active {
        font: 500 10px/36px ${({ theme }) => theme.noto};
      }
    }
  }
  @media (max-width: 842px) {
    width: 90vw;
    display: flex;
    height: ${px2vw(232)};
    > .upper {
      width: ${px2vw(282)};
      > .name > span {
        display: none;
      }
    }
    > .nav {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      height: 100%;
      align-items: center;
      > li {
        width: 100%;
        border-bottom: none;
        &:not(:first-of-type) {
          border-left: ${({ theme }) => theme.border};
        }
      }
    }
  }
`;
