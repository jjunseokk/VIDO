import React, { useState, useEffect, useRef } from 'react';
import getVidSize from '../utils/getVidSize';
import styled from 'styled-components';
import getFFmpeg from '../utils/getFFmpeg';
import getFFmpegFrame from '../utils/getFFmpegFrame';
import { useMemo } from 'react';

const Div = styled.div`
  width: 256px;
  height: 24px;
  background-color: ${(props) =>
    props.disabled ? '#e0e0e0' : props.theme.mainColor};
  position: relative;
  transition: ${({ theme }) => theme.transition};
  .info {
    position: absolute;
    top: 0;
    left: 264px;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 24px;
    > img {
      cursor: pointer;
      margin-top: 4px;
      height: 16px;
    }
    p {
      font: 400 12px ${({ theme }) => theme.noto};
      color: ${({ theme }) => theme.mainColor};
      width: max-content;
      display: block;
    }
  }
  > label {
    width: 256px;

    height: 24px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      height: 16px;
      width: auto;
    }
  }
  > input {
    height: 24px;
    display: block;
    width: 256px;

    left: 0;
    &:disabled {
      cursor: default;
      &::-webkit-file-upload-button {
        cursor: default;
      }
    }
  }
  > p {
    position: absolute;
    left: 105%;
    top: 0;
    width: max-content;
    font: 400 12px/24px ${({ theme }) => theme.noto};
    color: ${({ theme }) => theme.mainColor};
    word-break: keep-all;
  }
  > img#ii {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }
  @media (max-width: 1274px) {
    .info {
      left: 0;
      top: 22px;
    }
  }
  @media (max-width: 1062px) {
    width: 180px;
    > label {
      width: 180px;
    }
  }
`;

const UploadCrop = ({ setFile, resolution, disabled, setCanSubmit }) => {
  const [wrongFile, setWrongFile] = useState(null);
  const inputRef = useRef(null);
  const [size, setSize] = useState(null);
  const [codec, setCodec] = useState(0);
  const [value, setValue] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [info, setInfo] = useState(false);
  const [loading, setLoading] = useState(0);

  const onSelectFile = (e) => {
    setValue(null);
    setFileName(null);
    setSize(null);
    setCanSubmit(false);
    setLoading(1);
    // setCodec(1);
    const reader = new FileReader();
    console.log(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    // getFFmpeg(e.target.files[0]);
    setValue(e.target.files[0]);
    if (e.target.files[0].type.slice(0, 5) != 'video') {
      setLoading(2);
      setWrongFile('잘못된 파일 형식입니다.');
      setValue(null);
    } else {
      const vidURL = URL.createObjectURL(e.target.files[0]);
      getVidSize(vidURL, setSize);
    }
  };
  useEffect(() => {
    if (Array.isArray(size)) {
      setLoading(2);
      if (
        size[0] == resolution[0] &&
        size[1] == resolution[1] &&
        value != null
      ) {
        setCanSubmit(true);
        setWrongFile(null);
        setFile(value);
        setFileName(value.name);
      } else {
        setCanSubmit(false);
      }
      // if (codec == 2) {
      //   console.log(value);
      // } else if (codec == 1) {
      //   setCanSubmit(false);
      //   setValue(null);
      //   setWrongFile('잘못된 코덱입니다.');
      // }
    }
  }, [loading, size, resolution]);

  useMemo(() => {
    if (
      size == null ||
      (size[0] == resolution[0] && size[1] == resolution[1])
    ) {
      setWrongFile(null);
    } else {
      setWrongFile('잘못된 비율입니다.');
      setFile(null);
      setCanSubmit(false);
      setValue(null);
      setLoading(0);
      setFileName(null);
    }
  }, [size, resolution]);

  useEffect(() => {
    if (inputRef != null) {
      // getFFmpegFrame(inputRef, setCodec, setLoading);
    }
  }, []);

  return (
    <>
      <Div disabled={disabled}>
        <label htmlFor="vid">
          <img src="/img/uploadBtn.svg" />
        </label>
        <input
          ref={inputRef}
          id="vid"
          type="file"
          accept="video/mp4,video/mkv, video/x-m4v,video/*"
          onChange={onSelectFile}
          disabled={disabled}
        />
        {!value && wrongFile == null ? (
          <div className="info" onMouseLeave={() => setInfo(false)}>
            <img src="/img/info.svg" onMouseEnter={() => setInfo(true)} />
            {info ? <p>선택한 비율의 영상을 새로 업로드 합니다.</p> : null}
          </div>
        ) : null}
        {value != null && loading == 1 ? (
          <p>로딩중입니다...</p>
        ) : wrongFile ? (
          <p>{wrongFile}</p>
        ) : (
          <p>{fileName ? fileName : null}</p>
        )}
        <img id="ii" />
      </Div>
    </>
  );
};

export default UploadCrop;
