import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useQuery } from 'react-query';
import { getNewMedia } from '../../util/axiosGet';
import MediaList from '../../Components/MediaList';
import { useSetRecoilState } from 'recoil';
import { errorState } from '../../util/recoilState';
import styled from 'styled-components';

const H1 = styled.h1`
  color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
  font: 600 22px/32.56px ${({ theme }) => theme.noto};
  letter-spacing: -0.44px;
  position: relative;
  left: ${({ theme }) => theme.left};
  margin-bottom: 24px;
  margin-top: 40px;
`;

const NewMediaArt = ({ mode }) => {
  const { t } = useTranslation();
  const { data, status } = useQuery('NewMedia', getNewMedia, []);
  const setError = useSetRecoilState(errorState);
  if (status === 'error') {
    setError({ errorMessage: '신규 미디어 아트', popup: true });
  }

  return (
    <div>
      <H1 mode={mode}>{t("main.new.art")}</H1>
      {status === 'success' ? (
        <MediaList
          title={['', '신규 미디어 아트']}
          lang="kor"
          dataList={Array.isArray(data) ? data : null}
          mediaart={true}
          mode={mode}
        />
      ) : null}
    </div>
  );
};

export default NewMediaArt;
