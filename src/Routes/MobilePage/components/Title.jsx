import styled from 'styled-components';
import px2vhMobile from '../../util/px2vhMobile';

export const Title = styled.h1`
  color: #151515;
  font: 700 20px/1.2
    ${(props) => (props.eng ? props.theme.roboto : props.theme.noto)};
`;
