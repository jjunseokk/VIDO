import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MediaListPagination from '../Components/MediaListPagination';
import Footer from '../Components/Footer';
import AuthorUl from './components/AuthorUl';
import AxiosConfig from '../../AxiosConfig';
import { AnimatePresence } from 'framer-motion';
import ErrorPopup from '../Components/ErrorPopup';
import RecommendAuthor from './components/RecommendAuthor';
import styled from 'styled-components';
import px2vw from '../util/px2vw';
import { useTranslation } from "react-i18next";
import RenderPagination from '../Components/RenderPagination';
import KaKaoBtn from '../Components/KaKaoBtn';

const Div = styled.div`
  margin: 0 ${({ theme }) => theme.left};
  min-height: calc(100vh - 400px);
  
  h2 {
    margin-bottom: 20px;
    letter-spacing: -0.44px;
    line-height: 1.5;
    font: 600 22px/32.56px ${({ theme }) => theme.noto};
  }

  > div {
    &.AuthorList {
      margin-top: 80px;
      > div {
        display: flex;
        width: ${({ theme }) => theme.pgWidth};
        justify-content: space-between;
        align-items: center;

        h2 {
          font: 700 22px/33px ${({ theme }) => theme.noto};
          color: #151515;
          letter-spacing: -0.44px;
          margin-bottom: 24px;
          color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
        }
        > p {
          display: flex;
          align-items: center;
          justify-content: space-around;
          > span {
            position: relative;
            font: 400 14px/20px ${({ theme }) => theme.noto};
            margin-left: 17px;
            letter-spacing: -0.35px;
            cursor: pointer;
            color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
          }
        }
      }
      > ul {
        width: ${({ theme }) => theme.pgWidth};
        min-height: 200px;
        display: flex;
        flex-wrap: wrap;
        gap: 52px ${px2vw(40)};
        > li {
          width: ${px2vw(180)};
          > div {
            > p {
            }
          }
        }
      }
    }

    &:last-of-type {
      margin-top: 55px;
      margin-bottom: 115px;
      display: flex;
    }
    .btnArea{
      display: flex;
      align-items: center;
      padding-top: 5px;
      margin-left: 13px;
      button{
        &:first-of-type{
         margin-right: 7px;
        }
      }
    }
  }
`;

const Search = styled.div`
  height: 32px;
  width: 100%;
  position: relative;
  /* > ul {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  } */

  .pagination{
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${px2vw(500)};
      margin: 0 auto;
  
      >p{
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

  /* > div {
    width: 310px;
    border-bottom: 1px solid #e0e0e0;
    > input {
      background: none;
      outline: none;
      border: none;
      height: 32px;
      width: 280px;
      padding: 4px 6px;
      position: relative;
      bottom: 4px;
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
  } */
`;

const AuthorMainPage = ({ mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [authorData, setAuthorData] = useState([]);
  const [wholePage, setWholePage] = useState(1);
  const [page, setPage] = useState(Number(params.id));
  const [orderBy, setOrderBy] = useState(
    params.orderId ? params.orderId : 'name'
  );

  const [search, setSearch] = useState('');
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getAuthorData = () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem('scrollPosition');
    }
    AxiosConfig(
      `/author?p=${params.id}&orderBy=${orderBy == 'id' ? 'null' : orderBy}`
    ).then((res) => {
      if (res.data.statusCode == 200) {
        setAuthorData(res.data.result.author);
        setWholePage(res.data.result.totalPage);

      } else {
        setApiError('작가목록');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
    });
  };
  const handleSearch = () => {
    navigate(`/author/search/${search}/1`);
  };


  const [visibilityL, setVisibilityL] = useState('hidden');
  const [visibilityR, setVisibilityR] = useState('visible');


  const buttonClick = (direction) => {
    switch (direction) {
      case 'right': {
        setPage(page + 1);
        setVisibilityL('visible');
        setVisibilityR('visible');
        if (page == wholePage - 1) {
          setVisibilityR('hidden');
        };
        return;
      }
      case 'left': {
        setPage(page - 1);
        setVisibilityL('visible');
        setVisibilityR('visible');
        if (page == 2) {
          setVisibilityL('hidden');
        }
        return;
      }
    }
  };

  useEffect(() => {
    if (page == 1) {
      setVisibilityL('hidden');
      setVisibilityR('visible');
    } else if (page == wholePage) {
      setVisibilityL('visible');
      setVisibilityR('hidden');
    } else {
      setVisibilityL('visible');
      setVisibilityR('visible');
    }
  }, [page])

  useMemo(() => {
    return navigate(`/author/${orderBy}/${page}`);
  }, [page, orderBy, params.id]);

  useEffect(() => {
  }, [])

  useEffect(() => {
    getAuthorData();
  }, [params.id, params.orderId]);

  return (
    <div style={{ background: mode == 'light' ? "#ffff" : "#151515" }}>
      {/* <KaKaoBtn /> */}

      {errorPopup ? (
        <ErrorPopup
          context={apiError}
          errorMessage={errorMessage}
          setErrorPopup={setErrorPopup}
        />
      ) : null}
      <RecommendAuthor mode={mode} />
      <Div mode={mode}>
        <div className="AuthorList">
          <div>
            <h2>{t("author.all.title")}</h2>
            <p>
              <span
                style={
                  orderBy === 'name'
                    ? { color: '#1152CC' }
                    : { color: mode == 'light' ? '#151515' : '#ffffff' }
                }
                onClick={() => {
                  setPage(1);
                  sessionStorage.setItem('scrollPosition', window.pageYOffset);

                  setOrderBy('name');
                }}
              >
                {t("author.all.sort.name")}
              </span>
              <span
                style={{
                  color: orderBy === 'id' ? '#1152CC' : mode == 'light' ? '#151515' : "#ffffff",
                  marginRight: '10px'
                }
                }
                onClick={() => {
                  setPage(1);
                  sessionStorage.setItem('scrollPosition', window.pageYOffset);

                  setOrderBy('id');
                }}
              >
                {t("author.all.sort.new")}
              </span>

              <div className='btnArea'>
                <button
                  onClick={() => buttonClick('left')}
                  disabled={visibilityL == 'hidden' ? true : false}
                >
                  <img
                    src={
                      mode == 'light' ? visibilityL == 'hidden' ? '/img/prevBtn_off_light.svg' : '/img/prevBtn_on_light.svg' : visibilityL == 'hidden' ? '/img/prevBtn_off.svg' : '/img/prevBtn_on.svg'
                    }
                  ></img>
                </button>
                <button
                  disabled={visibilityR == 'hidden' || params.id == wholePage ? true : false}
                  onClick={() => buttonClick('right')}
                >
                  <img
                    src={
                      mode == 'light' ? visibilityR == 'hidden' || params.id == wholePage ? '/img/nextBtn_off_light.svg' : '/img/nextBtn_on_light.svg' : visibilityR == 'hidden' ? '/img/nextBtn_off.svg' : '/img/nextBtn_on.svg'
                    }
                  ></img>
                </button>
              </div>

            </p>
          </div>
          <AnimatePresence>
            {authorData.length > 0 ? <AuthorUl mode={mode} data={authorData} /> : null}
          </AnimatePresence>
        </div>
        <Search mode={mode}>
          {/* <div>
            <input
              value={search}
              placeholder={t("author.all.search")}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => (e.key == 'Enter' ? handleSearch() : null)}
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
              setPage={setPage}
              page={page}
            />
          ) : null} */}
          <RenderPagination mode={mode} totalPage={wholePage} setPage={setPage} page={Number(params.id)} />
        </Search>
      </Div>
      <Footer mode={mode} />
    </div>
  );
};

export default AuthorMainPage;
