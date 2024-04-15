import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  width: 72px;
  height: 24px;
  background-color: ${({ theme }) => theme.mainColor};
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font: 400 12px/18px ${({ theme }) => theme.noto};
  position: absolute;
  right: 0;
  bottom: 4px;
  &:disabled {
    color: #9d9d9d;
    background-color: #e0e0e0;
    cursor: default;
  }
`;

const RoundBtn = ({
  active,
  context,
  disabled = false,
  onClick = (e) => {
    null;
  },
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };
  return (
    <Btn disabled={disabled} onClick={handleClick}>
      {context}
    </Btn>
  );
};

export default RoundBtn;
