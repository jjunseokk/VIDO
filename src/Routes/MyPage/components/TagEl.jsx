import React, { useState } from 'react';
import styled from 'styled-components';

const Tag = styled.div`
  transition: ${({ theme }) => theme.transition};
  border: ${({ theme }) => theme.border};
  background-color: #fff;
  border-radius: 12px;
  padding: 0 12px;
  cursor: pointer;
  > p {
    font: 400 12px/24px ${({ theme }) => theme.roboto};
    color: #151515;
  }
  &.selected {
    background-color: ${({ theme }) => theme.mainColor};
    > p {
      color: #fff;
    }
  }
  &.disabled {
    background-color: #e0e0e0;
    cursor: default;
    > p {
      color: #707070;
    }
  }
  &.abled {
    &:hover {
      border: 1px solid ${({ theme }) => theme.mainColor};
      > p {
        color: ${({ theme }) => theme.mainColor};
      }
    }
  }
`;

const TagEl = ({ tag, id, selected, onClick, disabled }) => {
  return (
    <Tag
      onClick={onClick ? () => onClick(tag) : null}
      className={disabled ? 'disabled' : selected ? 'selected' : 'abled'}
      props={onClick}
    >
      <p>#{tag}</p>
    </Tag>
  );
};

export default TagEl;
