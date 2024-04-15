import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import AuthorUl from '../../AuthorPage/components/AuthorUl';
import AxiosConfig from '../../../AxiosConfig';
import styled from 'styled-components';
import { getNewAuthor } from '../../util/axiosGet';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { errorState } from '../../util/recoilState';
import px2vw from '../../util/px2vw';

const Div = styled.div`
  margin-left: ${({ theme }) => theme.left};
  margin-bottom: 80px;
  padding-right: ${({ theme }) => theme.left};
  h1 {
    color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
    font: 600 22px/32.56px ${({ theme }) => theme.noto};
    letter-spacing: -0.44px;
    margin-bottom: 24px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    p {
      font: 500 22px/33px ${({ theme }) => theme.noto};
      letter-spacing: -0.55px;
    }
  }
  @media (max-width: 1492px) {
    ul p {
      font: 500 20px/33px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 1112px) {
    ul p {
      font: 500 16px/33px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 824px) {
    ul p {
      font: 500 12px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 640px) {
    ul p {
      font: 500 10px ${({ theme }) => theme.noto};
    }
  }
`;

const NewAuthor = ({ mode }) => {
  const { t } = useTranslation();
  const { data, status } = useQuery('NewAuthor', getNewAuthor, []);
  const setError = useSetRecoilState(errorState);
  if (status === 'error') {
    setError(true);
  }
  return (
    <Div mode={mode}>
      <h1>{t("main.new.author")}</h1>
      {status == 'success' ? (
        <AuthorUl mode={mode} data={data.author.slice(0, 5)} size="big" />
      ) : null}
    </Div>
  );
};

export default NewAuthor;
