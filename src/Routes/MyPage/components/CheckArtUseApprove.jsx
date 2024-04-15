import React from 'react';
import InputCheckbox from '../../Components/InputCheckbox';

const CheckArtUseApprove = ({ approve, setApprove }) => {
  return (
    <div className="artApprove">
      <label htmlFor="checkcheck">
        <InputCheckbox
          checked={approve}
          onChange={(e) => setApprove(e.target.checked)}
          id="check"
        />
        <p>사용동의</p>{' '}
      </label>
    </div>
  );
};

export default CheckArtUseApprove;
