import styled from 'styled-components';
const TagListSearchStyle = styled.div`
  > div {
    display: flex;
    width: ${({ theme }) => theme.pgWidth};
    margin-bottom: 13px;
    gap: 12px;
    > p {
      font: 400 16px/30px ${({ theme }) => theme.noto};
      width: max-content;
      word-break: keep-all;
      color: ${({ mode }) => (mode == 'light'? '#151515' : '#c1c1c1')};
    }
    > div {
      flex-wrap: wrap;
      display: flex;
      gap: 6px;
    }
  }
  @media (max-width: 1452px) {
    > div {
      margin-bottom: 10px;
      > p {
        font: 500 12px/24px ${({ theme }) => theme.roboto};
      }
    }
  }
  @media (max-width: 1160px) {
    > div {
      margin-bottom: 8px;
      > p {
        font: 500 10px/20px ${({ theme }) => theme.roboto};
      }
    }
  }
`;

export default TagListSearchStyle;
