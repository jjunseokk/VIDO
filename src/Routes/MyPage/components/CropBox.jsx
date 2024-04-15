import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import Cropper from 'react-easy-crop';
import { UserContext } from '../../ContextProvider';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';
import videoPlayer from '../utils/videoPlayer';
import getVidSize from '../utils/getVidSize';
import returnTime from '../../util/returnTime';
import './react-easy-crop copy.css';

const Warning = styled.p`
  position: absolute;
  top: 50%;
  color: ${({ theme }) => theme.errorColor};
  z-index: 20;
`;

const CropVideo = styled.div`
  width: ${px2vw(930)};
  height: calc(${px2vw(620)} + 32px);
  position: relative;
  > div:nth-of-type(1) {
    position: absolute;
    bottom: 32px;
    width: ${px2vw(930)};
    height: ${px2vw(620)};
  }
  video {
    height: auto;
  }
  @media (max-width: 842px) {
    width: calc(90vw - ${px2vw(40)});
    height: calc((90vw - ${px2vw(40)}) / 3 * 2 + 32px);
    > div:nth-of-type(1) {
      width: calc(90vw - ${px2vw(40)});
      height: calc((90vw - ${px2vw(40)}) / 3 * 2);
    }
  }
`;

const VideoControl = styled.div`
  position: absolute;
  bottom: 0px;
  height: 32px;
  width: ${px2vw(930)};
  background-color: #363636;
  color: #c1c1c1;
  display: flex;
  > div {
    display: flex;
    align-items: center;
    &:nth-of-type(1) {
      margin-left: ${px2vw(20)};
      gap: ${px2vw(20)};
      align-items: center;
      > div {
        cursor: pointer;
        height: fit-content;

        > svg {
          width: 12px;
          display: block;
        }
      }
    }
    &:nth-of-type(2) {
      justify-content: center;
      padding-left: ${px2vw(24)};
      padding-right: ${px2vw(20)};
      > p {
        font: 400 12px/16px ${({ theme }) => theme.roboto};
      }
    }
    &.zoom {
      position: absolute;
      right: ${px2vw(20)};
      bottom: ${px2vw(8)};
      display: flex;
      align-items: center;
      gap: ${px2vw(8)};
      > div {
        cursor: pointer;
        width: 14px;
        height: 14px;
        > img {
          margin-bottom: 4px;
          width: 14px;
          height: 14px;
        }
      }
      > p {
        width: fit-content;
        font: 400 12px/14px ${({ theme }) => theme.roboto};
        color: #c1c1c1;
        text-align: center;
        margin-bottom: 2px;
      }
    }
  }
  @media (max-width: 1750px) {
    > div {
      &:nth-of-type(1) {
        margin-left: ${px2vw(12)};
        gap: ${px2vw(6)};
      }
      &:nth-of-type(2) {
        padding-left: ${px2vw(14)};
        padding-right: ${px2vw(14)};
      }
    }
  }
  @media (max-width: 1542px) {
    > div {
      &:nth-of-type(1) {
        margin-left: ${px2vw(8)};
        gap: ${px2vw(6)};
      }
      &:nth-of-type(2) {
        padding-left: ${px2vw(8)};
        padding-right: ${px2vw(8)};
      }
      &.zoom {
        right: ${px2vw(12)};
        gap: ${px2vw(4)};
      }
    }
  }
  @media (max-width: 1238px) {
    > div {
      &:nth-of-type(1) {
        margin-left: ${px2vw(8)};
        > div > svg {
          width: 10px;
        }
      }
      &:nth-of-type(2) {
        padding-left: ${px2vw(4)};
        padding-right: ${px2vw(4)};
        p {
          font: 400 10px/16px ${({ theme }) => theme.roboto};
        }
      }
      &.zoom {
        right: ${px2vw(12)};
        bottom: 32px;
        gap: ${px2vw(4)};
      }
    }
  }
  @media (max-width: 842px) {
    width: calc(90vw - ${px2vw(40)});
    > div {
      &:nth-of-type(1) {
        margin-left: ${px2vw(20)};
        gap: ${px2vw(12)};
        > div > svg {
          width: 12px;
        }
      }
      &:nth-of-type(2) {
        padding-left: ${px2vw(32)};
        padding-right: ${px2vw(32)};

        > p {
          font: 400 12px/16px ${({ theme }) => theme.roboto};
        }
      }
      &.zoom {
        right: ${px2vw(12)};
        bottom: 32px;
        gap: ${px2vw(4)};
      }
    }
  }
`;
const Slider = styled.div`
  input[type='range'] {
    width: ${px2vw(647)};
    -webkit-appearance: none;
    transition: ${({ theme }) => theme.transition};
    border-radius: 2px;
    height: 4px;
    /* 
    background: ${(props) =>
      `linear-gradient(to right, #002e85 0%, #002e85  ${
        props.value + 0.2
      }%, #707070 ${props.value + 0.2}%, #707070 100%)`}; */
    cursor: pointer;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 10px;
      height: 10px;
      transition: ${({ theme }) => theme.transition};
      background-color: ${({ theme }) => theme.mainColor};
      border-radius: 100%;
      margin-top: -1px;
      cursor: pointer;
    }
  }
  .thumb {
  }
  .active {
    border: none;
    outline: none;
  }
  @media (max-width: 842px) {
    input[type='range'] {
      width: 60vw;
    }
  }
  @media (max-width: 592px) {
    input[type='range'] {
      /* width: ${px2vw(542)}; */
    }
  }
`;

const CropBox = ({
  res = [100, 100],
  video,
  cropInfo,
  setCropInfo,
  uploadCheck,
  setWarning,
  pause,
  setPause,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [vid, setVid] = useState(null);
  const [size, setSize] = useState([1, 1]);
  const [ratio, setRatio] = useState(1);
  const [zoom, setZoom] = useState(0);
  const [hor, setHor] = useState(0);
  const [ver, setVer] = useState(0);
  const videoRef = useRef(null);
  const cropperRef = useRef(null);
  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCropInfo({
        offsetX: Math.round(((croppedArea.x / 100) * size[0] * zoom) / ratio),
        offsetY: Math.round(((croppedArea.y / 100) * size[1] * zoom) / ratio),
        width: res[0],
        height: res[1],
        horizontal: hor,
        vertical: ver,
      });
    },
    [zoom, crop.x, crop.y, size[0], size[1], res[0], res[1], ratio, hor, ver]
  );

  const { serverAddress } = useContext(UserContext);
  const {
    togglePlay,
    playing,
    handleOnTimeUpdate,
    handleVideoProgress,
    progress,
    handleStop,
  } = videoPlayer(vid);
  useEffect(() => {
    setVid(videoRef.current.videoRef);
    videoRef.current.videoRef.disablePictureInPicture = true;
    getVidSize(serverAddress + video.videoPath, setSize);
  }, [videoRef, video.videoPath]);
  useEffect(() => {
    if (cropInfo) {
      console.log(cropInfo);
      setHor(Math.round((size[0] * zoom) / ratio));
      setVer(Math.round((size[1] * zoom) / ratio));
      // let temp = cropInfo;
      // setCropInfo({
      //   offsetX: temp.offsetX,
      //   offsetY: temp.offsetY,
      //   width: res[0],
      //   height: res[1],
      //   horizontal: Math.round((size[0] * zoom) / ratio),
      //   vertical: Math.round((size[1] * zoom) / ratio),
      // });
    }
  }, [size[0], size[1], zoom, ratio, video.videoPath, res[0], res[1]]);
  useEffect(() => {
    vid != null
      ? () => vid.addEventListener('timeupdate', handleOnTimeUpdate)
      : null;
  }, [vid]);

  useEffect(() => {
    if (vid != null) {
      if (uploadCheck == true || res == [500, 500]) {
        togglePlay(false);
      }
    }
  }, [uploadCheck, res]);

  useEffect(() => {
    // setRatio(res[0] / res[1] >= 3 / 2 ? size[0] / res[0] : size[1] / res[1]);
    setRatio(
      res[0] / res[1] >= size[0] / size[1] ? size[0] / res[0] : size[1] / res[1]
    );
  }, [size, res]);

  useEffect(() => {
    setZoom(1);
    setCrop({ x: 1, y: 1 });
    setTimeout(() => setCrop({ x: 0, y: 0 }), 500);
  }, [ratio, size]);

  useEffect(() => {
    (zoom * 100) / ratio > 200 ? setWarning(1) : setWarning(0);
  }, [zoom, ratio]);
  useEffect(() => {
    if (pause == true) {
      togglePlay(false);
    } else {
    }
  }, [pause]);
  return (
    <>
      <CropVideo videoSize={ratio} onContextMenu={(e) => e.preventDefault()}>
        <div>
          <Cropper
            video={serverAddress + video.videoPath}
            crop={crop}
            zoom={zoom}
            aspect={res[0] / res[1]}
            maxZoom={2}
            minZoom={1}
            zoomSpeed={0.1 * ratio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            // onMediaLoaded={(mediaSize) => {
            //   setZoom(ratio);
            // }}
            onMediaLoaded={() => {
              getVidSize(serverAddress + video.videoPath, setSize);
              setZoom(ratio);
            }}
            ref={videoRef}
            onCropComplete={onCropComplete}
            onCropAreaChange={onCropComplete}
            showGrid={false}
            disableAutomaticStylesInjection={true}
          />
        </div>
        <VideoControl>
          <div>
            <div>
              {playing ? (
                <svg
                  onClick={() => {
                    togglePlay(false);
                  }}
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                >
                  <g
                    id="그룹_529"
                    data-name="그룹 529"
                    transform="translate(2296 -11255)"
                  >
                    <rect
                      id="사각형_1473"
                      data-name="사각형 1473"
                      width="4"
                      height="12"
                      rx="1"
                      transform="translate(-2296 11255)"
                      fill="#c1c1c1"
                    />
                    <rect
                      id="사각형_1474"
                      data-name="사각형 1474"
                      width="4"
                      height="12"
                      rx="1"
                      transform="translate(-2290 11255)"
                      fill="#c1c1c1"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  onClick={() => {
                    togglePlay(true);
                    setPause(false);
                  }}
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                >
                  <path
                    id="다각형_6"
                    data-name="다각형 6"
                    d="M6.136,1.481a1,1,0,0,1,1.728,0L13.123,10.5a1,1,0,0,1-.864,1.5H1.741a1,1,0,0,1-.864-1.5Z"
                    transform="translate(12) rotate(90)"
                    fill="#c1c1c1"
                  />
                </svg>
              )}
            </div>
            <div>
              <svg
                onClick={handleStop}
                width="12"
                height="12"
                viewBox="0 0 12 12"
              >
                <rect
                  id="사각형_1477"
                  data-name="사각형 1477"
                  width="12"
                  height="12"
                  rx="1"
                  fill="#c1c1c1"
                />
              </svg>
            </div>
          </div>
          <div>
            <p>
              {vid
                ? returnTime(vid.currentTime)[1] +
                  ':' +
                  returnTime(vid.currentTime)[2] +
                  '/' +
                  returnTime(vid.duration)[1] +
                  ':' +
                  returnTime(vid.duration)[2]
                : null}
            </p>
          </div>
          <Slider value={progress}>
            <input
              type={'range'}
              min="0"
              max="100"
              value={progress}
              onChange={(e) => handleVideoProgress(e)}
              style={{
                background: `linear-gradient(to right, #002e85 0%, #002e85  ${
                  progress + 0.2
                }%, #707070 ${progress + 0.2}%, #707070 100%)`,
              }}
            />
            {/* <ReactSlider
              max={100}
              min={0}
              value={progress}
              onChange={(val, idx) => handleVideoProgress(val)}
            /> */}
          </Slider>
          <div className="zoom">
            <div
              onClick={() =>
                zoom <= 1 ? null : setZoom((prev) => prev - 0.01 * ratio)
              }
            >
              <img src="/img/zoom-out.svg" />
            </div>
            <p>{Math.round((zoom * 100) / ratio)}%</p>
            <div
              onClick={() =>
                zoom >= 2 ? null : setZoom((prev) => prev + 0.01 * ratio)
              }
            >
              <img src="/img/zoom-in.svg" />
            </div>
          </div>
        </VideoControl>
      </CropVideo>
    </>
  );
};

export default CropBox;
