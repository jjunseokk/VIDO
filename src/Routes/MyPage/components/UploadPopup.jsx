import React, { useRef, useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AxiosConfig from '../../../AxiosConfig';
import BtnSmall from '../../Components/BtnSmall';
import { errorState, userInfo } from '../../util/recoilState';
import onImgUpload from '../utils/onImgUpload';
import ArtPopup from './ArtPopup';
import SelectArtTag from './SelectArtTag';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';
import { motion } from 'framer-motion';
import UploadVidBox from './uploadVidBox';
import Converter from '../../Components/Converter';
import SelectMockup from './SelectMockup';
import {Trans, useTranslation} from "react-i18next";

const UploadPopup = ({ setUploadArtPopup, myPgInfo }) => {
  const {t} = useTranslation();
  const info = useRecoilValue(userInfo);
  const setErrorState = useSetRecoilState(errorState);
  const [thumb, setThumb] = useState(null);
  const [thumbSrc, setThumbSrc] = useState(null);
  const [title, setTitle] = useState('');
  const [wrongImg, setWrongImg] = useState(false);
  const [description, setDescription] = useState('');
  const [length, setLength] = useState(0);
  const [vid, setVid] = useState(null);
  const [genre, setGenre] = useState([]);
  const [mood, setMood] = useState([]);
  const [approve, setApprove] = useState(true);
  const [authorName, setAuthorName] = useState(
    info.userType.id == 1 ? info.authorName : ''
  );
  const [disable, setDisable] = useState(false);
  const [mockup, setMockup] = useState([]);
  const canSubmit =
    thumb &&
    !wrongImg &&
    vid &&
    genre.length == 2 &&
    mood.length <= 5 &&
    mood.length >= 2 &&
    description &&
    authorName &&
    title;
  const onSelectTags = (value, category) => {
    if (category == 'genre') {
      const tempArr = genre;
      if (tempArr.includes(value)) {
        setGenre(() => tempArr.filter((item) => item != value));
      } else {
        setGenre([...tempArr, value]);
      }
    } else {
      const tempArr = mood;
      if (tempArr.includes(value)) {
        setMood(() => tempArr.filter((item) => item != value));
      } else {
        setMood([...tempArr, value]);
      }
    }
  };

  const onSubmitAll = (crop = false) => {
    setDisable(true);
    const form = new FormData();
    form.append('mediaArt', vid);
    form.append('thumbnail', thumb);
    const uploadInfo = {
      title: title,
      description: description,
      authorName: authorName,
      playtime: length,
      genres: genre.map((value) => value.id),
      moods: mood.map((value) => value.id),
      // isAgreed: approve,
    };
    form.append(
      'uploadInfo',
      new Blob([JSON.stringify(uploadInfo)], {
        type: 'application/json',
      })
    );
    AxiosConfig.post(`/user/art`, form).then((res) => {
      if ((res.data.statusCode = !200)) {
        setErrorState({ errorMessage: '미디어아트 업로드', popup: true });
      }
      // if (crop) {
      //   navigate(`/mypage/myart/crop/${res.data.result.id}`);
      // }
      if (mockup) {
        mockup.map((v) => {
          const mockup = new FormData();
          mockup.append('mockupId', v.mockupId);
          mockup.append('thumbnailFile', v.thumbnailFile);
          AxiosConfig.post(
            `/user/art/${res.data.result.id}/mockup`,
            mockup
          ).then((res) => console.log(res));
        });
      }
      setUploadArtPopup(false);
      myPgInfo();
    });
  };

  return (
    <ArtPopup>
      <motion.div
        variants={FramerMotionAnimate[4]}
        initial="initial"
        animate="animate"
        exit="exit"
        transition="transition"
        className="modal"
      ></motion.div>
      <motion.div
        variants={FramerMotionAnimate[2]}
        initial="initial"
        animate="animate"
        exit="exit"
        transition="transition"
        className="popup"
      >
        {/* <CheckArtUseApprove approve={approve} setApprove={setApprove} /> */}
        <img
          src="/img/close-art.svg"
          onClick={() => setUploadArtPopup(false)}
        />
        <div className="inner">
          <div>
            <UploadVidBox
              file={vid}
              setFile={setVid}
              title={title}
              setLength={setLength}
              setTitle={setTitle}
            />
            <div className="upload-info">
              <p>
                <Trans i18nKey={"mypage.media_art.upload.upload_notice"} />
              </p>
            </div>
            <ul className="authorInfo">
              <li>
                <p>{t("mypage.media_art.upload.group_name")}</p>
                <span>{info.userType.id == 1 ? '-' : info.authorName}</span>
              </li>
              <li>
                <p>{t("mypage.media_art.upload.nickname")}</p>
                {info.userType.id == 1 ? (
                  <span>{info.authorName}</span>
                ) : (
                  <input
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                )}
              </li>
            </ul>
          </div>
          <div>
            <div className="text">
              <input
                maxLength={100}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("mypage.media_art.upload.title_hint")}
              />
              <p>{title.length}/100</p>
            </div>
            <div className="text">
              <textarea
                maxLength={1000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("mypage.media_art.upload.description_hint")}
              />
              <p>{description.length}/1000</p>
            </div>
            <div className="thumbnail">
              <p>
                {t("mypage.media_art.upload.preview")}
                <span>{t("mypage.media_art.upload.preview_description")}</span>
              </p>
              <div>
                <img className="btn" src="/img/plusHuge.svg" />
                <input
                  type="file"
                  onChange={(e) =>
                    onImgUpload(e, 600, 400, setWrongImg, setThumb, setThumbSrc)
                  }
                  accept=".jpg,.png,.jpeg"
                  id="thumbnail"
                />
                <Converter
                  inputFile={thumbSrc}
                  width={600}
                  height={400}
                  setWebp={setThumb}
                />
                {thumb ? <img src={thumbSrc} alt="thumbnail" /> : null}
                <label htmlFor="thumbnail"></label>
                {wrongImg ? (
                  <span className="error">{t("mypage.media_art.upload.img_error")}</span>
                ) : null}
              </div>
            </div>
            <SelectMockup mockup={mockup} setMockup={setMockup} />

            <SelectArtTag onClick={onSelectTags} genre={genre} mood={mood} />
            <div className="btnCont">
              <BtnSmall onClick={() => setUploadArtPopup(false)}>
                <p>{t("common.cancel")}</p>
              </BtnSmall>
              <BtnSmall
                blue
                className={!canSubmit || disable ? 'disabled' : null}
                onClick={!canSubmit || disable ? () => {} : () => onSubmitAll()}
              >
                <p>{t("common.save")}</p>
              </BtnSmall>
              {/* <BtnSmall
                white
                onClick={canSubmit ? () => onSubmitAll(true) : null}
                className={!canSubmit ? 'disabled' : null}
                width="100px"
              >
                <p>저장 후 크롭</p>
              </BtnSmall> */}
            </div>
          </div>
        </div>
      </motion.div>
    </ArtPopup>
  );
};

export default UploadPopup;
