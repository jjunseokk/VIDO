import React from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';

const Div = styled.div`
  width: ${({ theme }) => theme.pgWidth};
  margin-top: 60px;
  height: ${px2vw(120)};
  margin-bottom: 60px;
  margin-left: ${({ theme }) => theme.left};
  img {
    height: ${px2vw(120)};
    width: ${({ theme }) => theme.pgWidth};
    object-fit: cover;
    display: block;
  }
  /* @media (max-width: 1200px) {
    height: 100px;
    img {
      height: 100px;
    }
  } */
`;

const EventBanner = () => {
  return (
    <Div>
      <img src="./img/vidoSubBanner.png" />
    </Div>
  );
};

export default EventBanner;
