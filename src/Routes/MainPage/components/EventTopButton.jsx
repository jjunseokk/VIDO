import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';

const Div = styled.div`
        right: 15%;
        bottom: 13%;
        position: fixed;
        display: block;
        width: ${px2vw(120)};
        max-width: 120px;
        height: ${px2vw(80)};
        max-height: 80px;
        background-color: #FFFFFF;
        z-index: 99;
        box-shadow: 0px 0px 12px #00000041;
        border-radius: 6px;
        opacity: 0.8;

        img {
            display: block;
            margin: 0 auto;
        }
    
        img.text {
            width: ${px2vw(90)};
            max-width: 90px;
            margin-top: ${px2vw(10)};
        }
        img.arrow {
            width: ${px2vw(18)};
            max-width: 18px;
            margin-top: ${px2vw(5)};
        }
    `;

const EventTopButton = () => {

    const showXpace = () => {
        location.href="https://vido.gallery/xpace/1?isFromLink=true";
    }

    return (
        <Div>
            <div className='top-btn-container' onClick={showXpace}>
                <img className="text" title="text" src="/img/xpace/Xpace_text.png" />
                <img className="arrow" title="arrow" src="/img/xpace/Xpace_arrow.svg" />
            </div>
        </Div>
    )
}

export default EventTopButton;