import React, { useRef, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';
import AxiosConfig from '../../../AxiosConfig';
// import getFFmpegFrame from '../utils/getFFmpegFrame';
import { UserContext } from '../../ContextProvider';
import {useTranslation} from "react-i18next";

const Div = styled.div`
  width: ${px2vw(300)};
  height: ${px2vw(200)};
  background-color: ${(props) => (props.opacity ? '#7070702d' : '#707070')};
  /* opacity: ${(props) => (props.opacity ? props.opacity : 1)}; */

  > img.thumb {
    height: ${px2vw(200)};
    position: absolute;
    width: ${px2vw(300)};
    object-fit: cover;
    top: 0;
    left: 0;
  }
  > input {
    position: absolute;
    top: 0;
    left: 0;
    width: ${px2vw(300)};
    z-index: 20;
    height: ${px2vw(200)};
  }
  p.info {
    white-space: pre-wrap;
    text-align: center;
    color: #fff;
    width: 100%;
    position: absolute;
    font: 500 12px/20px ${({ theme }) => theme.noto};
    bottom: 30px;
  }
`;

const UploadVidBox = ({
  file,
  setFile,
  setLength,
  title,
  setTitle,
  opacity = false,
}) => {
  const {t} = useTranslation();
  const { serverAddress } = useContext(UserContext);
  const [codec, setCodec] = useState(0);
  const [wrongFile, setWrongFile] = useState(1);
  const [vid, setVid] = useState(null);
  const [ratio, setRatio] = useState(0);
  const [loading, setLoading] = useState(0);
  const ref = useRef(null);
  const onUpload = (e) => {
    const mediaArtFile = e.target.files[0];
    if (mediaArtFile.type.slice(0, 5) == 'video') {
      setVid(mediaArtFile);
      if (!title) {
        let fileName = e.target.value.split('\\');
        fileName = fileName[fileName.length - 1].split('.');
        setTitle(fileName[0]);
      }
      setFile(mediaArtFile);
      setCodec(2);
    }

    const formData = new FormData();
    formData.append('mediaArt', e.target.files[0]);
    formData.append('preview', true);
    AxiosConfig.post(`/user/art/video/info`, formData).then((res) => {
      setLength(Math.round(res.data.result.duration));
      const previewImg = document.getElementById('ii');
      previewImg.src = serverAddress + res.data.result.previewPath;
    });
  };
  // const onUpload = (e) => {
  //   setCodec(0);
  //   setWrongFile(1);
  //   setVid(null);
  //   if (e.target.files[0].type.slice(0, 5) == 'video') {
  //     setVid(e.target.files[0]);
  //     if (!title) {
  //       let fileName = e.target.value.split('\\');
  //       fileName = fileName[fileName.length - 1].split('.');
  //       setTitle(fileName[0]);
  //     }
  //     const video = document.createElement('video');
  //     video.src = URL.createObjectURL(e.target.files[0]);
  //     video.addEventListener('loadedmetadata', (e) => {
  //       setLength(video.duration);
  //     });
  //     // await genrateDownload(reader.result).then((res) => {
  //     //   console.log(res);
  //     //   setVidInfo(res);
  //     //   upLoadVid(res);
  //     // });
  //     // });
  //   } else {
  //     setWrongFile(2);
  //   }
  // };
  useEffect(() => {
    if (loading == 2) {
      if (codec == 2) {
        setWrongFile(1);
        setFile(vid);
      } else {
        setWrongFile(2);
      }
    }
    if (loading == 'err') {
      alert('영상 업로드 에러');
    }
  }, [loading, codec]);
  useEffect(() => {
    //   ref ? getFFmpegFrame(ref, setCodec, setLoading) : null;
  }, []);

  return (
    <Div opacity={opacity}>
      {loading === 0 || loading === 2 ? (
        <>
          <img className="btn" src="/img/uploadIcon.svg" />
          <p className="info">
            {' '}
            {codec == 2
              ? '영상이 업로드 되었습니다.'
              : t("mypage.media_art.upload.upload_description")}
          </p>
        </>
      ) : null}
      <img
        style={{ opacity: wrongFile == 2 ? 0 : 1 }}
        className="thumb"
        id="ii"
      />
      <input
        type="file"
        accept="video/mp4,video/mkv, video/x-m4v,video/*"
        onChange={onUpload}
        ref={ref}
      />
      {loading == 1 ? <p className="info">영상 업로드 중입니다...</p> : null}
      {wrongFile == 2 && loading == 2 ? (
        <span className="error">잘못된 영상입니다.</span>
      ) : null}
    </Div>
  );
};

export default UploadVidBox;
