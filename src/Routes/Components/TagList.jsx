import React, { useState } from 'react';
import styled from 'styled-components';
import TagElement from './TagElement';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { errorState, tagList, tagCategory } from '../util/recoilState';
import { useQuery } from 'react-query';
import { getArtTag, getTagList } from '../util/axiosGet';
import {useTranslation} from "react-i18next";

const TagList = ({ onClick, selected = [], genreNum, moodNum, mode }) => {
    const {t} = useTranslation();
  const { data, status } = useQuery('tags', getTagList);
  const setTags = useSetRecoilState(tagList);
  if (status === 'success') {
    setTags(data);
  }
  const { genreTags, moodTags } = useRecoilValue(tagCategory);
  return (
    <>
      <div>
        <p>{t("media_art.tag.genre")}</p>
        <div>
          {genreTags
            ? genreTags.map((value) => (
                <TagElement
                  key={value.id}
                  id={value.id}
                  tag={value.tag}
                  onClick={() => onClick(value)}
                  selected={selected.includes(value)}
                  disabled={genreNum >= 2}
                  mode={mode}
                />
              ))
            : null}
        </div>
      </div>
      <div>
        <p>{t("media_art.tag.mood")}</p>
        <div>
          {moodTags
            ? moodTags.map((value) => (
                <TagElement
                  selected={selected.includes(value)}
                  key={value.id}
                  id={value.id}
                  tag={value.tag}
                  onClick={() => onClick(value)}
                  disabled={moodNum >= 5}
                  mode={mode}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default TagList;
