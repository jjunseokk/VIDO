import React, { useState } from 'react';
import styled from 'styled-components';
import px2vw from '../util/px2vw';

const SelectDropdown = styled.div`
  width: ${(props) => (props.width ? props.width : px2vw(120))};
  height: ${(props) => (props.height ? props.height : '24px')};
  background-color: #fff;
  background-image: url('/img/openmenu.svg');
  background-repeat: no-repeat;
  background-position: 96%;
  > p {
    display: block;
    height: ${(props) => (props.height ? props.height : '24px')};
    width: ${(props) => (props.width ? props.width : px2vw(120))};
    border: 1px solid #e0e0e0;
    font: 500 14px /
      ${(props) =>
        props.height
          ? props.height + ' ' + props.theme.noto
          : '24px ' + ' ' + props.theme.noto};
    cursor: pointer;
    color: #707070;
    padding: 0 4px;
  }
  > ul {
    position: absolute;
    top: ${(props) => (props.height ? props.height : '24px')};
    left: 0;
    background-color: #fff;
    z-index: 50;
    box-shadow: ${({ theme }) => theme.boxShadow};
    li {
      width: ${(props) => (props.width ? props.width : px2vw(120))};

      padding: 0 4px;
      font: 500 14px /
        ${(props) =>
          props.height
            ? props.height + ' ' + props.theme.noto
            : '24px ' + ' ' + props.theme.noto};
      display: block;
      background-color: #fff;
      cursor: pointer;
      color: #707070;
      position: relative;
      &.selected {
        color: ${({ theme }) => theme.mainColor};
      }
      &:hover {
        background-color: #f8f8f8;
        color: ${({ theme }) => theme.mainColor};
        .right {
          color: ${({ theme }) => theme.mainColor};
        }
      }
    }
  }
  .right {
    position: absolute;
    right: 30px;
  }
  /* @media (max-width: 1600px) {
    background-size: 14px;
    > p {
      font: 500 13px /
        ${(props) =>
    props.height
      ? props.height + ' ' + props.theme.noto
      : '24px ' + ' ' + props.theme.noto};
    }
    > ul li {
      font: 500 13px /
        ${(props) =>
    props.height
      ? props.height + ' ' + props.theme.noto
      : '24px ' + ' ' + props.theme.noto};
    }
  }
  @media (max-width: 1270px) {
    background-size: 10px;
    > p {
      font: 500 10px /
        ${(props) =>
    props.height
      ? props.height + ' ' + props.theme.noto
      : '24px ' + ' ' + props.theme.noto};
    }
    > ul li {
      font: 500 10px /
        ${(props) =>
    props.height
      ? props.height + ' ' + props.theme.noto
      : '24px ' + ' ' + props.theme.noto};
    }
  } */
`;

export default SelectDropdown;
