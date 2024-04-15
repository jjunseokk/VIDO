import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import TaggedArt from './components/TaggedArt';
import MediaListPagination from '../Components/MediaListPagination';
import styled from 'styled-components';
import RecommendedArt from './components/RecommendedArt';
import { useRecoilState } from 'recoil';
import { tagSearchPage } from '../util/recoilState';
import RenderPagination from '../Components/RenderPagination';
import px2vw from '../util/px2vw';

const Div = styled.div`
  min-height: 80vh;
  padding-bottom: 0;
  padding-top: -50px;
  width: 100%;
  >div{
    background : ${({ mode }) => (mode == 'light' ? '#fff' : "#151515")};
    >div.d {
    position: relative;
    width: 100%;
    height: 70px;

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
  }
  }
  
`;

const TaggedArtPage = ({ mode }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useRecoilState(tagSearchPage);
  const [wholePage, setWholePage] = useState(1);
  return (
    <>
      {/* <RecommendedArt /> */}
      <Div mode={mode}>
        <div>
          <TaggedArt
            selected={selected}
            setSelected={setSelected}
            setWholePage={setWholePage}
            setPage={setPage}
            page={page}
            mode={mode}
            disabled={true}
          />
          <div className="d">
            {wholePage == 0 ? null : <RenderPagination mode={mode} totalPage={wholePage} setPage={setPage} page={page} type='tag' />}
            {/* {wholePage > 1 ? (
              <MediaListPagination
                page={page}
                setPage={setPage}
                wholePage={wholePage}
              />
            ) : null} */}
          </div>
        </div>
      </Div>
      <Footer mode={mode}/>
    </>
  );
};

export default TaggedArtPage;
