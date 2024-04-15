import React, { useEffect, useState, useRef } from 'react';
import Footer from '../Components/Footer';
import ChartUl from '../Components/ChartUl';
import MediaListPagination from '../Components/MediaListPagination';
import AxiosConfig from '../../AxiosConfig';
import styles from './VidoChartPage.module.scss';
import SearchInput from './components/SearchInput';
import NoResult from './components/NoResult';
import { useNavigate, useParams } from 'react-router-dom';

import ErrorPopup from '../Components/ErrorPopup';
import MediaArtListStyle from './MediaArtListStyle';

const MediaArtSearchPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState(params.searchId);
  const [page, setPage] = useState(params.id);
  // const [top10, setTop10] = useState([]);
  const [wholePage, setWholePage] = useState(0);
  const [mediaList, setMediaList] = useState([]);
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const listSize = 5;
  const ref = useRef(null);
  // const getTop10 = () => {
  //   AxiosConfig.get('/art/top10').then((res) => {
  //     if (res.data.statusCode === 200) {
  //       setTop10(res.data.result);
  //     } else {
  //       setApiError('추천작품 목록');
  //       setErrorMessage(res.data.statusCode);
  //       setErrorPopup(true);
  //     }
  //   });
  // };
  const getMediaList = (chartData) => {
    if (!chartData[0]) {
      setMediaList('none');
    } else {
      let tempMediaList = [];
      for (let i = 0; i < chartData.length; i += listSize) {
        let templist = chartData.slice(i, i + listSize);
        tempMediaList.push(templist);
      }
      setMediaList(tempMediaList);
    }
  };
  useEffect(() => {
    if (params.id != page) {
      setPage(params.id);
    }
    handleSearch(params.searchId, params.id);
  }, [params.searchId, params.id]);
  useEffect(() => {
    if (page !== params.id) {
      navigate(`/media-art/search/${params.searchId}/${page}`);
    }
  }, [page]);
  // useEffect(() => {
  //   getTop10();
  // }, []);

  useEffect(() => {
    if (keyword != params.searchId) {
      navigate(`/media-art/search/${keyword}/1`);
    }
  }, [keyword]);
  // useEffect(() => {
  //   handleSearch(search, page);
  // }, [page]);
  // useEffect(() => {
  //   handleSearch(search, params.id);
  // }, [params.id]);
  const handleSearch = async (search, page) => {
    try {
      const res = await AxiosConfig.get(
        `/search?search=${search}&p=${page}&detail=mediaArt`
      );
      console.log(res);
      if (res.data.statusCode === 200) {
        getMediaList(res.data.result.mediaArt);
        setWholePage(res.data.result.totalPage);
      } else {
        setApiError('미디어 아트 검색');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setPage(page);
      // navigate('/vido-chart/search/' + search + '/' + page);
    }
  };
  // const getOrder = (order, n) => {
  //   for (let i = 0; i < 3; i++) {
  //     ref.current.children[i].style.color = '#151515';
  //   }
  //   ref.current.children[n].style.color = '#002e85';
  //   setPage(1);
  //   getWholeChart(1, order);
  // };

  return (
    <>
      {errorPopup ? (
        <ErrorPopup
          context={apiError}
          errorMessage={errorMessage}
          setErrorPopup={setErrorPopup}
        />
      ) : null}
      <div className={styles.VidoChartPage}>
        {/* <MediaList title={'추천작품'} lang={'kor'} dataList={top10} /> */}
        <div className={styles.title}>
          <h1>
            검색 결과<span>미디어아트</span>
          </h1>
          {/* <p ref={ref}>
            <span onClick={() => getOrder('author', 0)}>작가별</span>
            <span onClick={() => getOrder('id', 1)}>최신순</span>
            <span onClick={() => getOrder('top', 2)}>인기순</span>
          </p> */}
        </div>
        <div className={styles.chartlist}>
          <MediaArtListStyle>
            <ul>
              {mediaList ? (
                mediaList === 'none' ? (
                  <NoResult
                    setSearch={setSearch}
                    handleSearch={handleSearch}
                    id={params.searchId}
                  />
                ) : (
                  mediaList.map((value, i) => (
                    <li key={i}>
                      <ChartUl chartData={value} />
                    </li>
                  ))
                )
              ) : null}
              {/* TODO chartUl thumbnail 수정 */}
            </ul>
          </MediaArtListStyle>
        </div>
        <div>
          {mediaList === 'none' ? null : (
            <></>
            // <SearchInput
            //   search={search}
            //   setSearch={setSearch}
            //   onClick={() => setKeyword(search)}
            //   placeHolder="미디어아트 검색"
            // />
          )}
          {wholePage <= 1 ? null : (
            <MediaListPagination
              wholePage={wholePage}
              setPage={setPage}
              page={page}
            />
          )}
        </div>
      </div>
      <Footer  mode={mode}/>
    </>
  );
};

export default MediaArtSearchPage;
