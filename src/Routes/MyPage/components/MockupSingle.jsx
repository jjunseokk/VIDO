import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';
import Converter from '../../Components/Converter';
import AxiosConfig from '../../../AxiosConfig';
import {useTranslation} from "react-i18next";

const Mockup = styled.li`
  position: relative;
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: ${px2vw(120)};
    height: ${px2vw(72)};
    cursor: pointer;
    z-index: 20;
  }
  .mockup {
    height: ${px2vw(72)};
    object-fit: cover;
    width: ${px2vw(120)};
    height: auto;
    position: relative;
    z-index: 10;
  }
  .thumb {
    position: absolute;
    width: ${({ id }) => {
      switch (id) {
        case 1:
          return px2vw(105);
        case 2:
          return px2vw(34);
        case 3:
          return px2vw(108.5);
      }
    }};
    left: ${({ id }) => {
      switch (id) {
        case 1:
          return px2vw(8);
        case 2:
          return px2vw(42.5);
        case 3:
          return px2vw(7);
      }
    }};
    top: ${({ id }) => {
      switch (id) {
        case 1:
          return px2vw(17);
        case 2:
          return px2vw(11);
        case 3:
          return px2vw(15.5);
      }
    }};
    z-index: 0;
  }
  > button {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12;
  }
  > p {
    width: ${px2vw(120)};

    background-color: #363636;
    text-align: center;
    margin-top: -4px;
    font: 400 12px/2 ${({ theme }) => theme.noto};
    color: #fff;
  }
  > ul {
    display: flex;
    gap: 12px;
    button {
      color: ${({ theme }) => theme.mainColor};
      font: 400 12px ${({ theme }) => theme.noto};
      text-decoration: underline;
      position: relative;
      > input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  @media (max-width: 1650px) {
    > p {
      font: 400 10px/2 ${({ theme }) => theme.noto};
    }
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  > .modal {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    opacity: 0.3;
  }
  > .popup {
    position: absolute;
    top: 50%;
    left: 22%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: 410px;
    height: 140px;
    padding: 32px;
    > p {
      font: 500 14px ${({ theme }) => theme.noto};
      text-align: center;
      letter-spacing: -0.35px;
    }
    > button {
      display: block;
      margin: 0 auto;
      margin-top: 24px;
      width: 138px;
      height: 32px;
      background-color: ${({ theme }) => theme.mainColor};
      color: #fff;
      letter-spacing: -0.28px;
      font: 400 14px ${({ theme }) => theme.noto};
      transition: ${({ theme }) => theme.transition};
      &:hover {
        background-color: ${({ theme }) => theme.highlightColor};
      }
    }
    > .btnCont {
      display: flex;
      margin-top: 24px;
      justify-content: center;
      gap: 12px;
      > button {
        transition: ${({ theme }) => theme.transition};
        width: 80px;
        height: 32px;
        font: 400 14px ${({ theme }) => theme.noto};
        letter-spacing: -0.28px;
        &:nth-of-type(1) {
          color: #707070;
          background-color: #e0e0e0;
          &:hover {
            background-color: #f0f0f0;
          }
        }
        &:nth-of-type(2) {
          color: #fff;
          background-color: ${({ theme }) => theme.mainColor};
          &:hover {
            background-color: ${({ theme }) => theme.highlightColor};
          }
        }
      }
    }
  }
`;

const MockupSingle = ({ id, setHover, setMockup, exist, artId, setExist }) => {
  const {t} = useTranslation();
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);
  const [uploadSize, setUploadSize] = useState([0, 0]);
  const [wrongImg, setWrongImg] = useState(0);
  const [deletePopup, setDeletePopup] = useState(false);
  const [noImg, setNoImg] = useState(false);
  const minSize = id == 1 || id == 3 ? [1000, 200] : [450, 800];
  useEffect(() => {
    if (file) {
      setMockup({ id: id, src: src, thumbnailFile: file });
    }
  }, [file]);

  const onImgUpload = (e, width = minSize[0], height = minSize[1]) => {
    console.log(width, height);
    const file = e.target.files[0];
    const thumbData = new FormData();

    thumbData.append('thumbnail', e.target.files[0]);

    e.stopPropagation();
    const selectedImg = [];
    const targetfiles = e.target.files;
    const targetfilesObj = [...targetfiles];
    targetfilesObj.map((file) => {
      return selectedImg.push(URL.createObjectURL(file));
    });
    if (targetfilesObj[0].type.slice(0, 5) === 'image') {
      var reader = new FileReader();
      reader.readAsDataURL(targetfilesObj[0]);
      reader.onload = function (e) {
        var img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          let imgHeight = this.height;
          let imgWidth = this.width;
          console.log(imgWidth, imgHeight);
          if (
            imgHeight >= height &&
            imgWidth >= width &&
            imgWidth / imgHeight == minSize[0] / minSize[1]
          ) {
            setUploadSize([imgWidth, imgHeight]);
            setWrongImg(false);
            setSrc(e.target.result);
            setFile(file);
          } else {
            console.log('fail');
            setWrongImg(2);
            thumbData.delete('thumbnail');
          }
        };
      };
    } else {
      setWrongImg(1);
    }
  };

  const txt = (n) => {
    switch (n) {
      case 1:
        return `${t("mypage.media_art.upload.mockup.big")} (${t("mypage.media_art.upload.mockup.horizontal")} 5:1)`;
      case 2:
        return `${t("mypage.media_art.upload.mockup.big")} (${t("mypage.media_art.upload.mockup.vertical")} 9 : 16)`;
      case 3:
        return `${t("mypage.media_art.upload.mockup.small")} (${t("mypage.media_art.upload.mockup.horizontal")} 5:1)`;
    }
  };
  const popupTxt = (n) => {
    switch (n) {
      case 1:
        return '잘못된 파일 포맷입니다.';
      case 2:
        return `${minSize[0]} x ${minSize[1]} px 이상의 배율이 맞는 이미지를 업로드 해주세요.`;
      default:
        return '';
    }
  };
  const deleteMockup = () => {
    if (exist[id]) {
      AxiosConfig.delete(`/user/art/${artId}/mockup?mockupId=${id}`).then(
        (res) => {
          let tempObj = { ...exist };
          tempObj[id] = null;
          setExist(tempObj);
          console.log(tempObj);
        }
      );
    } else {
      setSrc(null);
      setDeletePopup(false);
    }
  };

  return (
    <>
      <Mockup
        onMouseEnter={() => setHover(id)}
        id={id}
        onMouseLeave={() => setHover(0)}
      >
        <input type={'file'} onChange={(e) => onImgUpload(e)} />
        <Converter
          inputFile={src}
          width={uploadSize[0]}
          height={uploadSize[1]}
          setWebp={setFile}
        />
        {noImg == false && exist[id] ? (
          <img className="thumb" src={exist[id]} />
        ) : null}
        {src ? <img className="thumb" src={src} /> : null}
        <img
          src={`/img/Mockup/Mockup-bw-${id}.png`}
          alt="mockup"
          className="mockup"
        />
        <button>
          <img src="/img/Mockup/MockupPlus.svg" />
        </button>
        <p>{txt(id)}</p>
        {exist[id] || src ? (
          <ul>
            <li>
              <button>
                수정
                <input type={'file'} onChange={(e) => onImgUpload(e)} />
              </button>
            </li>
            <li>
              <button onClick={() => setDeletePopup(true)}>삭제</button>
            </li>
          </ul>
        ) : null}
      </Mockup>
      {deletePopup ? (
        <Popup>
          <div className="modal" onClick={() => setDeletePopup(false)}></div>
          <div className="popup">
            <p>삭제 하시겠습니까?</p>
            <p className="btnCont">
              <button onClick={() => setDeletePopup(false)}>취소</button>
              <button onClick={deleteMockup}>확인</button>
            </p>
          </div>
        </Popup>
      ) : null}
      {wrongImg > 0 ? (
        <Popup>
          <div onClick={() => setWrongImg(0)} className="modal"></div>
          <div className="popup">
            <p>{popupTxt(wrongImg)}</p>
            <button onClick={() => setWrongImg(0)}>확인</button>
          </div>
        </Popup>
      ) : null}
    </>
  );
};

export default MockupSingle;
