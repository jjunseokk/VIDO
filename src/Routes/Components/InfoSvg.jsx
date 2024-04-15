import React from 'react';

const InfoSvg = ({ color = '#707070', onClick = () => {} }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <g id="group_328" data-name="group 328" transform="translate(39 -2287)">
        <path
          id="merge_2"
          data-name="merge 2"
          d="M3.269,12.323l-1.975.659.637-1.913a6.5,6.5,0,1,1,1.338,1.255Z"
          transform="translate(-38 2288)"
          fill="none"
          stroke={color}
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <rect
          id="square_657"
          data-name="square 657"
          width="16"
          height="16"
          transform="translate(-39 2287)"
          fill="none"
        />
        <g id="group_325" data-name="group 325" transform="translate(6 7.865)">
          <path
            id="path_209"
            data-name="path 209"
            d="M-23.765,2290.135v6"
            transform="translate(-13.235 -5)"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          <path
            id="path_210"
            data-name="path 210"
            d="M-23.765,2290.135v1"
            transform="translate(-13.235 -7)"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </g>
      </g>
    </svg>
  );
};

export default InfoSvg;
