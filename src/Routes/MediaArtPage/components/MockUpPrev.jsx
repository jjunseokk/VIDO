import React from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';

const MockupPrev = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: ${({ theme }) => theme.pgWidth};
  justify-content: space-between;
  gap: ${px2vw(20)};
  > div {
    position: relative;
    > img.thumb {
      position: absolute;
      object-fit: cover;
    }
    &.one {
      img.thumb {
        left: 13.9%;
        top: 20.8%;
        width: ${px2vw(1016.58)};
        height: ${px2vw(287.46)};
      }
      > img.mockup {
        position: relative;
        width: ${({ theme }) => theme.pgWidth};
        height: ${px2vw(853)};
        object-fit: cover;
      }
    }
    &.two {
      img.thumb {
        left: 39.4%;
        top: 63.5%;
        width: ${px2vw(113.27)};
        height: ${px2vw(166.72)};
      }
      > img.mockup {
        position: relative;
        object-fit: cover;

        width: ${px2vw(482)};
        height: ${px2vw(562.3)};
      }
    }
    &.three {
      > img.thumb {
        width: ${px2vw(399.09)};
        height: ${px2vw(265.69)};
        left: 35.2%;
        top: 15.8%;
      }
      > img.mockup {
        position: relative;
        height: ${px2vw(562.3)};
        object-fit: cover;

        width: ${px2vw(770)};
      }
    }
  }
`;

const MockUpPrev = ({ src }) => {
  return (
    <MockupPrev>
      <div className="one">
        <img className="thumb" src={src} />
        <img className="mockup" src="/img/mockup3.png" />
      </div>
      <div className="two">
        <img className="thumb" src={src} />
        <img className="mockup" src="/img/mockup1.png" />
      </div>
      <div className="three">
        <img className="thumb" src={src} />
        <img className="mockup" src="/img/mockup2.png" />
      </div>
    </MockupPrev>
  );
};

export default MockUpPrev;
