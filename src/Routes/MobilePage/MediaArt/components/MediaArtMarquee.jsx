import Swipe from 'react-easy-swipe';
import styled from 'styled-components';
import px2vhMobile from '../../../util/px2vhMobile';
import px2vwMobile from '../../../util/px2vwMobile';
import MediaEl from '../../components/MediaEl';
import { useState, useRef, useEffect } from 'react';

const Div = styled.div`
  width: 100vw;
  margin-bottom: ${px2vhMobile(86)};
  overflow-x: hidden;
  ul {
    margin-left: ${px2vwMobile(40)};
    display: flex;
    gap: 0 ${px2vwMobile(40)};
    transform: translateX(${(props) => `calc(${props.x}px )`});
    transition: ${({ theme }) => theme.transition};
    width: max-content;
  }
`;

const MediaArtMarquee = ({ artList }) => {
  const [positionX, setPositionX] = useState(0);
  const [swipeAmount, setSwipeAmount] = useState(0);
  const windowWidth = window.innerWidth;
  const ulRef = useRef(null);
  const onSwipeMove = (position) => {
    setSwipeAmount(() => position.x);
    setPositionX((prev) => prev + position.x);
  };
  const onSwipeEnd = (position) => {
    if (positionX + swipeAmount > 0) {
      setPositionX(0);
    }
    if (
      positionX + swipeAmount <
      -ulRef.current.offsetWidth + windowWidth - 30
    ) {
      setPositionX(-ulRef.current.offsetWidth + windowWidth - 30);
    }
    setSwipeAmount(() => 0);
  };
  useEffect(() => {
    setPositionX(0);
  }, [artList]);
  return (
    <Div x={positionX}>
      <Swipe onSwipeMove={onSwipeMove} onSwipeEnd={onSwipeEnd}>
        <ul ref={ulRef}>
          {Array.isArray(artList) &&
            artList.map((v) => (
              <li key={v.id}>
                <MediaEl
                  thumbnail={v.thumbnailPath}
                  title={v.title}
                  profile="none"
                  author={v.authorName}
                  className={'small'}
                  id={v.id}
                />
              </li>
            ))}
        </ul>
      </Swipe>
    </Div>
  );
};

export default MediaArtMarquee;
