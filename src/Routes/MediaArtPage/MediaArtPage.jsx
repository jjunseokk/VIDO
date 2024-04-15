import React, { useEffect, useState, useRef } from 'react';
import Footer from '../Components/Footer';
import ChartUl from '../Components/ChartUl';
import MediaListPagination from '../Components/MediaListPagination';
import AxiosConfig from '../../AxiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TaggedArt from './components/TaggedArt';
import ErrorPopup from '../Components/ErrorPopup';
import RecommendedArt from './components/RecommendedArt';
import MediaArtListStyle from './MediaArtListStyle';
import EditorPick from './components/EditorPick';
import MediaArtPageStyle from './MediaArtPageStyle';

const MediaArtPage = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(param.id ? param.id : 1);
  const [mediaList, setMediaList] = useState([]);
  const [wholePage, setWholePage] = useState(0);
  const [orderBy, setOrderBy] = useState(param.orderId ? param.orderId : 'id');
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const listSize = 5;
  const ref = useRef(null);
  //   p = 페이지 index, total_page = 총 페이지 수

  // orderBy = 정렬 기준(NULL 가능) id, title, description, top, author

  // ratio = 특정 비율 필터링(NULL가능) vertical:horizontal ex) 2:8

  //removed는 클릭시 다른 창뜨게
  const getWholeChart = async (i) => {
    try {
      const res = await AxiosConfig.get(`/art/page/${i}?orderBy=${orderBy}`);
      if (res.data.statusCode == 200) {
        getMediaList(res.data.result.media_art);
        setWholePage(res.data.result.total_page);
      } else {
        setApiError('VIDO 차트');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getMediaList = (chartData) => {
    let tempMediaList = [];
    for (let i = 0; i < chartData.length; i += listSize) {
      let templist = chartData.slice(i, i + listSize);
      tempMediaList.push(templist);
    }
    setMediaList(tempMediaList);
  };
  useEffect(() => {
    getWholeChart(page);
    if (page !== param.id || orderBy != param.orderId) {
      navigate(`/media-art/${orderBy}/${page}`);
    }
  }, [page, orderBy]);
  useEffect(() => {
    param.id !== page ? setPage(param.id) : null;
    param.orderId != orderBy ? setOrderBy(param.orderId) : null;
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem('scrollPosition');
    }
  }, [param.id, param.orderId]);
  // useEffect(() => {
  //   getWholeChart(page);
  //   console.log('orderBy');
  // }, [orderBy]);

  const handleSearch = async () => {
    navigate('/media-art/search/' + search + '/1');
    // try {
    //   const res = await AxiosConfig.get(`/search?keyword=${search}&p=${page}`);
    //   console.log(res);
    // } catch (e) {
    //   console.log(e);
    // }
  };
  const getOrder = (order, n) => {
    for (let i = 0; i < 3; i++) {
      ref.current.children[i].style.color = '#151515';
    }
    ref.current.children[n].style.color = '#002e85';
    setOrderBy(order);
    setPage(1);
    getWholeChart(1, order);
  };

  return (
    <>
      {errorPopup ? (
        <ErrorPopup
          context={apiError}
          errorMessage={errorMessage}
          setErrorPopup={setErrorPopup}
        />
      ) : null}
      <MediaArtPageStyle>
        <RecommendedArt />
        <div className={'title'}>
          <h1>미디어아트 목록</h1>
          <p ref={ref}>
            {/* <span
              style={
                orderBy === 'author'
                  ? { color: '#002e85' }
                  : { color: '#151515' }
              }
              onClick={() => {
                setPage(1);
                setOrderBy('author');
              }}
            >
              작가별
            </span> */}
            <span
              style={
                orderBy === 'id' ? { color: '#002e85' } : { color: '#151515' }
              }
              onClick={() => {
                setPage(1);
                setOrderBy('id');
                sessionStorage.setItem('scrollPosition', window.pageYOffset);
              }}
            >
              최신순
            </span>
            <span
              style={
                orderBy === 'top' ? { color: '#002e85' } : { color: '#151515' }
              }
              onClick={() => {
                setPage(1);
                sessionStorage.setItem('scrollPosition', window.pageYOffset);

                setOrderBy('top');
              }}
            >
              인기순
            </span>
          </p>
        </div>
        <div className={'chartlist'}>
          <MediaArtListStyle>
            <motion.ul
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
            >
              {mediaList
                ? mediaList.map((value, i) => (
                    <li key={i}>
                      <ChartUl chartData={value} />
                    </li>
                  ))
                : null}
            </motion.ul>
          </MediaArtListStyle>
        </div>
        <div className={'search'}>
          <div>
            <input
              value={search}
              placeholder="미디어아트를 검색해보세요"
              onChange={(e) => setSearch(e.target.value)}
            />
            <span>
              <img
                src="/img/search.svg"
                onClick={search ? handleSearch : null}
              />
            </span>
          </div>
          {wholePage > 1 ? (
            <MediaListPagination
              wholePage={wholePage}
              setPage={(v) => {
                setPage(v);
                sessionStorage.setItem('scrollPosition', window.pageYOffset);
              }}
              page={page}
            />
          ) : null}
        </div>
        {/* <EditorSuggest /> */}
        <TaggedArt />
        <EditorPick />
        <Footer mode={mode} white={true} />
      </MediaArtPageStyle>
    </>
  );
};

export default MediaArtPage;
