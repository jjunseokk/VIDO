import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import px2vhMobile from '../../util/px2vhMobile';
import px2vwMobile from '../../util/px2vwMobile';
import MobileFooter from '../components/MobileFooter';
import MobileHeader from '../components/MobileHeader';

const Div = styled.div`
  height: 100vh;
  .vid {
    position: relative;
    video {
      width: 100vw;
      display: block;
    }
    .cover {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%;
      background-color: #2b2b2b;
      opacity: 0.8;
    }
    > h1 {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      font: 600 18px ${({ theme }) => theme.noto};
      transform: translate(-50%, -50%);
      word-break: keep-all;
      color: #fff;
      width: 70%;
      > span {
        color: #5c94ff;
      }
    }
  }
  > button {
    background-color: ${({ theme }) => theme.highlightColor};
    letter-spacing: -1px;
    width: 300px;
    height: 36px;
    border-radius: 18px;
    display: block;
    color: #fff;
    font: 400 21px ${({ theme }) => theme.noto};
    margin: 0 auto;
  }
  > .email {
    width: 300px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    padding: 12px;
    margin: ${px2vhMobile(36)} auto;
    > h1 {
      width: 100%;
      text-align: center;
      font: 500 18px ${({ theme }) => theme.noto};
      margin-bottom: 12px;
    }
    > p {
      font: 400 16px ${({ theme }) => theme.noto};
      text-align: center;
      margin-bottom: 12px;
    }
    > button {
      font: 400 16px ${({ theme }) => theme.noto};
      width: 100%;
      background-color: #e0e0e0;
      height: 32px;
    }
  }
  > footer {
    bottom: 0;
    position: absolute;
  }
`;

const MobileHome = () => {
  const navigate = useNavigate();
  return (
    <Div>
      <MobileHeader />
      <div className="vid">
        <video src="./img/vido-pr.mp4" muted loop autoPlay playsInline />
        <div className="cover"></div>
        <h1>
          국내 최대 미디어아트 OTT 플랫폼 VIDO에서는
          <span> 미디어아트</span>를 <span>구독</span>
          하고,
          <span>전시</span>할 수 있습니다.
        </h1>
      </div>
      <div className="email">
        <h1>VIDO 문의</h1>
        <p>vidogallery@gmail.com</p>
        <button
          onClick={() => {
            navigator.clipboard.writeText('vidogallery@gmail.com');
          }}
        >
          메일 주소 복사
        </button>
      </div>
      <button onClick={() => navigate('/main')}>VIDO 모바일로 이동하기</button>
      <MobileFooter />
    </Div>
  );
};

export default MobileHome;
