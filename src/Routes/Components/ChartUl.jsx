import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ChartElement from './ChartElement';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FramerMotionAnimate from '../util/FramerMotionAnimate.json';
import ContextProvider, { UserContext } from './../ContextProvider';
import px2vw from '../util/px2vw';

const Ul = styled.ul`
  width: ${({ theme }) => theme.pgWidth};
  display: flex;
  position: relative;
  flex-wrap: wrap;
  margin: 24px 0;
  gap: 20px ${px2vw(20)};
`;

const ChartUl = ({ chartData, mode }) => {
  const { serverAddress } = useContext(UserContext);
  const [data, setData] = useState([]);
  useEffect(() => setData(chartData), [chartData]);
  // console.log(chartData)
  // console.log(data)
  return (
    <AnimatePresence>
      <Ul>
        {Array.isArray(data)
          ? data.map((value) => (
            <motion.li
              variants={FramerMotionAnimate[0]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition="transition"
              key={value.id}
            >
              <ChartElement
                id={value.id}
                imgsrc={
                  value.thumbnailPath
                    ? serverAddress + value.thumbnailPath
                    : serverAddress + value.thumbnail
                }
                profImg={
                  value.author == undefined ?
                    value.authorProfilePath ? serverAddress + value.authorProfilePath : '/img/author-img.png'
                    : value.author.profileImgPath ? serverAddress + value.author.profileImgPath : '/img/author-img.png'
                }
                title={value.title}
                author={value.author == undefined ? value.authorName : value.author.authorName}
                authorId={value.author == undefined ? value.authorId : value.author.id}
                mode={mode}
              />
            </motion.li>
          ))
          : null}
      </Ul>
    </AnimatePresence>
  );
};

export default ChartUl;
