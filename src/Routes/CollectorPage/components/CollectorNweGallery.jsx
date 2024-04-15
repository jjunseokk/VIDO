import "./collectorNewGallery.scss";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import px2vw from '../../util/px2vw';
import styled from "styled-components";
import { i18n } from "../../../language/i18n";


const Div = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: ${px2vw(12)};
    margin: auto;
    max-width: 100vw;
  }
  .marquee {
    display: flex;
    overflow: hidden;
    user-select: none;
    gap: ${px2vw(12)};
 
    .marquee__group {
        gap: ${px2vw(12)};
        animation-play-state: ${({ hover }) => (hover == true ? 'paused' : null)};
    }
    .el{
        width: ${px2vw(480)};
        height: ${px2vw(270)};
        overflow: hidden;
        position: relative;
        cursor: pointer;
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
        img {
            display: grid;
            place-items: center;
            width: ${px2vw(480)};
            height: ${px2vw(270)};
            aspect-ratio: 16/9;
            transition: ${({ theme }) => theme.transition};
        }
        p{
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
        &:hover{
            &::after {
                opacity: 0.3;
            }
            img{
                transform: scale(1.4);
            }
            p{
                opacity: 1;
            }
        }
    }
    
  }
  .left{
    margin-left: ${px2vw(150)};
    &:last-of-type{
        margin-left: 0px;
    }
  }
`

const CollectorNweGallery = ({ setImgPopup }) => {
    const [shuffled, setShuffled] = useState([]);
    const [getHover, setGetHover] = useState(false);

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
        <Div hover={getHover}>
            <article class="wrapper"
                onMouseEnter={() => { setGetHover(true) }}
                onMouseLeave={() => { setGetHover(false) }}
            >
                <div class="marquee">
                    <div class="marquee__group">
                        {shuffled?.map((value, index) => {
                            return (
                                <div onClick={() => setImgPopup(value.url)} className="el">
                                    <img key={index} src={value.url} alt="" />
                                    <p>{i18n.language !== "ko" ? value.enTitle !== "" ? value.enTitle : value.title : value.title}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div aria-hidden="true" class="marquee__group">
                        {shuffled?.map((value, index) => {
                            return (
                                <div onClick={() => setImgPopup(value.url)} className="el" >
                                    <img key={index} src={value.url} alt="" />
                                    <p>{i18n.language !== "ko" ? value.enTitle !== "" ? value.enTitle : value.title : value.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div class="marquee">
                    <div class="marquee__group left">
                        {shuffled?.reverse().map((value, index) => {
                            return (
                                <div onClick={() => setImgPopup(value.url)} className="el">
                                    <img key={index} src={value.url} alt="" />
                                    <p>{i18n.language !== "ko" ? value.enTitle !== "" ? value.enTitle : value.title : value.title}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div aria-hidden="true" class="marquee__group left">
                        {shuffled?.reverse().map((value, index) => {
                            return (
                                <div onClick={() => setImgPopup(value.url)} className="el">
                                    <img key={index} src={value.url} alt="" />
                                    <p>{i18n.language !== "ko" ? value.enTitle !== "" ? value.enTitle : value.title : value.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </article>
        </Div>
    )
}

export default CollectorNweGallery