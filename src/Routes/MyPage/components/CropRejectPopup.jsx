import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BtnSmall from '../../Components/BtnSmall';
import AxiosConfig from '../../../AxiosConfig';
import CloseSmall from '../../Components/CloseSmall';

const Reject = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  > .modal {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: #151515;
    opacity: 0.3;
  }
  > .popup {
    width: ${(props) => (props.width ? props.width : '400px')};
    height: max-content;
    padding: 32px 24px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: ${({ theme }) => theme.boxShadow};
    div.close {
      cursor: pointer;
      > svg {
        position: absolute;
        top: 4px;
        right: 4px;
      }
    }
    div.inner {
      > p {
        text-align: center;
        color: ${({ theme }) => theme.highlightColor};
        font: 600 16px/20px ${({ theme }) => theme.noto};
        margin-bottom: 12px;
        white-space: pre-wrap;
      }
      > div.txt {
        width: 100%;
        background-color: #f0f0f0;
        padding: 8px;
        height: 400px;
        margin-bottom: 24px;
        > p {
          color: #151515;
          font: 400 14px/20px ${({ theme }) => theme.noto};
        }
      }
      .btn {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 12px;
      }
    }
  }
`;

const CropRejectPopup = ({ rejectData, setPopup, rejectId, getCropData }) => {
  const artId = rejectData.mediaArtId;
  const navigate = useNavigate();

  const deleteCrop = (nav = false) => {
    AxiosConfig.delete(`/user/art/resolution/${rejectId}`).then((res) => {
      if (res.data.statusCode === 200) {
        console.log(res);
        getCropData();
      }
      setPopup(false);
      if (nav == true) {
        navigate(`/MyPage/MyArt/crop/${artId}`);
      }
    });
  };
  return (
    <Reject>
      <div className="modal" onClick={() => setPopup(false)}></div>
      <div className="popup">
        <div className="close" onClick={() => setPopup(false)}>
          <CloseSmall />
        </div>
        <div className="inner">
          <p>반려 사유</p>
          <div className="txt">
            <p>{rejectData.rejectedReason}</p>
          </div>
          <div className="btn">
            <BtnSmall onClick={() => deleteCrop()}>
              <p>삭제</p>
            </BtnSmall>
            {/* <BtnSmall blue onClick={() => deleteCrop(true)}>
              <p>재업로드</p>
            </BtnSmall> */}
          </div>
        </div>
      </div>
    </Reject>
  );
};

export default CropRejectPopup;
