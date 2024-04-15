import React from 'react';
import { motion, useScroll } from 'framer-motion';
import ArtistIcon1 from './ArtistIcon1';
import ArtistIcon2 from './ArtistIcon2';
import ArtistIcon3 from './ArtistIcon3';
import ArtistBg1 from './ArtistBg1';
import ArtistBg2 from './ArtistBg2';
import ArtistBg3 from './ArtistBg3';
import styled from 'styled-components';

const Div = styled(motion.div)`
  white-space: pre-wrap;
  height: 200px;
  position: relative;
  margin-bottom: 106px;
  > div {
    width: 650px;
    position: relative;
    > div {
      &:nth-of-type(1) {
        position: relative;
        height: 200px;
        width: 200px;
        svg {
          &:nth-of-type(1) {
            width: 200px;
            height: 200px;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }
          &:nth-of-type(2) {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: auto;
            height: auto;
            position: absolute;
          }
        }
        svg {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: auto;
          height: auto;
          position: absolute;
        }
      }
      &:nth-of-type(2) {
        position: absolute;
        top: 50%;
        left: 232px;
        transform: translateY(-50%);
        > h2 {
          color: ${({ mode }) => (mode == 'light' ? "#1152cc" : "#ffffff")};
          font: 600 28px ${({ theme }) => theme.noto};
          margin-bottom: 16px;
        }
        > p {
          word-break: keep-all;
          font-family: ${({ theme }) => theme.noto};
          font-weight: 400;
          font-size: 20px;
          color: ${({ mode }) => (mode == 'light' ? "#282828" : "#e5e5e5")};
          &:nth-of-type(2) {
            font-size: 14px;
            letter-spacing: -0.28px;
            color: #707070;
            margin-top: 8px;
          }
        }
      }
    }
  }
`;


// VIDO 소개 혜택 3가지
const MediaArtist = ({ title = '', content = '', small = '', img = '', mode }) => {
  return (
    <Div
      initial={{ opacity: 0 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
      mode={mode}
    >
      <div>
        <div>
          {img == 1 ? <ArtistBg1 /> : img == 2 ? <ArtistBg2 /> : <ArtistBg3 />}
          {img == 1 ? (
            <ArtistIcon1 />
          ) : img == 2 ? (
            <ArtistIcon2 />
          ) : (
            <ArtistIcon3 />
          )}
        </div>
        <div>
          <h2>{title}</h2>
          <p>{content}</p>
          <p>{small}</p>
        </div>
      </div>
    </Div>
  );
};

export default MediaArtist;
