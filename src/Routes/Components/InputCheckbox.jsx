import React from 'react';
import styles from './InputCheckbox.module.scss';

const InputCheckbox = ({
  onChange = () => {},
  checked = true,
  id = 'qw',
  size = 24,
}) => {
  const style = {
    width: size + 'px',
    height: size + 'px',
  };
  const svgStyle = {
    width: (size / 3) * 2 + 'px',
  };
  return (
    <div style={style} className={styles.InputCheckbox}>
      <input
        style={style}
        type="checkbox"
        id={`check${id}`}
        checked={checked}
        onChange={onChange}
      />
      <label style={style} htmlFor={`check${id}`}></label>
      <svg
        style={svgStyle}
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 9.703 7.059"
      >
        <path
          id="path_49"
          data-name="path 49"
          d="M7089.03-169.069l2.929,2.893,6.071-6"
          transform="translate(-7088.679 172.531)"
          strokeDashoffset="140"
          strokeDasharray="140"
          fill="none"
          stroke="#ffffff"
        />
      </svg>
    </div>
  );
};

export default InputCheckbox;
