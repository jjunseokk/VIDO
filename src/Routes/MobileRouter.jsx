import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme from './util/Theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './util/GlobalStyle';
import ScrollToTop from '../ScrollToTop';
import ContextProvider from './ContextProvider';
import MobileHome from './MobilePage/Home/MobileHome';
import MobileMain from './MobilePage/Main/MobileMain';
import MediaArtPage from './MobilePage/MediaArt/MediaArtPage';
import MediaArtSingle from './MobilePage/MediaArt/MediaArtSingle';
import ArtistPage from './MobilePage/Artist/ArtistPage';
import ArtistSingle from './MobilePage/Artist/ArtistSingle';
import MobilePageAnimate from './MobilePage/MobilePageAnimate';

const MobileRouter = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ScrollToTop />
        <ContextProvider>
          <Routes>
            <Route path="/" element={<MobilePageAnimate />} />
            <Route path="/main" element={<MobileMain />} />
            <Route path="/media-art" element={<MediaArtPage />} />
            <Route path="/media-art/detail/:id" element={<MediaArtSingle />} />
            <Route path="/author" element={<ArtistPage />} />
            <Route path="/author/detail/:id" element={<ArtistSingle />} />
          </Routes>
        </ContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default MobileRouter;
