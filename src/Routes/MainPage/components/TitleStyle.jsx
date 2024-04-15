import styled from 'styled-components';

const Title = styled.p`
  font: 700 22px/32.56px ${({ theme }) => theme.noto};
  letter-spacing: -0.44px;
  /* color: ${({ theme }) => theme.black}; */
  color: ${({ mode }) => ( mode == 'light' ? '#151515' : '#ffffff' )};
`;

export default Title;
