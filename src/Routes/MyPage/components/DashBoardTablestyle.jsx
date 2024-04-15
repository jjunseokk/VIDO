import styled from 'styled-components';

export const DashBoardTablestyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  > thead {
    td {
      border-top: 1px solid #f8f8f8;
      border-bottom: 1px solid #f8f8f8;
      height: 14px;
      line-height: 14px;
      > p {
        font: 400 10px ${({ theme }) => theme.noto};
        transform: scale(0.8);
        transform-origin: left;
        text-align: left;
      }
      &:last-of-type {
        padding-left: 24px;
      }
    }
  }
  td {
    &:nth-of-type(1) {
      width: 64px;
    }
  }
  > tbody {
    td {
      height: 42px;
      border-bottom: 1px solid #f8f8f8;
      &:nth-of-type(1) {
        > p {
          font: 400 10px ${({ theme }) => theme.roboto};
          transform: scale(0.8);
        }
      }
      &:nth-of-type(2) {
        display: flex;
        > img {
          margin-top: 6px;
          width: 48px;
          height: 32px;
          border-radius: 4px;
          display: inline-block;
          object-fit: cover;
          margin-right: 8px;
        }
        > p {
          display: block;
          font-size: 14px;
          > span:nth-of-type(1) {
            color: #707070;
            font: 500 10px/10px ${({ theme }) => theme.noto};
          }
          > span:nth-of-type(2) {
            color: #707070;
            font: 400 10px/10px ${({ theme }) => theme.noto};
            transform: scale(0.8);
            transform-origin: left;
          }
        }
      }
      &:nth-of-type(3) {
        font: 400 12px ${({ theme }) => theme.roboto};
        color: #707070;
      }
      &:last-of-type {
        padding-left: 24px;
        font: 400 12px ${({ theme }) => theme.roboto};
        color: #707070;
      }
    }
  }
  @media (max-width: 1424px) {
    > thead td:last-of-type {
      padding-left: 12px;
    }
    > tbody {
      td:last-of-type {
        padding-left: 12px;
        font: 400 10px ${({ theme }) => theme.roboto};
      }
    }
  }
`;
