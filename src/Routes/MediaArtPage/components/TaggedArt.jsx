import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import SelectedTag from '../../Components/SelectedTag';
import TagList from '../../Components/TagList';
import ChartUl from '../../Components/ChartUl';
import { useQuery } from 'react-query';
import { getTaggedArt, getTagList } from '../../util/axiosGet';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import {
  errorState,
  tagCategory,
  tagList,
  tagSearch,
  tagSearchPage,
} from '../../util/recoilState';
import MediaListPagination from '../../Components/MediaListPagination';
import Title from '../../MainPage/components/TitleStyle';
import TagListSearchStyle from '../../Components/TagListSearchStyle';
import { Link } from 'react-router-dom';

const Div = styled.div`
  /* padding-top: 80px; */
  position: relative;
  width: fit-content;
  margin-left: ${({ theme }) => theme.left};
  min-height: ${({ slice }) => (slice == true ? '' : '80vh')};
  >div{
    > p {
    margin-bottom: 24px;
    }
  }
 
  .more{
      width: 61px;
      height: 24px;
      border: 1px solid #9D9D9D;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color : ${({ mode }) => (mode == 'light' ? '#707070' : '#ffff')};
      font: normal normal normal 12px/17.76px Noto Sans CJK KR;
  }
  > .tags {
    margin-bottom: 35px;
  }
  > .art {
  }
  @media (max-width: 1160px) {
    margin-bottom: 80px;
    > .tags {
      margin-bottom: 8px;
    }
  }
`;

const TaggedArt = ({
  setWholePage = () => { },
  page,
  setPage = () => { },
  slice = false,
  mode,
  disabled
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useRecoilState(tagSearch);
  const [genreNum, setGenreNum] = useState(0);
  const [moodNum, setMoodNum] = useState(0);
  const { tags } = useRecoilValue(tagCategory);
  const setError = useSetRecoilState(errorState);
  if (!tags) {
    const { data, status } = useQuery('tags', getTagList);
    const setTags = useSetRecoilState(tagList);
    if (status === 'success') {
      setTags(data);
    }
  }
  const { data, status } = useQuery(['taggedArt', page, selected], () =>
    getTaggedArt(
      page,
      selected.map((value) => value.id)
    )
  );
  if (status === 'error') {
    setError({ errorMessage: '태그별 미디어 아트', popup: true });
  }
  if (status == 'success') {
    setWholePage(data.totalPage);
  }
  const onClick = (value) => {
    const tempArr = selected;
    setPage(1);
    if (tempArr.includes(value)) {
      value.level == 1
        ? setGenreNum((prev) => prev - 1)
        : setMoodNum((prev) => prev - 1);
      setSelected(() => tempArr.filter((item) => item != value));
    } else {
      if (
        (value.level == 1 && genreNum >= 2) ||
        (value.level == 2 && moodNum >= 5)
      ) {
        null;
      } else {
        value.level == 1
          ? setGenreNum((prev) => prev + 1)
          : setMoodNum((prev) => prev + 1);
        setSelected([...tempArr, value]);
      }
    }
  };
  useEffect(() => {
    if (Array.isArray(selected)) {
      selected.map((value) => {
        value.level == 1
          ? setGenreNum((prev) => prev + 1)
          : setMoodNum((prev) => prev + 1);
      });
    }
  }, []);
  return (
    <Div mode={mode} slice={slice}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title mode={mode}>{t("media_art.tag.title")}</Title>
        {disabled == true ? null : <p className='more'><Link to={`/media-art/tag`}>{t("media_art.more")}</Link></p>}
      </div>
      <div className="tags">
        <TagListSearchStyle mode={mode}>
          <TagList
            genreNum={genreNum}
            moodNum={moodNum}
            selected={selected}
            onClick={onClick}
            mode={mode}
          />
        </TagListSearchStyle>
        <SelectedTag
          setSelected={setSelected}
          selected={selected ? selected : []}
          setGenreNum={setGenreNum}
          setMoodNum={setMoodNum}
          onClick={onClick}
          mode={mode}
        />
      </div>
     
      <div className="art">
        {data ? (
          <>
            <ChartUl
              mode={mode}
              chartData={slice ? data?.data?.slice(0, 4) : data.data}
            />
          </>
        ) : null}
      </div>
    </Div>
  );
};

export default TaggedArt;
