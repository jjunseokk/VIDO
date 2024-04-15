import styled from 'styled-components';
import px2vw from '../util/px2vw';

export const HeaderStyle = styled.header`
  width: 100vw;
  height: 90px;
  z-index: 999;
  position: sticky;
  top: 0;
  /* background-color: ${({ mode }) => (mode == 'light' ? '#fff' : '#151515')}; */
  background-color: ${({ bg }) => (bg == 'black' ? '#000000' : '#ffff')};
  display: flex;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.left};
  align-items: center;

  > nav {
    display: flex;
    gap: ${px2vw(60)};
    align-items: center;

    > a {
      position: relative;
      width: 124.11px;
      padding: none;
      > img {
        display: block;
        width: 100%;
      }
    }
    > ul {
      display: flex;
      align-items: center;
      gap: ${px2vw(36)};
      position: relative;
      > li {
        text-align: center;
        position: relative;
        > p {
          opacity: 0;
          position: relative;
          z-index: 0;
          font: 600 16px/24px ${({ theme }) => theme.noto};
          width: fit-content;
        }
        > a {
          text-align: center;
          position: absolute;
          transition: ${({ theme }) => theme.transition};
          z-index: 5;
          top: 0;
          left: 0;
          font: 400 16px/24px ${({ theme }) => theme.noto};
          /* color: ${({ mode }) => (mode == 'light' ? '#151515' : '#c1c1c1')}; */
          color: ${({ bg }) => (bg == 'black' ? '#ffffff' : '#151515')};
          &:hover {
            color: ${({ theme }) => theme.highlightColor};
          }
          &.active {
            font: 600 16px/24px ${({ theme }) => theme.noto};
            /* color: ${({ mode }) => (mode == 'light' ? '#1152CC' : '#ffffff')}; */
            color: ${({ bg }) => (bg === 'black' ? '#404EFF' : '#1152CC')};
            
          }
        }
      }
    }
  }
  > .left {
    display: flex;
    align-items: center;
    >span{
      margin-right: 10px;
      color: ${({ mode }) => (mode == 'light' ? '#151515' : '#c1c1c1')};
    }
    > .search {
      margin-right: ${px2vw(42)};
      position: relative;
      > input {
        width: ${px2vw(320)};
        height: 30px;
        border: ${({ theme }) => theme.border};
        border-radius: 15px;
        padding-left: 16px;
        transition: ${({ theme }) => theme.transition};
        padding-top: 3px;
        font: 400 14px/30px ${({ theme }) => theme.noto};
        color: ${({ bg }) => (bg == 'black' ? '#ffffff' : '#151515')};
        background-color: ${({ bg }) => (bg == 'black' ? '#000000' : '#ffff')};
        padding-bottom: 4px;
        &::placeholder {
          font: 400 14px ${({ theme }) => theme.noto};
          color: #9d9d9d;
        }
        &:focus {
          border: 1px solid ${({ theme }) => theme.highlightColor};
        }
      }
      > span {
        position: absolute;
        right: 12px;
        width: max-content;
        height: max-content;
        top: 3px;
      }
    }
    > ul {
      display: flex;
      align-items: center;
      font: 400 14px/20px ${({ theme }) => theme.noto};
      position: relative;
      /* color : ${({ mode }) => (mode == 'light' ? '#707070' : '#e0e0e0')}; */
      color : ${({ bg }) => (bg == 'black' ? '#ffffff' : '#707070')};
      gap: ${px2vw(24)};
      position: relative;
      
      a {
        transition: ${({ theme }) => theme.transition};
      }
      
      > div.language {
        display: flex;
        cursor: pointer;
        align-items: center;
        font: 300 14px/20px ${({ theme }) => theme.noto};
        color : ${({ bg }) => (bg == 'black' ? '#ffffff' : '#151515')};
        > img.language_dropdown {
          margin-left: 3px;
          height: 20px;
        }
        
      }
      
      > div.language_dropdown_item {
        position: absolute;
        top: 110%;
        width: 100px;
        left: -50px;
        box-shadow: 0 3px 6px #00000029;
        padding-left: 12px;
        background: ${({ mode }) => (mode == 'light' ? '#ffff' : '#151515')};
        background: ${({ bg }) => (bg == 'black' ? '#000000' : '#ffffff')};

        > div.item {
          cursor: pointer;
          height: 30px;
          font: 300 14px/14px ${({ theme }) => theme.noto};
          vertical-align: center;
          align-items: center;
          display: flex;
        }
        
        > div.item:hover {
          color: ${({ theme }) => theme.highlightColor};
        }
        
      }
      
      > img.language {
        cursor: pointer;
      }
      
      > li {
        &.dropDown {
          box-shadow: ${({ theme }) => theme.boxShadow};
          position: absolute;
          right: 16px;
          top: 36px;
          height: ${({ myPageMenu }) => (myPageMenu ? '300px' : '0px')};
          overflow: hidden;
          transition: ${({ theme }) => theme.transition};
          width: 160px;
          text-align: center;
          font: 400 14px/60px ${({ theme }) => theme.noto};
          letter-spacing: -0.35px;
          z-index: 30;
          > ul {
            background-color: #fff;
            > li {
              a {
                background-color: ${({ mode }) => (mode == 'light' ? "#fff" : "#151515")};
                width: 160px;
                display: block;
                transition: ${({ theme }) => theme.transition};
                color: #707070;
                &:hover {
                  color: ${({ mode }) => (mode == 'light' ? "#1152CC" : "#fff")};
                  background-color: ${({ mode }) => (mode == 'light' ? "#f0f0f0" : "#3f3f3f")};
                }
              }
              &.logout {
                > a {
                  color: ${({ mode }) => (mode == 'light' ? "#002e85" : "#fff")};
                  text-decoration: underline;
                }
              }
            }
          }
        }
        &.manual {
          a {
            position: relative;
            z-index: 20;
           
            &:hover {
              color: ${({ mode }) => (mode == 'light' ? '#002e85' : '#ffffff')};
            }
          }
        }
        > ul.guest {
          position: relative;
          display: flex;
          align-items: center;
          > li {
            > a {
              &:hover {
                color: ${({ mode }) => (mode == 'light' ? '#002e85' : '#ffffff')};
              }
            }
          }
        }
        > ul.loggedIn {
          display: flex;
          gap: 12px;
          align-items: center;
          > li {
            > div {
              position: relative;
              &:nth-of-type(1) {
                width: 32px;
                height: 32px;
                border-radius: 16px;
                background-position: center;
                background-size: cover;
                position: relative;
              }
              &.notification {
                width: 8px;
                height: 8px;
                border-radius: 100%;
                background-color: ${({ theme }) => theme.errorColor};
                position: absolute;
                top: 0;
                right: 0;
              }
            }
          }
        }
      }
    }
  }
  @media screen and(min-width:1492px) {
    > nav {
    }
  }
  @media (max-width: 1528px) {
    > nav {
      gap: ${px2vw(24)};
      > a {
        position: relative;

        width: 90.11px;
        height: auto;
        >img{
          width: 100%;
        }
      }
      > ul {
        gap: ${px2vw(16)};
        > li > a,
        p {
          font: 400 14px/24px ${({ theme }) => theme.noto};
          &.active {
            font: 600 14px/24px ${({ theme }) => theme.noto};
            color: ${({ theme }) => theme.highlightColor};
          }
        }
      }
    }
    > .left {
      > .search {
        input {
          width: ${px2vw(300)};

          font: 400 12px/30px ${({ theme }) => theme.noto};
          &::placeholder {
            font: 400 12px ${({ theme }) => theme.noto};
          }
        }
      }
      > ul {
        font: 400 12px/20px ${({ theme }) => theme.noto};
        gap: ${px2vw(18)};
      }
    }
  }
  @media (max-width: 1206px) {
    height: 72px;
    > nav {
      gap: ${px2vw(25)};
      > a {
        position: relative;

        width: 60.11px;
        height: auto;
      }
      > ul {
        gap: ${px2vw(2)};
        > li > a,
        p {
          font: 400 11px/24px ${({ theme }) => theme.noto};
          &.active {
            font: 600 12px/24px ${({ theme }) => theme.noto};
            color: ${({ theme }) => theme.highlightColor};
          }
        }
      }
    }
    > .left {
      > .search {
        input {
          height: 24px;
          font: 400 10px/30px ${({ theme }) => theme.noto};
          &::placeholder {
            font: 400 10px ${({ theme }) => theme.noto};
          }
        }
        > span {
          right: 4px;
          svg {
            height: 12px;
          }
        }
      }
      > ul {
        font: 400 10px/20px ${({ theme }) => theme.noto};
        gap: ${px2vw(4)};
        > li.dropDown {
          right: 0;
          height: ${({ myPageMenu }) => (myPageMenu ? '200px' : '0px')};
          font: 400 12px/40px ${({ theme }) => theme.noto};
          width: 150px;

          > ul > li > a {
            width: 150px;
          }
        }
      }
    }
  }
  @media (max-width: 992px) {
    height: 72px;

    > nav {
      gap: ${px2vw(8)};

      > a,
      p {
        position: relative;

        width: 60.11px;
        height: auto;
      }
      > ul {
        gap: ${px2vw(4)};

        > li {
          > p {
            font: 400 11px/24px ${({ theme }) => theme.noto};
          }
          > a {
            font: 400 10px/24px ${({ theme }) => theme.noto};
            &.active {
              font: 600 10px/24px ${({ theme }) => theme.noto};
              color: ${({ theme }) => theme.highlightColor};
            }
          }
        }
      }
    }
    > .left {
      > .search {
        input {
          height: 24px;
          font: 400 10px/30px ${({ theme }) => theme.noto};
          &::placeholder {
            opacity: 0;
          }
        }
      }
      > ul {
        font: 400 10px/20px ${({ theme }) => theme.noto};
        gap: ${px2vw(4)};

        > li {
          &.dropDown {
            right: 0;
            height: ${({ myPageMenu }) => (myPageMenu ? '150px' : '0px')};
            font: 400 10px/30px ${({ theme }) => theme.noto};
            width: 120px;

            > ul > li > a {
              width: 120px;
            }
          }
          > ul.loggedIn {
            gap: 2px;
            > li > div {
              &:nth-of-type(1) {
                width: 16px;
                height: 16px;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 762px) {
    height: 64px;
    padding: 0 80px;
    > nav {
      gap: ${px2vw(2)};

      > a {
        position: relative;

        width: 40.11px;
        height: auto;
      }
      > ul {
        gap: ${px2vw(8)};

        > li {
          width: max-content;
          > p {
            font: 500 11px/24px ${({ theme }) => theme.noto};
            letter-spacing: -1px;
            transform: scale(0.92);
          }
          > a {
            font: 400 10px/24px ${({ theme }) => theme.noto};
            letter-spacing: -1px;
            transform: scale(0.92);
            &.active {
              font: 600 10px/24px ${({ theme }) => theme.noto};
              color: ${({ theme }) => theme.highlightColor};
            }
          }
        }
      }
    }
    > .left {
      > .search {
        margin-right: 2px;

        input {
          width: ${px2vw(400)};
          height: 18px;
          font: 400 10px ${({ theme }) => theme.noto};
          &::placeholder {
            opacity: 0;
          }
        }
        > span {
          right: 4px;
          svg {
            height: 12px;
          }
        }
      }
      > ul {
        font: 400 10px/20px ${({ theme }) => theme.noto};
        gap: ${px2vw(4)};
        transform: scale(0.92);
        flex-direction: column;
        > li {
          width: max-content;
          &.dropDown {
            right: 0;
            height: ${({ myPageMenu }) => (myPageMenu ? '150px' : '0px')};
            font: 400 10px/30px ${({ theme }) => theme.noto};
            width: 120px;

            > ul > li > a {
              width: 120px;
            }
          }
          > ul.loggedIn {
            > li > div {
              display: none;
            }
          }
        }
      }
    }
  }
`;
