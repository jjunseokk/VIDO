import React, { useEffect, useState, useContext } from 'react';

import styles from './TaggedArt.module.scss';
import ChartUl from '../../Components/ChartUl';
import MediaListPagination from '../../Components/MediaListPagination';
import AxiosConfig from '../../../AxiosConfig';
import { UserContext } from '../../ContextProvider';
import ErrorPopup from '../../Components/ErrorPopup';
import { motion, AnimatePresence } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';

const TaggedArt = () => {
  const [tag, setTag] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [taggedArt, setTaggedArt] = useState([]);
  const [wholePage, setWholePage] = useState(1);
  const [page, setPage] = useState(1);
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { serverAddress } = useContext(UserContext);
  const getTagArt = () => {
    AxiosConfig(`/art/tag?p=${page}&tag=${selectedTag}`).then((res) => {
      if (res.data.statusCode == 200) {
        setTaggedArt(res.data.result.mediaArt);
        if (page === 1) {
          setWholePage(res.data.result.totalPage);
        }
      } else {
        setApiError('태그 별 미디어아트');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
    });
  };
  useEffect(() => {
    async function tagData() {
      try {
        const res = await AxiosConfig.get('/art/tags');
        console.log(res.data.result);
        setTag(res.data.result);
      } catch (e) {
        console.log(e);
      }
    }
    tagData();
    getTagArt();
  }, []);

  useEffect(() => getTagArt(), [page]);

  useEffect(() => getTagArt(), [selectedTag]);

  const handleSelect = (value) => {
    let tempArr = [];
    setPage(1);
    if (selectedTag.includes(value)) {
      tempArr = selectedTag;
      let tempIndex = tempArr.indexOf(value);
      console.log(value);
      tempArr.splice(tempIndex, 1);
      console.log(tempArr);
      setSelectedTag([...tempArr]);
    } else {
      if (selectedTag.length < 5) {
        setSelectedTag([value, ...selectedTag]);
      }
      // tempArr = tagData;
      // tempArr.splice(index, 1);
      // setTagData(tempArr);
    }
  };

  return (
    <div className={styles.TaggedArt}>
      <h1>태그별 작품</h1>

      {/* <p onClick={() => setSelectedTag([])}>선택 해제</p> */}
      <div className={styles.tagWrap}>
        {tag.map((value) => (
          <div
            key={value.id}
            className={selectedTag.includes(value.id) ? styles.selected : null}
            onClick={() => handleSelect(value.id)}
          >
            #{value.tag}
          </div>
        ))}
      </div>
      <div className={styles.media}>
        <ChartUl chartData={taggedArt} />
      </div>
      <div>
        {wholePage <= 1 ? null : (
          <MediaListPagination
            wholePage={wholePage}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default TaggedArt;
