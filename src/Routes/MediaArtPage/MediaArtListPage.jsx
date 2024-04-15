import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import MediaListPagination from '../Components/MediaListPagination';
import Title from '../MainPage/components/TitleStyle';
import ArtList from './components/ArtList';
import RecommendedArt from './components/RecommendedArt';
import { useTranslation } from "react-i18next";
import RenderPagination from '../Components/RenderPagination';
import px2vw from '../util/px2vw';



const Div = styled.div`
  padding-top: 48px;
  margin-left: ${({ theme }) => theme.left};
  padding-bottom: 120px;
  position: relative;
  width: ${({ theme }) => theme.pgWidth};
  min-height: calc(100vh - 23vw);
  position: relative;
  >div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    > ul.order {
    display: flex;
    position: absolute;
    right: 0;
    top: 65px;
    gap: 24px;
    font: 400 14px/20px ${({ theme }) => theme.noto};
    letter-spacing: -0.35px;
    > li {
      cursor: pointer;
      color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
      padding-top: 1px;
    }
    > li.selected {
      cursor: default;
      color: ${({ theme }) => theme.highlightColor};
    }
    .pageBtn{
      >button{
        &:first-of-type{
          >img{
              margin-right: 7px;
          }
        }
      }
    }
  }
  }

  > div {
    margin-bottom: 24px;
  }
  .pagination{
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${px2vw(500)};
      margin: 0 auto;
  
      >p{
        margin-top: 3px;
        padding: 0px 10px;
        font: 400 14px/20px;
        color: #9d9d9d;
        cursor: pointer;
      }
      >p.active{
        color: ${({ mode }) => (mode == 'light' ? '#1152CC' : 'white')};
      }
      >button{
        padding: 0px 5px;
      }
    }
`;

const Search = styled.div`
  height: 32px;
  width: 100%;
  position: relative;
  > ul {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  > div {
    width: 310px;
    /* border-bottom: 1px solid #e0e0e0; */
    > input {
      background: none;
      outline: none;
      border: none;
      height: 32px;
      width: 280px;
      padding: 4px 6px;
      font: 400 14px/20px ${({ theme }) => theme.noto};
      color: #151515;
      &::placeholder {
        color: #9d9d9d;
        font: 400 14px/20px ${({ theme }) => theme.noto};
      }
      &:focus {
        border: none;
        &::placeholder {
          opacity: 0;
        }
      }
    }
    img {
      width: 24px;
      height: 24px;
      margin-top: 4px;
      cursor: pointer;
    }
  }
  @media (max-width: 1618px) {
    > div {
      width: 220px;
      > input {
        width: 200px;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  @media (max-width: 1366px) {
    > div {
      width: 200px;
      > input {
        width: 180px;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  @media (max-width: 1272px) {
    > div {
      width: 180px;
      > input {
        width: 160px;
        &::placeholder {
          opacity: 0;
        }
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  @media (max-width: 932px) {
    > ul {
      top: 52px;
    }
    > div {
      > input {
      }
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  @media (max-width: 702px) {
    > ul {
      top: 52px;
    }
    > div {
    }
  }
`;

const MediaArtListPage = ({ mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [search, setSearch] = useState('');
  // const [page, setPage] = useState(params.id);
  const [wholePage, setWholePage] = useState();
  const [orderBy, setOrderBy] = useState(params.orderId);

  const [getPage, setGetPage] = useState(Number(params.id));
  useMemo(() => {
    if (getPage !== params.id) navigate(`/media-art/total/${orderBy}/${getPage}`);
  }, [getPage, params.id]);
  useMemo(() => {
    setOrderBy(params.orderId);
  }, [params.orderId]);
  // useMemo(() => {
  //   setGetPage(params.id);
  // }, [params.id]);
  useMemo(() => {
    if (orderBy != params.orderId) navigate(`/media-art/total/${orderBy}/1`);
  }, [orderBy]);

  const handleSearch = () => {
    navigate(`/media-art/search/${search}/1`);
  };

  const [visibilityL, setVisibilityL] = useState(false);
  const [visibilityR, setVisibilityR] = useState(false);

  const handlePageChange = (page) => {
    if (page == 1) {
      setVisibilityL(true);
      setGetPage(page);
    } else if (page == wholePage) {
      setVisibilityR(true);
      setGetPage(page);
    } else {
      setGetPage(page);
      setVisibilityL(false);
      setVisibilityR(false)
    }
  }

  useEffect(() => {
    if (getPage == 1) {
      setVisibilityL(true);
      setVisibilityR(false);
    } else if (getPage == wholePage) {
      setVisibilityL(false);
      setVisibilityR(true);
    } else {
      setVisibilityL(false);
      setVisibilityR(false);
    }
  }, [getPage]);
  
  return (
    <div style={{ background: mode == 'light' ? '#ffff' : '#151515' }}>
      {/* <RecommendedArt /> */}
      <Div mode={mode}>
        <div>
          <Title mode={mode}>{t("media_art.all.title")}</Title>
          <ul className="order">
            <li
              onClick={() => {
                setOrderBy('id');
                setGetPage(1);
              }}
              className={orderBy == 'id' ? 'selected' : null}
            >
              {t("media_art.all.order.new")}
            </li>
            <li
              onClick={() => {
                setOrderBy('top');
                setGetPage(1);
              }}
              className={orderBy == 'top' ? 'selected' : null}
            >
              {t("media_art.all.order.top")}
            </li>
            <div className='pageBtn'>
              <button
                disabled={visibilityL == true ? true : false}
                onClick={() => handlePageChange(getPage - 1)}
              >
                <img
                  src={
                    mode == 'light' ? visibilityL == true ? '/img/prevBtn_off_light.svg' : '/img/prevBtn_on_light.svg' : visibilityL == 'hidden' ? '/img/prevBtn_off.svg' : '/img/prevBtn_on.svg'
                  }
                ></img>
              </button>
              <button
                disabled={visibilityR == true || params.id == wholePage  ? true : false}
                onClick={() => handlePageChange(getPage + 1)}
              >
                <img
                  src={
                    mode == 'light' ? visibilityR == true || params.id == wholePage ? '/img/nextBtn_off_light.svg' : '/img/nextBtn_on_light.svg' : visibilityR == 'hidden'  ? '/img/nextBtn_off.svg' : '/img/nextBtn_on.svg'
                  }
                ></img>
              </button>
            </div>
          </ul>
        </div>

        <ArtList mode={mode} page={Number(params.id)} setWholePage={setWholePage} orderBy={orderBy} />
        <Search>
          {/* <div>
            <input
              value={search}
              placeholder={t("media_art.all.search")}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => (e.key == 'Enter' ? handleSearch() : null)}
            />
            <span>
              <img
                src="/img/search.svg"
                onClick={search ? handleSearch : null}
              />
            </span>
          </div> */}
          {/* <MediaListPagination
            setPage={setPage}
            page={page}
            wholePage={wholePage}
          /> */}
          <RenderPagination mode={mode} totalPage={wholePage} setPage={setGetPage} page={Number(params.id)} />
        </Search>
      </Div>
      <Footer mode={mode} />
    </div>
  );
};

export default MediaArtListPage;
