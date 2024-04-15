import styled from 'styled-components';

const MediaArtPageStyle = styled.div`
  > .title {
    display: flex;
    width: ${({ theme }) => theme.pgWidth};
    position: relative;
    margin-left: ${({ theme }) => theme.left};
    margin-top: 74px;
    justify-content: space-between;
    h1 {
      font: 600 22px/33px ${({ theme }) => theme.noto};
      color: #151515;
      margin-bottom: 24px;
      letter-spacing: -0.44px;
      > span {
        color: #151515;
        margin-left: 24px;
        letter-spacing: -0.4px;
        position: relative;
        font: 400 20px/29px ${({ theme }) => theme.noto};
        &::after {
          position: absolute;
          left: -12px;
          height: 20px;
          width: 1px;
          display: block;
          top: 4px;
          content: '';
          background-color: #c1c1c1;
        }
      }
    }
    > p {
      position: relative;
      top: 10px;
      span {
        font-family: ${({ theme }) => theme.noto};
        font-weight: 500;
        font-size: 14px;
        letter-spacing: -0.35px;
        margin-left: 24px;
        cursor: pointer;
      }
    }
  }
  .search {
    height: 32px;
    width: 100%;
    position: relative;
    > ul {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    > div {
      margin-left: ${({ theme }) => theme.left};
      width: 310px;
      border-bottom: 1px solid #e0e0e0;
      > input {
        background: none;
        outline: none;
        border: none;
        height: 32px;
        width: 280px;
        padding: 4px 6px;
        &::placeholder {
          color: #9d9d9d;
          font: 400 14px/20px ${({ theme }) => theme.noto};
        }
        &:focus {
          border: none;
          &::placeholder {
            opacity: 0;
          }
        }
      }
      img {
        width: 24px;
        height: 24px;
        margin-top: 4px;
        cursor: pointer;
      }
    }
  }
  .chartlist {
    min-height: calc(30vw + 204px);
  }
`;

export default MediaArtPageStyle;
