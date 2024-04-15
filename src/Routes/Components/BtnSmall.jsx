import styled from 'styled-components';

const BtnSmall = styled.div`
  &.disabled {
    cursor: default;
    background-color: #e0e0e0;
    border: none;
    > p {
      color: #707070;
    }
  }
  transition: ${({ theme }) => theme.transition};
  cursor: pointer;
  width: ${(props) => (props.width ? props.width : '80px')};
  height: 32px;
  transition: ${({ theme }) => theme.transition};
  border: ${(props) =>
    props.white ? `1px solid ` + props.theme.mainColor : 'none'};
  background-color: ${(props) =>
    props.blue
      ? props.theme.mainColor
      : props.white
      ? '#fff'
      : props.theme.borderColor};
  > p {
    color: ${(props) =>
      props.blue
        ? '#fff'
        : props.white
        ? props.theme.mainColor
        : props.theme.darkGray};
    font: 400 14px/32px ${({ theme }) => theme.noto};
    letter-spacing: -0.28px;
    transition: ${({ theme }) => theme.transition};
    text-align: center;
  }
  &:not(.disabled):hover {
    background-color: ${(props) =>
      props.blue
        ? props.theme.highlightColor
        : props.white
        ? props.theme.mainColor
        : props.theme.lightGray};
    p {
      color: ${(props) => (props.white ? '#fff' : 'default')};
    }
  }
`;
export default BtnSmall;
