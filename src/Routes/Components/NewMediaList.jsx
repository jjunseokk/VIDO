import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import FramerMotionAnimate from '../util/FramerMotionAnimate.json';
import ChartElement from './ChartElement';
import { UserContext } from '../ContextProvider';
import px2vw from '../util/px2vw';

const Div = styled.div`
    margin-left: ${({ theme }) => theme.left};
    width: ${({ theme }) => theme.pgWidth};
    height: calc(${px2vw(600)});
    display: flex;
    flex-wrap: wrap;
    gap: ${px2vw(21)};
    @media (max-width: 1220px) {
        height: calc(${px2vw(650)});
    }

    @media (max-width: 824px) {
        height: calc(${px2vw(650)});
    }
`

const NewMediaList = ({ mode, dataList, direction, top10 = false, }) => {
    const { serverAddress } = useContext(UserContext);

    return (
        <Div>
            {Array.isArray(dataList)
                ? dataList.map((value, idx) => (
                    <motion.li
                        variants={FramerMotionAnimate[0]}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition="transition"
                        key={value.id}
                    >
                        {top10 ? <p className="index">{idx + 1}</p> : null}
                        <ChartElement
                            mode={mode}
                            imgsrc={serverAddress + value.thumbnailPath}
                            title={value.title}
                            author={value.author.authorName}
                            id={value.id}
                            authorId={value.author.id}
                            profImg={
                                value.authorProfilePath
                                    ? serverAddress + value.authorProfilePath
                                    : '/img/author-img.png'
                            }
                            imgSize={303}
                        />
                    </motion.li>
                )) : null}
        </Div>
    )
}

export default NewMediaList