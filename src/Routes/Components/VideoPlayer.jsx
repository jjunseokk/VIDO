import React, { useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import px2vw from '../util/px2vw';
import useInterval from '../util/useInterval';
import videoPlayer from '../util/videoPlayer';

const Div = styled.div`
  width: ${({ width }) => px2vw(width)};
  height: ${({ height }) => px2vw(height)};
  position: relative;
  > .play {
    cursor: pointer;
    position: absolute;
    z-index: 20;
    width: ${({ width }) => px2vw(width)};
    height: ${({ height }) => px2vw(height)};
    top: 0;
    left: 0;
    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: fit-content;
      height: fit-content;
      > svg {
        display: block;
        width: ${px2vw(105)};
        height: ${px2vw(120)};
      }
    }
    path {
      transition: ${({ theme }) => theme.transition};
    }
    &:hover {
      path,
      rect {
        fill: ${({ theme }) => theme.highlightColor};
      }
    }
    svg {
    }
  }
  > .coverPause {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 10;
  }
  > video {
    width: ${({ width }) => px2vw(width)};
    height: ${({ height }) => px2vw(height)};
    background-color: #151515;
  }
  > .controls {
    position: absolute;
    z-index: 10;
    width: ${px2vw(930)};
    left: ${px2vw(175)};
    background-color: #36363690;
    height: 32px;
    border-radius: 16px;
    bottom: 30px;
    display: flex;
    align-items: center;
    gap: ${px2vw(20)};
    padding: 0 ${px2vw(20)};
    .button {
      svg {
        height: 12px;
        display: block;
      }
      &.play {
        width: ${px2vw(14)};
      }
      cursor: pointer;
      path,
      rect {
        transition: ${({ theme }) => theme.transition};
      }
      &:hover {
        path,
        rect {
          fill: ${({ theme }) => theme.highlightColor};
        }
      }
    }
    p {
      font: 400 12px/32px ${({ theme }) => theme.roboto};
      color: #e0e0e0;
    }
    > .time {
      display: flex;
      align-items: center;
      gap: ${px2vw(24)};
      > input {
        width: ${px2vw(732)};
        height: 4px;
        background-color: #9d9d9d;
        overflow: hidden;
        border-radius: 2px;
        transition: ${({ theme }) => theme.transition};
        background-color: #ffffff;
        > div {
          height: 4px;
        }
      }
    }
  }
  @media (max-width: 1540px) {
    > .controls {
      gap: ${px2vw(14)};
      .button svg {
        height: 10px;
      }
      p {
        font: 400 10px/34px ${({ theme }) => theme.roboto};
      }
      > .time {
        gap: ${px2vw(14)};
        > input {
          width: ${px2vw(692)};
        }
      }
    }
  }
  @media (max-width: 800px) {
    > .controls {
      gap: ${px2vw(14)};
      .button svg {
        height: 8px;
      }
      p {
        font: 400 10px/32px ${({ theme }) => theme.roboto};
      }
      > .time {
        gap: ${px2vw(14)};
        > input {
          width: ${px2vw(642)};
        }
      }
    }
  }
  @media (max-width: 600px) {
    > .controls {
      gap: ${px2vw(14)};
      .button svg {
        height: 8px;
      }
      p {
        font: 400 10px/32px ${({ theme }) => theme.roboto};
      }
      > .time {
        gap: ${px2vw(14)};
        > input {
          width: ${px2vw(602)};
        }
      }
    }
  }
`;

const VideoPlayer = ({ src, width = 1280, height = 852, mode }) => {
  const [videoTime, setVideoTime] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef();

  const {
    togglePlay,
    playing,
    handleOnTimeUpdate,
    handleVideoProgress,
    progress,
    handleStop,
  } = videoPlayer(videoRef.current);
  useMemo(() => {
    if (videoRef.current) {
      if (progress == 100) {
        togglePlay(false);
      }
    }
  }, [progress]);

  return (
    <Div width={width} height={height}>
      {playing ? (
        <div className="coverPause" onClick={() => togglePlay(false)}></div>
      ) : (
        <div className="play" onClick={() => togglePlay(true)}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 120">
              <path
                id="다각형_2"
                data-name="다각형 2"
                d="M56.527,6.078a4,4,0,0,1,6.946,0L116.58,99.015A4,4,0,0,1,113.107,105H6.893A4,4,0,0,1,3.42,99.015Z"
                transform="translate(105) rotate(90)"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
      )}

      <video style={{background : mode == 'light'? '' : '#363636'}} ref={videoRef} id="vid">
        <source src={src} />
      </video>
      <div className="controls">
        <div className="play button">
          {playing ? (
            <svg
              onClick={() => togglePlay(false)}
              xmlns="http://www.w3.org/2000/svg"
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
                  fill="#e0e0e0"
                />
                <rect
                  id="사각형_1474"
                  data-name="사각형 1474"
                  width="4"
                  height="12"
                  rx="1"
                  transform="translate(-2290 11255)"
                  fill="#e0e0e0"
                />
              </g>
            </svg>
          ) : (
            <svg
              onClick={() => togglePlay(true)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 14"
            >
              <path
                id="다각형_6"
                data-name="다각형 6"
                d="M6.136,1.481a1,1,0,0,1,1.728,0L13.123,10.5a1,1,0,0,1-.864,1.5H1.741a1,1,0,0,1-.864-1.5Z"
                transform="translate(12) rotate(90)"
                fill="#e0e0e0"
              />
            </svg>
          )}
        </div>
        <div className="pause button">
          <svg
            onClick={handleStop}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
          >
            <rect
              id="사각형_1484"
              data-name="사각형 1484"
              width="12"
              height="12"
              rx="1"
              fill="#e0e0e0"
            />
          </svg>
        </div>
        <div className="time">
          {videoRef.current ? (
            <p>
              {('0' + Math.floor(videoRef.current.currentTime / 60)).slice(-2)}:
              {('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2)}/
              {videoRef.current.duration
                ? ('0' + Math.floor(videoRef.current.duration / 60)).slice(-2)
                : '00'}
              :
              {videoRef.current.duration
                ? ('0' + Math.floor(videoRef.current.duration % 60)).slice(-2)
                : '10'}
            </p>
          ) : null}
          {/* <div style={{ width: progress + '%' }} /> */}
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
        </div>
      </div>
    </Div>
  );
};

export default VideoPlayer;
