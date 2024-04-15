import styled from 'styled-components';

export const TermsConditionStyle = styled.div`
  h1{
    color : ${({ mode }) => (mode == 'light' ? '#151515' : '#ffff')};
  }
  > div.box {
    form {
      ul.termUl {
        li {
          display: flex;
          position: relative;
          &:not(:last-of-type) {
            margin-bottom: 18px;
          }
          &:last-of-type {
            margin-bottom: 20px;
          }
          input {
            -webkit-appearance: none;
            &::after {
              margin-top: 3px;
              display: block;
              content: '';
              width: 12px;
              height: 12px;
              border: 1px solid #9d9d9d;
              position: absolute;
              z-index: 10;
              left: 0;
            }
            &:checked::after {
              border: 1px solid ${({ theme }) => theme.mainColor};
              background-image: url('/img/checked.svg');
            }
          }
          label {
            margin-left: 20px;
            line-height: 18px;
            font: 400 14px/20px ${({ theme }) => theme.noto};

            width: 100%;
            p {
              position: relative;
              width: 85%;
              display: block;
              letter-spacing: -0.28px;
              color: #151515;
              span {
                &.nec {
                  color: ${({ theme }) => theme.highlightColor};
                }
                margin-right: 4px;
                letter-spacing: -0.28px;
              }
            }
          }
          span.readAll {
            right: 0;
            position: absolute;
            font-size: 12px;
            color: #707070;
            letter-spacing: -0.24px;
            cursor: pointer;
          }
        }
      }
      hr {
        width: 280px;
        height: 1px;
        background-color: #e0e0e0;
        border: none;
        margin-bottom: 12px;
      }
      > input {
        -webkit-appearance: none;
        &::after {
          top: 3px;
          display: block;
          content: '';
          width: 12px;
          height: 12px;
          border: 1px solid #9d9d9d;

          position: relative;
          z-index: 10;
          left: 0;
          margin-right: 8px;
        }
        &:checked::after {
          border: 1px solid ${({ theme }) => theme.mainColor};

          background-image: url('/img/checked.svg');
        }
      }
      > label {
        font: 500 14px/20px ${({ theme }) => theme.noto};
        color: #151515;
      }
      > p {
        font-size: 12px;
        letter-spacing: -0.24px;
        margin-left: 20px;
        margin-bottom: 32px;
        margin-top: 6px;
        color: #707070;
      }
      button {
        width: 280px;
        height: 32px;
        border: none;
        background-color: ${({ theme }) => theme.mainColor};
        color: #fff;
        transition: all 0.2s;
        &:disabled {
          background-color: #e0e0e0;
          color: #9d9d9d;
        }
      }
    }
  }
`;
