import styled from 'styled-components';
import px2vw from '../../util/px2vw';
const SelectArtTagStyle = styled.div`
  width: ${px2vw(480)};
  margin-bottom: 13px;
  gap: 12px;
  > p {
    font: 500 16px/30px ${({ theme }) => theme.noto};
    width: max-content;
    word-break: keep-all;
    color: #151515;
    > span {
      font: 400 12px/30px ${({ theme }) => theme.noto};
      color: ${({ theme }) => theme.highlightColor};
    }
  }
  > div {
    flex-wrap: wrap;
    display: flex;
    gap: 6px 4px;
    &.selected {
      margin-bottom: 6px;
      height: 32px;
      border: ${({ theme }) => theme.border};
      padding: 0 4px;
      > span {
        font: 400 12px/32px ${({ theme }) => theme.roboto};
        color: ${({ theme }) => theme.highlightColor};
        cursor: pointer;
        > svg {
          position: relative;
          top: 2px;
          right: 3px;
        }
      }
    }
  }
  @media (max-width: 1362px) {
    width: ${px2vw(600)};
    > p {
      font: 500 12px ${({ theme }) => theme.noto};
      > span {
        font: 400 10px ${({ theme }) => theme.noto};
      }
    }
    > div {
      gap: 4px 2px;
      &.selected {
        height: 24px;
        > span {
          font: 400 10px/24px ${({ theme }) => theme.noto};
        }
      }
    }
  }
`;

export default SelectArtTagStyle;
