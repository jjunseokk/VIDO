import React, { useState, useEffect } from 'react';
import TagElement from '../../Components/TagElement';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { tagList, tagCategory } from '../../util/recoilState';
import { useQuery } from 'react-query';
import { getTagList } from '../../util/axiosGet';
import SelectArtTagStyle from './SelectArtTagStyle';
import TagEl from './TagEl';
import CloseSmall from '../../Components/CloseSmall';
import {useTranslation} from "react-i18next";

const SelectArtTag = ({ onClick, genre = [], mood = [] }) => {
  const {t} = useTranslation();
  const { data, status } = useQuery('tags', getTagList);
  const setTags = useSetRecoilState(tagList);
  useEffect(() => {
    if (status === 'success') {
      setTags(data);
    }
  }, [data]);
  const { genreTags, moodTags } = useRecoilValue(tagCategory);
  if (Array.isArray(genreTags) && Array.isArray(moodTags))
    return (
      <>
        <SelectArtTagStyle>
          <p>
            {t("mypage.media_art.upload.genre.title")} <span>{t("mypage.media_art.upload.genre.description")}</span>
          </p>
          <div className="selected">
            {genre
              ? genre.map((value) => (
                  <span onClick={() => onClick(value, 'genre')} key={value.id}>
                    #{value.tag} <CloseSmall />
                  </span>
                ))
              : null}
          </div>
          <div className="tagList">
            {genreTags
              ? genreTags.map((value) => (
                  <TagEl
                    disabled={genre.length >= 2 ? true : false}
                    key={value.id}
                    id={value.id}
                    tag={value.tag}
                    onClick={() =>
                      genre.length < 2 ? onClick(value, 'genre') : null
                    }
                    selected={genre.some((el) => el.id === value.id)}
                  />
                ))
              : null}
          </div>
        </SelectArtTagStyle>
        <SelectArtTagStyle>
          <p>
            {t("mypage.media_art.upload.mood.title")} <span>{t("mypage.media_art.upload.mood.description")}</span>
          </p>
          <div className="selected">
            {mood
              ? mood.map((value) => (
                  <span onClick={() => onClick(value, 'mood')} key={value.id}>
                    #{value.tag} <CloseSmall />
                  </span>
                ))
              : null}
          </div>
          <div className="tagList">
            {moodTags
              ? moodTags.map((value) => (
                  <TagEl
                    disabled={mood.length >= 5 ? true : false}
                    selected={mood.some((el) => el.id === value.id)}
                    key={value.id}
                    id={value.id}
                    tag={value.tag}
                    onClick={() =>
                      mood.length < 5 ? onClick(value, 'mood') : null
                    }
                  />
                ))
              : null}
          </div>
        </SelectArtTagStyle>
      </>
    );
};

export default SelectArtTag;
