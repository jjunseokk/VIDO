import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import CloseSmall from '../../Components/CloseSmall';
import { getArtRes } from '../../util/userInfoGet';

const Div = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  height: max-content;
`;
const El = styled.span`
  display: block;
  width: 160px;
  height: 24px;
  border: ${({ theme }) => theme.border};
  padding: 0 4px;
  font: 400 14px/24px ${({ theme }) => theme.noto};
  color: #707070;
  position: relative;
  > span {
    font: 400 12px/24px ${({ theme }) => theme.noto};
    color: #707070;
    position: absolute;
    right: 8px;
  }
  &.waiting {
    background-color: #f0f0f0;
  }
`;

const SavedRes = ({ id, cropDone }) => {
  const { data, status, refetch } = useQuery('savedRes', () => getArtRes(id));
  useEffect(() => {
    if (cropDone == true) {
      setTimeout(() => {
        refetch();
      }, 500);
    }
  }, [cropDone]);
  if (status == 'success')
    return (
      <Div>
        {data
          ? data.map((value, idx) => (
              <El key={idx} className={value.isApproved ? null : 'waiting'}>
                {value.client.resolution.horizontal} :{' '}
                {value.client.resolution.vertical}
                {value.isApproved ? null : <span> (승인대기)</span>}
                {/* <img src="/img/close.svg" /> */}
              </El>
            ))
          : null}
      </Div>
    );
};

export default SavedRes;
