import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MediaList from './components/MediaList';
import TOP10 from './data/TOP10.json';
import ChartUl from './components/ChartUl';
import MediaListPagination from './components/MediaListPagination';
import AxiosConfig from '../../AxiosConfig';
import styles from './VidoChartPage.module.scss';
import SearchInput from './components/SearchInput';
import NoResult from './components/NoResult';
import { useNavigate, useParams } from 'react-router-dom';

const VidoChartSearchPage = () => {
  const searchId = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchId.id);
  const [page, setPage] = useState(1);
  const [mediaList, setMediaList] = useState([]);
  const [wholePage, setWholePage] = useState(0);
  const listSize = 6;

  const getMediaList = (chartData) => {
    if (!chartData[0]) {
      setMediaList('none');
      console.log('none');
    } else {
      let tempMediaList = [];
      for (let i = 0; i < chartData.length; i += listSize) {
        let templist = chartData.slice(i, i + listSize);
        tempMediaList.push(templist);
      }
      console.log(tempMediaList);
      setMediaList(tempMediaList);
    }
  };
  useEffect(() => {
    setPage(1);
    handleSearch(search);
  }, []);
  useEffect(() => {
    handleSearch(search);
  }, [page]);
  const handleSearch = async (search) => {
    navigate('/vido-chart/search/' + search);

    try {
      const res = await AxiosConfig.get(`/search?keyword=${search}&p=${page}`);
      console.log(res);
      getMediaList(res.data.result.media_art);
      setWholePage(res.data.result.total_page);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.VidoChartPage}>
      <MediaList title={'추천작품'} lang={'kor'} dataList={TOP10} />
      <div className={styles.title}>
        <h1>VIDO 차트</h1>
        <p>
          <span>작가별</span>
          <span>최신순</span>
          <span>인기순</span>
        </p>
      </div>
      <div className={styles.chartlist}>
        <ul>
          {mediaList ? (
            mediaList === 'none' ? (
              <NoResult handleSearch={handleSearch} id={searchId.id} />
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
      </div>
      {mediaList === 'none' ? null : (
        <div>
          <SearchInput
            search={search}
            setSearch={setSearch}
            onClick={() => handleSearch(search)}
          />
          <MediaListPagination
            setPage={setPage}
            page={page}
            wholePage={wholePage}
          />
        </div>
      )}

      <Footer mode={mode}/>
    </div>
  );
};

export default VidoChartSearchPage;
