import React, { useContext, useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { UserContext } from '../../ContextProvider';
import { getMediaArtDetail } from '../../util/userInfoGet';
import ArtPopup from './ArtPopup';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { errorState, userInfo } from '../../util/recoilState';
import SelectArtTag from './SelectArtTag';
import BtnSmall from '../../Components/BtnSmall';
import onImgUpload from '../utils/onImgUpload';
import { getArtTag } from '../../util/axiosGet';
import { motion } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';
import AxiosConfig from '../../../AxiosConfig';
import UploadVidBox from './uploadVidBox';
import CheckArtUseApprove from './CheckArtUseApprove';
import SelectMockup from './SelectMockup';
import Converter from '../../Components/Converter';
import {useTranslation} from "react-i18next";

const EditArt = ({ id, approved, setPopup, rejectedReason }) => {
  const {t} = useTranslation();
  const { serverAddress } = useContext(UserContext);
  const { data, status } = useQuery(`getUserMediaArtDetail${id}`, () =>
    getMediaArtDetail(id)
  );
  const tags = useQuery(`artTags${id}`, () => getArtTag(id));
  const info = useRecoilValue(userInfo);
  const setErrorState = useSetRecoilState(errorState);
  const [vid, setVid] = useState(null);
  const [length, setLength] = useState(0);
  const [thumb, setThumb] = useState(null);
  const [thumbSrc, setThumbSrc] = useState(null);
  const [title, setTitle] = useState('');
  const [wrongImg, setWrongImg] = useState(false);
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState([]);
  const [mood, setMood] = useState([]);
  const [approve, setApprove] = useState(true);
  const [mockup, setMockup] = useState([]);
  useMemo(() => {
    if (status == 'success') {
      setTitle(data.title);
      setDescription(data.description);
      setApprove(data.isAgreed);
    }
  }, [status]);

  useMemo(() => {
    if (tags.status == 'success') {
      setMood(tags.data.mood);
      setGenre(tags.data.genre);
    }
  }, [tags.status]);
  const onSelectTags = (value, category) => {
    if (category == 'genre') {
      null;
    } else {
      const tempArr = mood;
      if (tempArr.some((el) => el.id == value.id)) {
        setMood(tempArr.filter((el) => el.id != value.id));
      } else {
        setMood([...tempArr, value]);
      }
    }
  };

  const canSubmit =
    !wrongImg &&
    genre.length == 2 &&
    mood.length <= 5 &&
    mood.length > 0 &&
    description &&
    title;

  const onSubmitAll = () => {
    const updateInfo = {
      title: title,
      description: description,
      moods: mood.map((value) => value.id),
      genres: genre.map((value) => value.id),
      // isAgreed: approve,
    };
    const form = new FormData();
    form.append('thumbnail', thumb);
    form.append('mediaArt', vid);
    form.append(
      'updateInfo',
      new Blob([JSON.stringify(updateInfo)], {
        type: 'application/json',
      })
    );
    if (mockup) {
      mockup.map((v) => {
        const mockup = new FormData();
        mockup.append('mockupId', v.mockupId);
        mockup.append('thumbnailFile', v.thumbnailFile);
        AxiosConfig.post(`/user/art/${id}/mockup`, mockup).then((res) =>
          console.log(res)
        );
      });
    }
    AxiosConfig.patch(`/user/art/${id}`, form).then((res) => {
      if (res.data.statusCode != 200) {
        setPopup(false);
        setErrorState({ errorMessage: '미디어아트 업로드', popup: true });
      } else if (res.data.statusCode == 200) {
        console.log(res);
        setPopup(false);
      }
      // window.location.reload();
    });
  };

  if (status == 'success')
    return (
      <ArtPopup>
        <motion.div
          variants={FramerMotionAnimate[4]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition="transition"
          className="modal"
          onClick={() => setPopup(false)}
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

          <img src="/img/close-art.svg" onClick={() => setPopup(false)} />
          <div className="inner">
            <div>
              <div>
                <img
                  className="thumb"
                  src={serverAddress + data.thumbnailPath}
                />
                {approved != true ? (
                  <UploadVidBox
                    file={vid}
                    setFile={setVid}
                    title={title}
                    setLength={setLength}
                    setTitle={setTitle}
                    opacity={0.4}
                  />
                ) : null}
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
                    <span>{data.authorName}</span>
                  )}
                </li>
              </ul>
              {rejectedReason ? (
                <div className="rejectReason">
                  <p>{t("mypage.media_art.reject_reason")}</p>
                  <p>{rejectedReason}</p>
                </div>
              ) : null}
            </div>
            <div>
              <div className="text">
                <input
                  max={100}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t("mypage.media_art.upload.title_hint")}
                />
                <p>{title.length}/100</p>
              </div>
              <div className="text">
                <textarea
                  max={1000}
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
                  <input
                    type="file"
                    onChange={(e) =>
                      onImgUpload(
                        e,
                        600,
                        400,
                        setWrongImg,
                        setThumb,
                        setThumbSrc
                      )
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
                  <img
                    src={thumb ? thumbSrc : serverAddress + data.thumbnailPath}
                    alt="thumbnail"
                  />
                  <label htmlFor="thumbnail"></label>
                </div>
              </div>
              <SelectMockup artId={id} mockup={mockup} setMockup={setMockup} />
              <SelectArtTag onClick={onSelectTags} genre={genre} mood={mood} />
              <div className="btnCont">
                <BtnSmall onClick={() => setPopup(false)}>
                  <p>{t("common.cancel")}</p>
                </BtnSmall>
                <BtnSmall
                  onClick={canSubmit ? onSubmitAll : null}
                  blue
                  className={!canSubmit ? 'disabled' : null}
                >
                  <p>{t("common.save")}</p>
                </BtnSmall>
                {/* <BtnSmall
                  white
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

export default EditArt;
