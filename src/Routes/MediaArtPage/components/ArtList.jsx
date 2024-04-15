import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ChartUl from '../../Components/ChartUl';
import Title from '../../MainPage/components/TitleStyle';
import { getMediaArts } from '../../util/axiosGet';
import px2vw from '../../util/px2vw';
import { errorState } from '../../util/recoilState';

const Div = styled.div`
  min-height: ${px2vw(240)};
`;

const ArtList = ({ page = 1, setWholePage = () => {}, orderBy = 'createdDatetime', mode }) => {
  const setError = useSetRecoilState(errorState);
  const { data, status } = useQuery(`mediaList${page}${orderBy}`, () =>
    getMediaArts(page, orderBy)
  );
  useEffect(() => {
    status == 'success' ? setWholePage(data.totalPage) : null;
  }, [status]);
  if (status === 'error') {
    setError({ errorMessage: '태그별 미디어 아트', popup: true });
  }
  if (status == 'success')
    return (
      <Div>
        <ul>
          {Array.isArray(data.data) ? (
            <ChartUl mode={mode} chartData={data.data} />
          ) : null}
        </ul>
      </Div>
    );
};

export default ArtList;
