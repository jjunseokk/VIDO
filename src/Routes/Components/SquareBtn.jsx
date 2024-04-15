import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBtn = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${(props) => props.bgColor};
  border: none;
  transition: all 0.2s ease-in-out;
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: 14px;
  font-weight: ${(props) => props.fontWeight};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  &:disabled {
    cursor: default;
    background-color: #e0e0e0;
    color: #9d9d9d;
  }
`;
const SquareBtn = ({
  color = '#fff',
  bgColor = '#002E85',
  hoverColor = '#0054A6',
  width = '280px',
  fontWeight = 400,
  height = '32px',
  context = '확인',
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <StyledBtn
      color={color}
      bgColor={bgColor}
      hoverColor={hoverColor}
      width={width}
      fontWeight={fontWeight}
      height={height}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
    >
      {context}
    </StyledBtn>
  );
};

export default SquareBtn;
