import React from 'react';
import styled from 'styled-components';
import CloseSmall from './CloseSmall';

const Selected = styled.div`
  height: 32px;
  width: ${({ theme }) => theme.pgWidth};
  background: ${({ mode })=>(mode == 'light'? '#f7f7f7' : '#363636')};
  border: 1px solid #e0e0e0;
  display: flex;
  gap: 20px;
  > svg {
    margin-top: 4px;
    margin-left: 6px;
    cursor: pointer;
    path {
      transition: ${({ theme }) => theme.transition};
    }
    &:hover {
      path {
        stroke: ${({ theme }) => theme.mainColor};
      }
    }
  }
  > span {
    font: 400 14px/32px ${({ theme }) => theme.roboto};
    cursor: pointer;
    display: block;
    width: max-content;
    color: ${({ mode })=>(mode == 'light'? '#002e85' : '#ffffff')};
    cursor: pointer;
    > svg {
      position: relative;
      top: 2px;
      right: 0px;
    }
  }
  @media (max-width: 1452px) {
    height: 24px;
    > svg {
      height: 18px;
    }
    > span {
      font: 400 12px/24px ${({ theme }) => theme.roboto};
      > svg {
        height: 8px;
      }
    }
  }
  @media (max-width: 1160px) {
    height: 20px;
    > svg {
      height: 12px;
    }
    > span {
      font: 400 10px/20px ${({ theme }) => theme.roboto};
      > svg {
        height: 12px;
      }
    }
  }
`;

const SelectedTag = ({
  selected,
  onClick,
  setSelected,
  setGenreNum,
  setMoodNum,
  mode
}) => {
  const color = mode == 'light'? '#9d9d9d' : '#ffffff'
  return (
    <Selected mode={mode}>
      <svg
        onClick={() => {
          setSelected([]);
          setGenreNum(0);
          setMoodNum(0);
        }}
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g id="그룹_575" data-name="그룹 575" transform="translate(-282 -2147)">
          <rect
            id="사각형_1573"
            data-name="사각형 1573"
            width="24"
            height="24"
            transform="translate(282 2147)"
            fill="none"
          />
          <g
            id="그룹_574"
            data-name="그룹 574"
            transform="translate(40.071 8.689)"
          >
            <path
              id="패스_828"
              data-name="패스 828"
              d="M11.475,2.576a6.429,6.429,0,1,0,1.883,4.546"
              transform="translate(247 2143.052)"
              fill="none"
              stroke={color}
              stroke-width="1.5"
            />
            <path
              id="패스_830"
              data-name="패스 830"
              d="M0,4.018H4.018V0"
              transform="translate(254.732 2142.8) rotate(-7)"
              fill="none"
              stroke={color}
              stroke-width="1.5"
            />
          </g>
        </g>
      </svg>
      {Array.isArray(selected)
        ? selected.map((value, idx) => (
          <span key={idx} onClick={() => onClick(value)}>
            #{value.tag}
            <CloseSmall mode={mode} />
          </span>
        ))
        : null}
    </Selected>
  );
};

export default SelectedTag;
