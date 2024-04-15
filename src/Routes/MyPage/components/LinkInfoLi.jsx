import styled from 'styled-components';

const LinkInfoLi = styled.div`
  .addLink {
    display: flex;
    cursor: pointer;
    font: 500 14px/24px ${({ theme }) => theme.noto};
    color: #9d9d9d;
    letter-spacing: -0.35px;
    gap: 4px;
  }
`;

export default LinkInfoLi;
