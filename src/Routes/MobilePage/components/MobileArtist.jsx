import React from 'react';
import { motion, useScroll } from 'framer-motion';
import ArtistBg1 from '../../AboutPage/components/ArtistBg1';
import ArtistBg2 from '../../AboutPage/components/ArtistBg2';
import ArtistBg3 from '../../AboutPage/components/ArtistBg3';
import ArtistIcon1 from '../../AboutPage/components/ArtistIcon1';
import ArtistIcon2 from '../../AboutPage/components/ArtistIcon2';
import ArtistIcon3 from '../../AboutPage/components/ArtistIcon3';
import styled from 'styled-components';
import px2vwMobile from '../../util/px2vwMobile';
import { up } from '../../util/Framer';
import px2vhMobile from '../../util/px2vhMobile';

const Div = styled(motion.div)`
  display: flex;
  position: relative;
  margin-bottom: ${px2vwMobile(140)};
  justify-content: space-between;
  align-items: center;
  img {
    width: ${px2vwMobile(300)};
    height: ${px2vwMobile(300)};
    display: block;
    object-fit: cover;
  }
  h2 {
    font: 700 20px ${({ theme }) => theme.noto};
    letter-spacing: -0.4px;
    margin-bottom: ${px2vhMobile(20)};
  }
  > div {
    &:nth-of-type(1) {
      position: relative;
    }
    &:nth-of-type(2) {
      p {
        color: #2b2b2b;
      }
    }
  }
  @media only screen and (min-width: 300px) {
    p {
      font: 400 16px/1.3 ${({ theme }) => theme.noto};
      letter-spacing: -0.32px;
    }
  }
  @media only screen and (max-width: 300px) {
    p {
      font: 400 12px/1.5 ${({ theme }) => theme.noto};
      letter-spacing: -0.32px;
    }
  }
`;

const MobileArtist = ({ title = '', content = '', small = '', img = '' }) => {
  return (
    <Div variants={up.item}>
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <div>
        {/* <img src={`./img/artistBg${img}.svg`} /> */}
        <img src={`/img/mobileArtist${img}.png`} />
      </div>
    </Div>
  );
};

export default MobileArtist;
