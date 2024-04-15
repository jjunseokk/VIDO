import React from 'react';
import styled from 'styled-components';

const CheckBox = styled.div`
  display: flex;
  position: relative;
  input {
    -webkit-appearance: none;
    position: relative;
    z-index: 1;
    &::after {
      display: block;
      content: '';
      width: 12px;
      height: 12px;
      border: 1px solid #9d9d9d;
      position: absolute;
      left: 0;
      top: 0;
      transition: ${({ theme }) => theme.transition};
    }
    &:checked::after {
      position: absolute;
      z-index: 10;
      border: 1px solid ${({ theme }) => theme.mainColor};
      background: url('/img/checked.svg');
    }
  }
  label {
    p {
      position: relative;
      top: 0;
      left: 22px;
      cursor: pointer;
    }
  }
`;

const RegisterInputCheckbox = ({
  id,
  txt,
  onChange = () => {},
  checked = false,
}) => {
  return (
    <CheckBox>
      <input type="checkbox" checked={checked} id={id} onChange={onChange} />
      <label htmlFor={id}>
        <p>
          <span>{txt[1]}</span>
          {txt[0]}
        </p>
      </label>
    </CheckBox>
  );
};

export default RegisterInputCheckbox;
