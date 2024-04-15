import styled from 'styled-components';
import px2vw from '../util/px2vw';

export const UserDashboardStyle = styled.div`
  > div {
    &:nth-of-type(1) {
      width: ${px2vw(970)};
      /* width: 970px; */
      border: 1px solid #e0e0e0;
      background-color: #fff;
      height: 785px;
      position: absolute;
      > button {
        position: absolute;
        top: 5px;
        z-index: 10;
        right: 5px;
        background: none;
        border: none;
        cursor: pointer;
        path {
          stroke: #9d9d9d;
          transition: all 0.2s;
        }
        &:hover {
          path {
            stroke: ${({ theme }) => theme.mainColor};
            stroke-width: 2px;
          }
        }
      }
      > header {
        position: relative;
        padding-top: 13px;
        height: 92px;
        > h1 {
          font: 700 22px/32.56px ${({ theme }) => theme.noto};
          color: #151515;
          margin-left: 19px;
          margin-bottom: 11px;
        }
        > div.select {
          width: 120px;
          height: 24px;

          position: absolute;
          bottom: 12px;
          left: 20px;

          > button {
            width: 120px;
            z-index: 30;
            cursor: pointer;
            position: absolute;
            top: 0;
            height: 24px;
            background: none;
            border: ${({ theme }) => theme.border};
            text-align: left;
            padding-left: 16px;
            color: #707070;
            font-size: 12px;
            line-height: 2;
            background-color: #fff;
            padding-left: 16px;
            font-weight: 500;
            font-family: ${({ theme }) => theme.noto};
            svg {
              position: absolute;
              top: 4px;
              right: 4px;
            }
          }
          > span {
            font-size: 10px;
            color: #9d9d9d;
            line-height: 1.5;
            bottom: 0;
            position: absolute;
            left: 130px;
            width: max-content;
          }

          > ul {
            z-index: 1;
            font-weight: 500;
            position: absolute;
            top: 24px;
            box-shadow: 0px 3px 6px #00000029;
            background: #fff;
            > li {
              background: #fff;
              > p {
                width: 120px;
                color: #707070;
                font-size: 12px;
                line-height: 2;
                padding-left: 16px;
                cursor: pointer;
                position: relative;
                font-weight: 500;
                font-family: ${({ theme }) => theme.noto};

                transition: all 0.2s;
                &:hover {
                  background-color: #f8f8f8;
                  color: ${({ theme }) => theme.mainColor};
                }
              }
              > div {
                position: absolute;
                bottom: 0;
                right: -80px;
                background: #fff;

                box-shadow: 0px 3px 6px #00000029;
                width: 80px;
                height: 134px;
                > div {
                  display: flex;
                  flex-wrap: wrap;
                  &:nth-of-type(1) {
                    justify-content: center;
                    height: 24px;
                    p {
                      line-height: 32px;
                      font-size: 10px;
                      text-align: center;
                      color: #9d9d9d;
                      transform: scale(0.8) center center;
                    }
                  }
                  &:nth-of-type(2) {
                    margin-top: 15px;
                    p {
                      &.disabled {
                        cursor: default;
                        color: #e0e0e0;
                      }
                      cursor: pointer;
                      line-height: 1;
                      font-size: 10px;
                      font-family: ${({ theme }) => theme.noto};
                      color: #9d9d9d;
                      text-align: center;
                      display: block;
                      width: 24px;
                      height: 24px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      > nav {
        height: 44px;
        border-top: ${({ theme }) => theme.border};
        border-bottom: ${({ theme }) => theme.border};
        > ul {
          display: flex;
          li {
            margin: 0px 30px;
            margin-left: 30px;
            cursor: pointer;
            text-align: center;
            font: 500 14px ${({ theme }) => theme.noto};
            line-height: 44px;
            position: relative;
            height: 44px;
            transition: all 0.2s;
            color: #707070;
            &.selected {
              &::after {
                transition: all 0.2s;
                content: '';
                display: block;
                position: absolute;
                bottom: 0px;
                height: 2px;
                background-color: ${({ theme }) => theme.mainColor};
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 1084px) {
    height: 785px;
    > div {
      &:nth-of-type(1) {
        overflow-y: scroll;
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
      }
    }
  }
  @media (max-width: 842px) {
    width: 90vw;
    > div:nth-of-type(1) {
      width: 90vw;
    }
  }
`;
