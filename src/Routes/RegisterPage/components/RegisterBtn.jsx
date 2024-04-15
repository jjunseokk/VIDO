import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Btn = styled.div`
  position: relative;
  a {
    position: absolute;
    top: 0;
    display: block;
    content: '';
    color: #fff;
    width: ${({ width }) => width}px;
    height: 32px;
    z-index: 10;
    background: none;
  }
  button {
    cursor: pointer;
    font: 400 14px ${({ theme }) => theme.noto};
    letter-spacing: -0.28px;
    width: ${({ width }) => width}px;

    height: 32px;
    border: none;
    color: #fff;
    background-color: ${({ theme }) => theme.mainColor};
    transition: all 0.2s;
    line-height: 32px;
    position: relative;
    &:disabled {
      background-color: #e0e0e0;
      cursor: default;
    }
  }
`;

const RegisterBtn = ({
  context,
  link = '#',
  disabled = false,
  onClick = null,
  state = null,
  type = 'button',
  width = 360,
}) => {
  return (
    <Btn width={width} onClick={onClick}>
      {disabled ? null : <Link to={link} state={state}></Link>}
      <button type={type} disabled={disabled}>
        {context}
      </button>
    </Btn>
  );
};

export default RegisterBtn;
