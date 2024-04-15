import React from 'react';

const OrderTriangle = ({ fillColor = '#9d9d9d', style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      style={style}
    >
      <g
        id="group_385"
        data-name="group 385"
        transform="translate(1805 195) rotate(180)"
      >
        <rect
          id="rect_513"
          data-name="rect 513"
          width="16"
          height="16"
          transform="translate(1789 179)"
          fill="none"
        />
        <path
          id="poly_3"
          data-name="poly 3"
          d="M6,0l6,6H0Z"
          transform="translate(1791 185)"
          fill={fillColor}
        />
      </g>
    </svg>
  );
};

export default OrderTriangle;
