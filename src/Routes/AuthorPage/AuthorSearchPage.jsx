import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../ContextProvider';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosConfig from '../../AxiosConfig';
import MediaListPagination from '../Components/MediaListPagination';
import AuthorUl from './components/AuthorUl';
import Footer from '../Components/Footer';
import NoResult from '../MainPage/components/NoResult';
import ErrorPopup from '../Components/ErrorPopup';
import styled from 'styled-components';
import px2vw from '../util/px2vw';

const Div = styled.div`
  margin: 0 ${({ theme }) => theme.left};
  margin-top: 57px;
  min-height: calc(100vh);
  position: relative;
  margin-bottom: 120px;
  > section {
    h1 {
      font: 700 22px/33px ${({ theme }) => theme.noto};
      color: #151515;
      margin-bottom: 24px;
      letter-spacing: -0.44px;
      > span {
        color: #151515;
        margin-left: 24px;
        letter-spacing: -0.4px;
        position: relative;
        font: 400 20px/29px ${({ theme }) => theme.noto};
        &::after {
          position: absolute;
          left: -12px;
          height: 20px;
          width: 1px;
          display: block;
          top: 4px;
          content: '';
          background-color: #c1c1c1;
        }
      }
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      /* gap: 20px calc((${({ theme }) => theme.pgWidth} - (132px * 8)) / 7); */
      gap: ${px2vw(20)} ${px2vw(40)};
      > li {
        > div {
          > p {
            font: 500 14px ${({ theme }) => theme.noto};
          }
        }
      }
    }
  }
  > ul {
    margin-top: 60px;
  }
`;

// 하단 검색 페이지
const AuthorSearchPage = () => {
  const { serverAddress } = useContext(UserContext);
  const params = useParams();

  const [page, setPage] = useState(params.id);
  const [wholePage, setWholePage] = useState(1);
  const [orderBy, setOrderBy] = useState(params.orderBy);
  const [authorData, setAuthorData] = useState([]);
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const getSearchData = () => {
    AxiosConfig(
      `/author?p=${page}&orderBy=${orderBy}&search=${params.searchId}`
    ).then((res) => {
      if (res.status === 200) {
        if (res.data.statusCode === 200) {
          setAuthorData(res.data.result.author);
          if (res.data.result.totalPage) {
            setWholePage(res.data.result.totalPage);
          }
        } else {
          setApiError('작가검색');
          setErrorMessage(res.data.statusCode);
          setErrorPopup(true);
        }
      } else {
        alert('네트워트 오류');
      }
      console.log(res);
    });
  };
  useEffect(() => getSearchData(), []);

  return (
    <>
      {errorPopup ? (
        <ErrorPopup
          context={apiError}
          errorMessage={errorMessage}
          setErrorPopup={setErrorPopup}
        />
      ) : null}
      {authorData ? (
        authorData.length <= 0 ? (
          <>
            <NoResult id={params.searchId} />
            <Footer mode={mode} />
          </>
        ) : (
          <>
            <Div>
              <section>
                <h1>
                  검색결과<span>아티스트</span>
                </h1>
                <AuthorUl data={authorData} />
              </section>
              {wholePage <= 1 ? null : (
                <MediaListPagination
                  wholePage={wholePage}
                  page={page}
                  setPage={setPage}
                />
              )}
            </Div>
            <Footer mode={mode}/>
          </>
        )
      ) : null}
    </>
  );
};

export default AuthorSearchPage;
