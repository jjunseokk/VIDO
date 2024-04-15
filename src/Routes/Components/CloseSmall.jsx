import React from 'react';

const CloseSmall = ({ strokeColor = '#707070', mode }) => {
  const  color = mode == 'light'? strokeColor : '#ffff';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
    >
      <g id="group_154" data-name="group 154" transform="translate(-1167 -233)">
        <rect
          id="square_137"
          data-name="square 137"
          width="12"
          height="12"
          transform="translate(1167 233)"
          fill="none"
        />
        <g id="group_57" data-name="group 57" transform="translate(1 1)">
          <path
            id="path_41"
            data-name="path 41"
            d="M9449.8-327.5l4,4"
            transform="translate(-8279.797 563.5)"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          <path
            id="path_42"
            data-name="path 42"
            d="M0,0,4,4"
            transform="translate(1170 240) rotate(-90)"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </g>
      </g>
    </svg>
  );
};

export default CloseSmall;
