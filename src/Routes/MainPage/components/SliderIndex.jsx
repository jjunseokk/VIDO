import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';

const Ul = styled.ul`
  display: flex;
  gap: 12px;
  position: absolute;
  bottom: 42px;
  left: ${px2vw(904)};
  > li {
    width: 8px;
    height: 8px;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #f7f7f7;
    border: 1px solid #f7f7f7;
    border-radius: 100%;
    filter: drop-shadow(0 0 2px #15151575);
    margin-top: 2px;
    &:hover {
      background-color: #1152cc;
      border-color: #1152cc;
    }
    &.select {
      margin-top: 0;
      width: 12px;
      height: 12px;
      background: none;
      cursor: default;
      &:hover {
        border: 1px solid #f7f7f7;
      }
    }
  }
`;

const SliderIndex = ({ data, index, setIndex }) => {
  const ul = useRef(null);
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      ul.current.children[i].className = null;
    }
    ul.current.children[index].className = 'select';
  }, [index]);
  return (
    <Ul ref={ul}>
      {data.map((val, idx) => (
        <li key={idx} onClick={() => setIndex(idx)}></li>
      ))}
    </Ul>
  );
};

export default SliderIndex;
