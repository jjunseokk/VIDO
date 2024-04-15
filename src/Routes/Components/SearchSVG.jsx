import React from 'react';

const SearchSVG = ({ onClick = () => {}, stroke = '#707070' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" onClick={onClick}>
      <g id="그룹_4" data-name="그룹 4" transform="translate(-1366 -31)">
        <rect
          id="사각형_47"
          data-name="사각형 47"
          width="24"
          height="24"
          transform="translate(1366 31)"
          fill="none"
        />
        <g
          id="그룹_3"
          data-name="그룹 3"
          transform="translate(378.677 980.577) rotate(-45)"
        >
          <g
            id="타원_1"
            data-name="타원 1"
            transform="translate(1363 35)"
            stroke={stroke}
            fill="none"
            strokeWidth="1"
          >
            <circle cx="5.5" cy="5.5" r="5.5" stroke="none" />
            <circle cx="5.5" cy="5.5" r="5" fill="none" />
          </g>
          <path
            id="패스_27"
            data-name="패스 27"
            d="M-2161.5-542.9v8"
            transform="translate(3530 588)"
            fill="none"
            stroke={stroke}
            strokeWidth="1"
          />
        </g>
      </g>
    </svg>
  );
};

export default SearchSVG;
