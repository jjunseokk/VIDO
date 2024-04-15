import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosConfig from '../../AxiosConfig';
import AuthorUl from '../AuthorPage/components/AuthorUl';
import Footer from '../Components/Footer';
import ChartUl from '../Components/ChartUl';
import MediaListPagination from '../Components/MediaListPagination';
import SearchMainStyle from './SearchMainStyle';
import { Trans, useTranslation } from "react-i18next";
import RenderPagination from '../Components/RenderPagination';

const SearchMain = ({ mode }) => {
  const { t } = useTranslation();
  const { serverAddress } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  const [authorDetail, setAuthorDetail] = useState(params.authorId);
  const [artDetail, setArtDetail] = useState(params.artId);
  const [authorData, setAuthorData] = useState([]);
  const [artData, setArtData] = useState([]);
  // const [artPage, setArtPage] = useState(params.artId);
  // const [authorPage, setAuthorPage] = useState(params.authorId);
  const [artWholePage, setArtWholePage] = useState(1);
  const [authorWholePage, setAuthorWholePage] = useState(1);

  const getSearchData = (search) => {
    AxiosConfig.get(`/search?p=1&search=${search}`).then((res) => {
      if (artDetail < 1) {
        setArtData(res.data.result.mediaArt.mediaArt);
      }
      if (authorDetail < 1) {
        setAuthorData(res.data.result.author.author);
      }
      // setArtDetail(0);
      // setAuthorDetail(0);
      // setArtWholePage(0);
      // setAuthorWholePage(0);
    });
  };

  // const getDetailData = (detail) => {
  //   AxiosConfig.get(
  //     `/search?p=${1}&search=${params.searchId}&detail=${detail}`
  //   ).then((res) => {
  //     if (res.data.result.mediaArt) {
  //       setArtDetail(1);
  //       setArtData(res.data.result.mediaArt.mediaArt);
  //       setArtWholePage(res.data.result.totalPage);
  //     } else {
  //       setAuthorDetail(1);
  //       setAuthorData(res.data.result.author.author);
  //       setAuthorWholePage(res.data.result.totalPage);
  //     }
  //   });
  // };

  useEffect(() => {
    if (params.artId !== artDetail || params.authorId !== authorDetail) {
      navigate(`/search/${params.searchId}/${authorDetail}/${artDetail}`);
    }
  }, [authorDetail, artDetail]);

  useEffect(() => {
    if (params.artId !== artDetail || params.authorId !== authorDetail) {
      setArtDetail(params.artId);
      setAuthorDetail(params.authorId);
    }
  }, [params.artId, params.authorId]);

  useEffect(() => {
    if (params.artId === 0 && params.authorId === 0)
      getSearchData(params.searchId);
  }, []);
  useEffect(() => getSearchData(params.searchId), [params.searchId]);
  const getAuthorDetailPg = () => {
    AxiosConfig.get(
      `/search?p=${authorDetail ?? 1}&search=${params.searchId}&detail=author`
    ).then((res) => {
      setAuthorData(res.data.result.author);
      setAuthorWholePage(res.data.result.totalPage);
    });
  };
  const getArtDetailPg = () => {
    AxiosConfig.get(
      `/search?p=${artDetail ?? 1}&search=${params.searchId}&detail=mediaArt`
    ).then((res) => {
      setArtData(res.data.result.mediaArt);
      setArtWholePage(res.data.result.totalPage);
    });
  };
  useEffect(() => {
    if (params.artId > 0) {
      getArtDetailPg();
    }
  }, [params.artId]);
  useEffect(() => {
    if (params.authorId > 0) {
      getAuthorDetailPg();
    }
  }, [params.authorId]);
  return (
    <>
      {/* 상단 검색 결과 페이지 */}
      <SearchMainStyle mode={mode}>
        <h1>{t("search.title")}</h1>

        <section>
          <h2>{t("search.artist")}</h2>
          <div>
            {authorData && authorData.length > 0 ? (
              <AuthorUl mode={mode} data={authorData} />
            ) : (
              <div className="notFound">
                <p>
                  <Trans i18nKey={"search.no_result"} components={[<span></span>]} values={{ value: params.searchId }} />
                </p>
                <span>{t("search.no_result_description")}</span>
              </div>
            )}
            {console.log(authorDetail)}
            {authorWholePage > 1 ? (
              // <MediaListPagination
              //   wholePage={authorWholePage}
              //   page={authorDetail}
              //   setPage={setAuthorDetail}
              // />
              <RenderPagination mode={mode} totalPage={authorWholePage} setPage={setAuthorDetail} page={Number(authorDetail)} />
            ) : null}
          </div>
          {authorData && authorData.length > 5 ? (
            <button
              style={authorDetail > 0 ? { opacity: 0 } : null}
              onClick={() => {
                setAuthorDetail(1);
                getAuthorDetailPg();
              }}
            >
              {t("search.show_all")}
            </button>
          ) : null}
        </section>
        <section>
          <h2>{t("search.media_art")}</h2>
          <div>
            {artData && artData.length > 0 ? (
              <ChartUl mode={mode} chartData={artData} />
            ) : (
              <div className="notFound">
                <p>
                  <Trans i18nKey={"search.no_result"} components={[<span></span>]} values={{ value: params.searchId }} />
                </p>
                <span>{t("search.no_result_description")}</span>
              </div>
            )}
            {artWholePage > 1 ? (
              // <MediaListPagination
              //   wholePage={artWholePage}
              //   page={artDetail}
              //   setPage={setArtDetail}
              // />
              <RenderPagination mode={mode} totalPage={artWholePage} setPage={setArtDetail} page={Number(artDetail)} />

            ) : null}
          </div>
          {artData && artData.length > 4 ? (
            <button
              style={artDetail > 0 ? { opacity: 0, cursor: 'default' } : null}
              onClick={() => {
                setArtDetail(1);
                getArtDetailPg();
              }}
            >
              {t("search.show_all")}
            </button>
          ) : null}
        </section>
      </SearchMainStyle>
      <Footer  mode={mode}/>
    </>
  );
};
export default SearchMain;
