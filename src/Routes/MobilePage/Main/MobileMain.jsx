import styled from 'styled-components';
import px2vhMobile from '../../util/px2vhMobile';
import MobileFooter from '../components/MobileFooter';
import MobileHeader from '../components/MobileHeader';
import ArtistMarquee from './components/ArtistMarquee';
import MediaArt from './components/MediaArt';
import Top10 from './components/Top10';
import KaKaoBtn from '../../Components/KaKaoBtn';

const Div = styled.div`
  min-height: 100vh;
  > .head {
    width: 100vw;
    height: ${px2vhMobile(708)};
    background-image: url('/img/mobile-banner.png');
    background-size: cover;
    margin-bottom: ${px2vhMobile(120)};
  }
`;

const MobileMain = () => {
  return (
    <>
      <Div>
        {/* <KaKaoBtn mobile={true}/> */}
        <MobileHeader />
        <div className="head"></div>
        <Top10 />
        <MediaArt />
        <ArtistMarquee />
      </Div>
      <MobileFooter toTop />
    </>
  );
};

export default MobileMain;
