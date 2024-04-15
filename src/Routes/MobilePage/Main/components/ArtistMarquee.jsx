import { useQuery } from 'react-query';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { getSuggestedArtist, getAuthors } from '../../../util/axiosGet';
import px2vwMobile from '../../../util/px2vwMobile';
import { Title } from '../../components/Title';
import Swipe from 'react-easy-swipe';
import px2vhMobile from '../../../util/px2vhMobile';
import ArtistEl from '../../components/ArtistEl';
import { useNavigate } from 'react-router-dom';

const Div = styled.div`
  width: 100vw;
  overflow: hidden;
  > .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${px2vwMobile(40)};
    margin-bottom: ${px2vwMobile(48)};
    > button {
      color: #707070;
      font: 400 14px ${({ theme }) => theme.noto};
      letter-spacing: -0.35;
    }
  }
  .horizontal-scroll {
    width: calc(100%);
    overflow-x:scroll;
    white-space:nowrap;
    -ms-overflow-style: none;
    scrollbar-width:none;
  }
  .horizontal-scroll::-webkit-scrollbar {
    display: none;
  }
  ul {
    display: flex;
    gap: ${px2vwMobile(47)};
    margin-left: ${px2vwMobile(40)};
    margin-bottom: ${px2vwMobile(235)};
    margin-right: ${px2vwMobile(40)};
    transform: translateX(${(props) => `calc(${props.x}px )`});
    width: max-content;
    transition: ${({ theme }) => theme.transition};
  }
`;

const ArtistMarquee = () => {
  const { data, isLoading, isFetched } = useQuery('authorList', () => getAuthors(1));
  const [positionX, setPositionX] = useState(0);
  const [swipeAmount, setSwipeAmount] = useState(0);
  const navigate = useNavigate();
  const windowWidth = window.innerWidth;
  const ulRef = useRef(null);
  return (
    <Div x={positionX}>
      <div className="head">
        <Title>아티스트</Title>
        <button onClick={() => navigate(`/author`)}>전체보기</button>
      </div>
      <div className="horizontal-scroll">
        <ul ref={ulRef}>
          {isFetched? data["author"].splice(0, 10).map((v) => 
          <li key={v.id}>
            <ArtistEl
              width={260}
              thumbnail={v.profileImgPath}
              author={v.authorName}
              id={v.id}
            />
          </li>): null}
        </ul>
        </div>
    </Div>
  );
};

export default ArtistMarquee;
