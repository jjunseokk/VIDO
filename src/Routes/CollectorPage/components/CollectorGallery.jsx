import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {i18n} from "../../../language/i18n";

const Div = styled(motion.div)`
  position: relative;

  > div {
    .cont {
      display: flex;
      flex-wrap: wrap;
      gap: ${px2vw(12)};
      height: ${px2vw(420)};
      width: ${({ length }) => {
        let el = Math.ceil(length / 2);
        return px2vw(el * 317);
      }};
    }
    .el {
      width: ${px2vw(305)};
      height: ${px2vw(200)};
      overflow: hidden;
      position: relative;
      cursor: pointer;
      transition: ${({ theme }) => theme.transiton};
      &::after {
        display: block;
        transition: ${({ theme }) => theme.transiton};
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #151515;
        opacity: 0;
      }
      > p {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font: 500 16px/36px ${({ theme }) => theme.noto};
        opacity: 0;
        color: #fff;
        transition: ${({ theme }) => theme.transition};
      }
      > img {
        width: ${px2vw(305)};
        height: ${px2vw(200)};
        object-fit: cover;
        transition: ${({ theme }) => theme.transition};
      }
      &:hover {
        &::after {
          opacity: 0.3;
        }
        > p {
          opacity: 1;
        }
        > img {
          transform: scale(1.4);
        }
      }
    }
  }
`;
// 메인페이지 미디어 캔버스 갤러리
const CollectorGallery = ({ setImgPopup }) => {
  const [shuffled, setShuffled] = useState([]);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  async function getGalleryList() {
    const response = await axios.get("/data/gallery.json");

    return response.data;
  }

  useEffect(() => {
    getGalleryList().then((value) => {
      const randomResult = shuffle(value);
      setShuffled(randomResult);
    });
  }, []);

  return (
    <Div length={shuffled.length}>
      <Marquee gradient={false} speed={60} pauseOnHover={true}>
        <div className="cont">
          {shuffled?.map((val, index) => (
            <motion.div
              className="el"
              onClick={() => setImgPopup(val.url)}
              key={index}
            >
              <img src={val.url} alt="collector" />
              {/* <p>{val.title}</p> */}
              <p>{i18n.language !== "ko" ? val.enTitle !== "" ? val.enTitle :  val.title : val.title}</p>
            </motion.div>
          ))}
        </div>
      </Marquee>
    </Div>
  );
};

export default CollectorGallery;

