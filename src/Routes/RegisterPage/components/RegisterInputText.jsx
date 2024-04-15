import React from 'react';

import styled from 'styled-components';
import px2vw from '../../util/px2vw';

const Input = styled.input`
  padding: 0 ${({ padding }) => padding}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: none;
  position: relative;
  border-bottom: #e0e0e0 1px solid;
  color: #151515;
  transition: ${({ theme }) => theme.transition};
  font: 400 14px/20px ${({ theme }) => theme.noto};
  &::placeholder {
    font: 400 14px/20px ${({ theme }) => theme.noto};
    color: #c1c1c1;
  }
  &:focus {
    outline: none;
    position: relative;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.highlightColor};
    height: 32px;
    background: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const RegisterInputText = ({
  type = 'text',
  placeHolder,
  value = '',
  onChange = null,
  maxLength = 524288,
  width = 280,
  height = 32,
  padding = 4,
    disabled = false,
}) => {
  return (
    <Input
      maxLength={maxLength}
      type={type}
      width={width}
      height={height}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      padding={padding}
      autoComplete="off"
      disabled={disabled}
    ></Input>
  );
};

export default RegisterInputText;
