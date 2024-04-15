import React, { useState } from 'react';
import styled from 'styled-components';

const TagButton = styled.div`
  padding: 0 15px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid ${({mode}) => (mode == 'light'? '#e0e0e0' : '#9d9d9d')};
  background-color: ${({mode}) => (mode == 'light'? '#ffffff' : '#151515')};
  transition: ${({ theme }) => theme.transition};
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  width: fit-content;
  > p {
    font: 400 14px/30px ${({ theme }) => theme.roboto};
    /* color: ${({ theme }) => theme.black}; */
    color : ${({mode}) => (mode == 'light'? '#C1C1C1' : '#9d9d9d')};
    transition: ${({ theme }) => theme.transition};
    display: block;
  }
  &:hover {
    border: 1px solid ${({mode}) => (mode == 'light'? '#002e85' : '#1152cc')};
    > p {
      color: ${({ theme }) => theme.mainColor};
    }
  }
  &.selected {
    background-color:${({mode}) => (mode == 'light'? '#002e85' : '#1152cc')};
    border: ${({ theme }) => theme.mainColor};
    p {
      color: #fff;
    }
  }
  @media (max-width: 1452px) {
    height: 24px;
    padding: 0 10px;

    > p {
      font: 400 12px/24px ${({ theme }) => theme.roboto};
    }
  }
  @media (max-width: 1160px) {
    height: 20px;
    > p {
      font: 400 10px/20px ${({ theme }) => theme.roboto};
    }
  }
`;

const TagElement = ({ disabled, tag, id, selected = false, onClick, mode }) => {
  return (
    <TagButton
      onClick={onClick ? () => onClick(tag) : null}
      className={selected ? 'selected' : null}
      props={onClick}
      disabled={disabled}
      mode={mode}
    >
      <p>#{tag}</p>
    </TagButton>
  );
};

export default TagElement;
