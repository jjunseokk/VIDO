import React, { useState, useContext } from 'react';
import { UserContext } from '../../ContextProvider';
import InputCheckbox from '../../Components/InputCheckbox';
import dateStringReplace from '../../util/dateStringReplace';

const CropRow = ({ value, getRejectReason, handleChecked, checkedList }) => {
  const { serverAddress } = useContext(UserContext);
  return (
    <div className="row">
      <div>
        <p>{value.mediaArtId}</p>
      </div>
      <div>
        <img alt="thumbnail" src={serverAddress + value.thumbnailPath} />
      </div>
      <div>
        <div>
          <p>{value.title}</p>
          <p>
            {value.description?.length > 20
              ? value.description.slice(0, 18) + '...'
              : value.description}
          </p>
        </div>
      </div>
      <div>
        <p>{value.createdDatetime.slice(0, 10)}</p>
      </div>
      <div>
        <p>
          {value.resolution.clientName}
          <br />
          {value.resolution.resolution.horizontal} :{' '}
          {value.resolution.resolution.vertical}
        </p>
      </div>
      <div>
        {value.isApproved === true ? (
          <span style={{ color: '#002E85' }}>승인완료</span>
        ) : value.isApproved === false ? (
          <span
            onClick={() => getRejectReason(value.compatibilityId)}
            style={{
              color: '#D00000',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            미승인
          </span>
        ) : (
          <span style={{ color: '#707070' }}>승인대기</span>
        )}
      </div>
      <div>
        {/* {value.removedDateTime || value.mediaArtRemovedDatetime ? (
          <p style={{ color: '#d00000' }}>
            삭제중
            <br />({' '}
            {value.removedDateTime
              ? dateStringReplace(value.removedDateTime)
              : value.mediaArtRemovedDatetime.slice(0, 10)}
            )
          </p>
        ) : (
          <>
            <div className="delete">
              <p>삭제</p>
              <InputCheckbox
                id={value.compatibilityId}
                size={12}
                onChange={(e) =>
                  handleChecked(value.compatibilityId, e.target.checked)
                }
                checked={
                  checkedList.includes(value.compatibilityId) ? true : false
                }
              />
            </div>
          </>
        )} */}
      </div>
    </div>
  );
};

export default CropRow;
