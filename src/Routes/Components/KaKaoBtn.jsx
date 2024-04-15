import React from 'react'
import KaKaoImg from '../../../img/question_large_yellow_pc.png';
// import KaKaoImgMobile from '../../../img/kakaotalk_sharing_btn_small.png';
import KaKaoImgMobile from '../../../img/kakaotalk_sharing_btn_small.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const KakaoLink = styled.a`
    position: fixed;
    bottom: ${({ mobile }) => (mobile === true ? '9%' : '50px')};
    right: ${({ mobile }) => (mobile === true ? '7.4%' : '100px')};
    z-index: 999;
    >p{
        position: absolute;
        top: 50%;
        right: 10%;
        transform: translate(-0%, -50%);
        font: 700 20px/20px ${({ theme }) => theme.noto};
    }
`

const KaKaoBtn = ({ mobile }) => {
    const { t } = useTranslation();

    return (
        <KakaoLink mobile={mobile} id="chat-channel-button" href="javascript:chatChannel()">
            <img src={mobile === true ? KaKaoImgMobile : KaKaoImg} alt="카카오톡 채널 채팅하기 버튼" />
        </KakaoLink>
    )
}

export default KaKaoBtn;