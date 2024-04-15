import React, { useState, useContext, useEffect } from 'react';
import ResList from './components/ResList';
import SavedRes from './components/SavedRes';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getArtResReq, getMediaArtDetail } from '../util/userInfoGet';
import CropBox from './components/CropBox';
import styled from 'styled-components';
import px2vw from '../util/px2vw';
import { UserContext } from '../ContextProvider';
import getVidSize from './utils/getVidSize';
import AxiosConfig from '../../AxiosConfig';
import UploadCrop from './components/UploadCrop';
import InputCheckbox from '../Components/InputCheckbox';
import LoadingVido from '../Components/LoadingVido';
import BtnSmall from '../Components/BtnSmall';
import useInterval from '../util/useInterval';
import { useSetRecoilState } from 'recoil';
import { errorState } from '../util/recoilState';
import AlertPopup from '../Components/AlertPopup';
import PopupDom from './components/PopupDom';
import {useTranslation} from "react-i18next";

const Div = styled.div`
  position: relative;
  padding: ${px2vw(18)} ${px2vw(20)};
  width: ${px2vw(970)};
  border: ${({ theme }) => theme.border};
  height: max-content;
  margin-bottom: 60px;
  .cover {
    position: absolute;
    width: ${px2vw(930)};
    height: calc(${px2vw(620)} + 32px);

    z-index: 20;
    background-color: #e0e0e0;
    opacity: 1;
    top: ${px2vw(18)};
    left: ${px2vw(20)};

    > p {
      font: 500 16px/24px ${({ theme }) => theme.noto};
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  > ul {
    position: relative;
    top: 22px;
    margin-bottom: 68px;
    > li {
      position: relative;
      margin-bottom: 24px;
      display: grid;
      grid-template-columns: 124px 1fr;
      align-items: baseline;

      > ul.request {
        position: absolute;
        right: 20px;
        top: 0;
        font: 500 14px/24px ${({ theme }) => theme.noto};
        > li {
          display: flex;
          gap: 20px;
          &:first-of-type {
            color: ${({ theme }) => theme.mainColor};
          }
        }
      }
      > p {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.black};
        font: 500 14px/24px ${({ theme }) => theme.noto};
        position: relative;
        > div {
          margin-left: 8px;
        }
      }
      > div {
        position: relative;
      }
    }
  }
  .btn {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
  @media (max-width: 1062px) {
    > ul {
      > li {
        > ul.request {
          font: 500 12px ${({ theme }) => theme.noto};
          > li {
            gap: 10px;
          }
        }
        > p {
          font: 500 12px/24px ${({ theme }) => theme.noto};
          > div {
            margin-left: 4px;
          }
        }
        > div {
        }
      }
    }
    .btn {
      gap: 8px;
    }
    .dropdown {
      width: 180px;
      > p {
        width: 180px;
      }
      > ul li {
        width: 180px;
      }
    }
  }
  @media (max-width: 842px) {
    width: 90vw;
    .cover {
      width: calc(90vw - ${px2vw(40)});
      height: calc((90vw - ${px2vw(40)}) / 3 * 2 + 32px);
    }
  }
`;

const LoadingPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;

  > div {
    &:nth-of-type(1) {
      height: 100vh;
      width: 100vw;
      background-color: #707070;
      opacity: 0.3;
    }
    &:nth-of-type(2) {
      background-color: #fff;
      box-shadow: ${({ theme }) => theme.boxShadow};
      width: 400px;
      border-radius: 10px;
      height: 240px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      > div {
        position: absolute;
        top: 8%;
        left: 50%;
        transform: translateX(-50%);
      }
      > p {
        text-align: center;
        position: absolute;
        font: 500 18px/24px ${({ theme }) => theme.noto};
        color: ${({ theme }) => theme.mainColor};
        width: 100%;
        bottom: 54px;
      }
      > span {
        width: 100%;
        position: absolute;
        text-align: center;
        font: 500 14px/24px ${({ theme }) => theme.noto};
        bottom: 18px;
        color: ${({ theme }) => theme.mainColor};
      }
    }
  }
`;

const CropPage = () => {
  const {t} = useTranslation();
  const setErrorState = useSetRecoilState(errorState);
  const params = useParams();
  const navigate = useNavigate();
  const [cropArea, setCropArea] = useState();
  const [popup, setPopup] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);
  const [preview, setPreview] = useState(false);
  const [cropDone, setCropDone] = useState(false);
  const [uploadCheck, setUploadCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRes, setSelectedRes] = useState({
    resolutionId: 1,
    resolution: {
      horizontal: 100,
      vertical: 10,
    },
  });
  const [newVid, setNewVid] = useState(null);
  const [vidInfo, setVidInfo] = useState();
  const [cropInfo, setCropInfo] = useState({
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
    horizontal: 0,
    vertical: 0,
  });
  const [canSubmit, setCanSubmit] = useState(true);
  const [warning, setWarning] = useState(0);
  const [pause, setPause] = useState(false);
  const { data, status } = useQuery('detail', () =>
    getMediaArtDetail(params.id)
  );
  useEffect(() => {
    if (status == 'success') {
      setVidInfo(data);
    }
  }, [status]);
  useEffect(() => {
    if (selectedRes) {
      setCropInfo({
        ...cropArea,
        resolutionId: selectedRes.resolutionId,
      });
    }
  }, [cropArea, selectedRes]);
  console.log(newVid)
  const cropRequest = useQuery('cropReq', () => getArtResReq(params.id));
  const submitCrop = () => {
    setCropDone(false);

    setLoading(true);
    setPause(true);
    const cropData = new FormData();
    cropData.append('newArt', newVid);
    if (newVid !== null) {
      cropData.append(
        'cropInfo',
        new Blob(
          [
            JSON.stringify({
              resolutionId: selectedRes.resolutionId,
              offsetX: 0,
              offsetY: 0,
              width: 0,
              height: 0,
              vertical: 0,
              horizontal: 0,
            }),
          ],
          { type: 'application/json' }
        )
      );
    } else {
      cropData.append(
        'cropInfo',
        new Blob([JSON.stringify(cropInfo)], {
          type: 'application/json',
        })
      );
    }
    AxiosConfig.post(`/user/art/crop/${params.id}`, cropData).then((res) => {
      setLoading(false);
      setNewVid(null);
      if (res.data.statusCode == 108) {
        setPopup(true);
      } else if (res.data.statusCode != 200) {
        setErrorState({
          errorMessage: '크롭 업로드',
          popup: true,
        });
      } else {
        setLoadingPopup(true);
      }
    });
  };
  return (
    <>
      {popup ? (
        <AlertPopup
          setPopup={setPopup}
          onClick={() => setPopup(false)}
          content={t("mypage.media_art.crop.message.duplicate")}
          btnCont={t("common.done")}
        />
      ) : null}
      {warning == 2 && !uploadCheck ? (
        <AlertPopup
          setPopup={setWarning}
          content={t("mypage.media_art.crop.message.scale")}
          btnCont={t("common.done")}
          onClick={() => {
            setWarning(0);
            submitCrop();
          }}
          btnCont2={t("common.cancel")}
          onClick2={() => setWarning(0)}
        />
      ) : null}
      {status == 'success' ? (
        <>
          {loading ? (
            <LoadingPopup>
              <div className="modal"></div>
              <div>
                <LoadingVido />
                <p>{t("mypage.media_art.crop.message.crop1")}</p>

                <span>{t("mypage.media_art.crop.message.crop2")}</span>
              </div>
            </LoadingPopup>
          ) : null}
          {loadingPopup ? (
            <AlertPopup
              onClick={() => {
                setLoadingPopup(false);
                setCropDone(true);
              }}
              content={t("mypage.media_art.crop.message.crop_done")}
              btnCont={t("common.done")}
            />
          ) : null}
          <Div>
            <CropBox
              res={
                selectedRes
                  ? [
                      selectedRes.resolution.horizontal,
                      selectedRes.resolution.vertical,
                    ]
                  : [1, 1]
              }
              video={data}
              cropInfo={cropArea}
              setCropInfo={setCropArea}
              uploadCheck={uploadCheck}
              setWarning={setWarning}
              setPause={setPause}
              pause={pause}
            />
            {uploadCheck || !selectedRes ? (
              <div className="cover">
                {uploadCheck == true ? (
                  <p>{t("mypage.media_art.crop.message.video")}</p>
                ) : (
                  <p>{t("mypage.media_art.crop.message.canvas")}</p>
                )}
              </div>
            ) : null}
            <ul>
              <li>
                <p>{t("mypage.media_art.crop.canvas")}</p>
                <ResList
                  setSelected={setSelectedRes}
                  selected={selectedRes}
                  id={params.id}
                />
                {cropRequest.data ? (
                  <ul className="request">
                    <li>
                      <p>{t("mypage.media_art.crop.request")}</p>
                    </li>
                    {cropRequest.data.map((value) => (
                      <li key={value.resolutionId}>
                        <p>{value.clientName}</p>
                        <span>
                          {value.resolution.horizontal} x{' '}
                          {value.resolution.vertical}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {/* <p className="infoSpan">
                  *해상도
                  <span>
                    {selectedRes
                      ? `${selectedRes.resolution.horizontal}x
                    ${selectedRes.resolution.vertical}`
                      : null}
                  </span>
                </p> */}
              </li>
              <li>
                <p>
                  {t("mypage.media_art.crop.upload")}
                  <InputCheckbox
                    onChange={(e) => {
                      setUploadCheck(e.target.checked);
                      e.target.checked == true
                        ? setCanSubmit(false)
                        : setCanSubmit(true);
                    }}
                    checked={uploadCheck}
                    size={12}
                  />
                </p>
                <div>
                  <UploadCrop
                    setFile={setNewVid}
                    disabled={!uploadCheck}
                    setCanSubmit={setCanSubmit}
                    resolution={
                      selectedRes
                        ? [
                            selectedRes.resolution.horizontal,
                            selectedRes.resolution.vertical,
                          ]
                        : [0, 0]
                    }
                  />
                </div>
              </li>
              <li>
                <p>{t("mypage.media_art.crop.canvas")}</p>
                <SavedRes id={params.id} cropDone={cropDone} />
              </li>
            </ul>
            <div className="btn">
              <BtnSmall onClick={() => navigate(`/MyPage/MyArt`)}>
                <p>{t("common.cancel")}</p>
              </BtnSmall>
              <BtnSmall
                blue
                onClick={
                  canSubmit
                    ? warning > 0 && !uploadCheck
                      ? () => setWarning(2)
                      : submitCrop
                    : null
                }
                className={canSubmit ? null : 'disabled'}
                disabled={!canSubmit}
              >
                <p>{t("common.done")}</p>
              </BtnSmall>
              <BtnSmall
                white
                className={uploadCheck ? 'disabled' : 'preview'}
                onClick={() => {
                  if (uploadCheck == true) {
                    null;
                  } else {
                    setPreview(true);
                    setPause(true);
                  }
                }}
                disabled={uploadCheck}
              >
                <p>{t("mypage.media_art.crop.preview")}</p>
              </BtnSmall>
            </div>
          </Div>
          {preview && cropInfo ? (
            <PopupDom
              setPopup={setPreview}
              res={[cropInfo.width, cropInfo.height]}
              id={params.id}
              width={cropInfo.horizontal}
              height={cropInfo.vertical}
              x={cropInfo.offsetX}
              y={cropInfo.offsetY}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default CropPage;
