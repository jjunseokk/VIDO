import React from 'react';

import styled from 'styled-components';
const TagButton = styled.div`
  padding: 0 15px;
  height: 30px;
  border-radius: 15px;
  border: ${({ theme }) => theme.border};
  background-color: #fff;
  transition: ${({ theme }) => theme.transition};
  width: fit-content;
  > p {
    font: 400 14px/30px ${({ theme }) => theme.roboto};
    color: ${({ theme }) => theme.black};
    transition: ${({ theme }) => theme.transition};
    display: block;
  }
`;

const TagElementNoClick = ({ value }) => {
  return <TagButton>{value.tag}</TagButton>;
};

export default TagElementNoClick;
