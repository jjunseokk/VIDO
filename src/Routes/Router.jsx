import { React, useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  useMatch,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { errorState, loginState } from './util/recoilState';

import theme from './util/Theme';
// import AdminPageRoutes from './AdminPageRoutes';
import MainPage from './MainPage/MainPage';
import MediaArtPage from './MediaArtPage/MediaArtPage';
import MediaArtSearchPage from './MediaArtPage/MediaArtSearchPage';
import AuthorMainPage from './AuthorPage/AuthorMainPage';
import SubscribePage from './MainMenu/SubscribePage';
import SearchMain from './MainPage/SearchMain';
import ContextProvider from './ContextProvider';
import AuthorSinglePage from './AuthorPage/AuthorSinglePage';
import AuthorSearchPage from './AuthorPage/AuthorSearchPage';
import Header from './Components/Header';
import EditorPickSinglePage from './EditorPick/EditorPickSinglePage';
import NotFoundPage from './MainPage/NotFoundPage';
import ScrollToTop from '../ScrollToTop';
import MyPage from './MyPage/MyPage';
import MyArt from './MyPage/components/MyArt';
import AuthRoute from './AuthRoute';
import PaymentPage from './MyPage/PaymentPage';
import UserDashboard from './MyPage/UserDashboard';
import FindIdPage from './RegisterPage/FindIdPage';
import FindPwPage from './RegisterPage/FindPwPage';
import FoundIdPage from './RegisterPage/FoundIdPage';
import FoundPwPage from './RegisterPage/FoundPwPage';
import LoginPage from './RegisterPage/LoginPage';
import NoneAuthRoute from './NoneAuthRoute';
import ErrorPopup from './Components/ErrorPopup';
import SignupPage from './RegisterPage/SignupPage';
import TermsOfConditionPagePerson from './RegisterPage/TermsOfConditionPagePerson';
import TermsOfConditionPageComp from './RegisterPage/TermsOfConditionPageComp';
import InfoRegisterPage from './RegisterPage/InfoRegisterPage';
import RegisterDonePage from './RegisterPage/RegisterDonePage';
import { isMobile } from 'react-device-detect';
import MobilePage from './MobilePage/MobilePage';
import GlobalStyle from './util/GlobalStyle';
import CropPage from './MyPage/CropPage';
import InfoPage from './MyPage/InfoPage';
import ArtDetail from './MediaArtPage/ArtDetail';
import CollectorPage from './CollectorPage/CollectorPage';
import FAQPage from './FAQPage/FAQPage';
import ArtMainPage from './MediaArtPage/ArtMainPage';
import MediaArtListPage from './MediaArtPage/MediaArtListPage';
import TaggedArtPage from './MediaArtPage/TaggedArtPage';
import MobilePageAnimate from './MobilePage/MobilePageAnimate';
import AboutAnimate from './AboutPage/AboutAnimate';
import CropPopup from './MyPage/components/CropPopup';
import ClientPwPage from './ClientPage/ClientPwPage';
import ReportPage from "./ReportPage/ReportPage";

const Router = () => {
  // const { loginState, isAdmin } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useRecoilState(loginState);
  const error = useRecoilValue(errorState);
  const [mode, setMode] = useState('light');



  const getMode = (boolean) => {
    console.log(boolean);
    setMode(boolean == false ? "dark" : "light");
  }
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          {isMobile ? null : (
            <>
              <ScrollToTop />
              <ContextProvider>
                {error.popup ? (
                  <ErrorPopup errorMessage={error.errorMessage} />
                ) : null}
                <Routes>
                  <Route
                    path="/cropPreview/:id/:info"
                    element={<CropPopup />}
                  />
                  <Route
                    path="/"
                    element={
                      <Header mode={getMode} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    }
                  >
                    <Route path="" element={<MainPage mode={mode} />} />
                    {/* <Route
                      path="/media-art/:orderId/:id"
                      element={<MediaArtPage />}
                    /> */}
                    <Route path="/media-art" element={<ArtMainPage mode={mode} />} />
                    <Route
                      path="/media-art/total/:orderId/:id"
                      element={<MediaArtListPage mode={mode} />}
                    />
                    <Route path="/media-art/tag" element={<TaggedArtPage mode={mode} />} />
                    <Route path="/about" element={<AboutAnimate mode={mode} />} />
                    <Route path="/FaQ" element={<FAQPage mode={mode} />} />
                    {/* <Route path="/vido-chart" element={<VidoChartPage />} /> */}
                    <Route
                      path="/editor-pick-detail/:id"
                      element={<EditorPickSinglePage mode={mode} />}
                    />
                    <Route path="/author" element={<AuthorMainPage mode={mode} />} />
                    <Route
                      path="/author/:orderId/:id"
                      element={<AuthorMainPage mode={mode} />}
                    />
                    <Route
                      path="/author/detail/:id"
                      element={<AuthorSinglePage mode={mode} />}
                    />
                    <Route
                      path="/author/search/:searchId/:id"
                      element={<AuthorSearchPage mode={mode} />}
                    />
                    <Route path="/subscription" element={<SubscribePage mode={mode} />} />
                    <Route
                      path="/media-art/search/:searchId/:id"
                      element={<MediaArtSearchPage mode={mode} />}
                    />
                    <Route
                      path="/search/:searchId/:authorId/:artId"
                      element={<SearchMain mode={mode} />}
                    />

                    <Route
                      path="media-art/detail/:id"
                      element={<ArtDetail mode={mode} />}
                    />
                    <Route path="/subscription" element={<SubscribePage mode={mode} />} />
                    <Route path="/collector" element={<CollectorPage mode={mode} />} />
                    <Route path={"/report"} element={<ReportPage mode={mode} />} />
                  </Route>
                  <Route
                    path="/myPage/"
                    element={<AuthRoute authenticated={loggedIn} mode={mode} />}
                  >
                    <Route
                      path="/myPage/"
                      element={
                        <Header mode={getMode}  loggedIn={loggedIn} setLoggedIn={setLoggedIn}  />
                      }
                    >
                      <Route path="/myPage/" element={<MyPage mode={mode} />}>
                        <Route index element={<InfoPage mode={mode} />} />
                        {/* <Route path="pwchange" element={<MyInfo />} /> */}
                        <Route path="myart" element={<MyArt mode={mode} />} />
                        <Route path="myart/crop/:id" element={<CropPage mode={mode} />} />
                        <Route path="DashBoard" element={<UserDashboard mode={mode} />} />
                        <Route path="Payment" element={<PaymentPage mode={mode} />} />
                      </Route>
                    </Route>
                  </Route>
                  <Route
                    path="/login"
                    element={
                      <Header mode={getMode} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    }
                  >
                    <Route
                      path="/login"
                      element={<NoneAuthRoute authenticated={loggedIn} mode={mode} />}
                    >
                      <Route path="" element={<LoginPage mode={mode} />} />
                      <Route path="find-id" element={<FindIdPage mode={mode} />} />
                      <Route path="/login/find-pw" element={<FindPwPage mode={mode} />} />
                      <Route path="found-id" element={<FoundIdPage mode={mode} />} />
                      <Route path="found-pw" element={<FoundPwPage mode={mode} />} />
                    </Route>
                  </Route>
                  <Route
                    path="/signup"
                    element={
                      <Header mode={getMode} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    }
                  >
                    <Route
                      path="/signup"
                      element={<NoneAuthRoute authenticated={loggedIn} mode={mode} />}
                    >
                      <Route path="" element={<SignupPage mode={mode} />} />
                      <Route
                        path="terms-and-conditions-pers"
                        element={<TermsOfConditionPagePerson mode={mode} />}
                      />
                      <Route
                        path="terms-and-conditions-comp"
                        element={<TermsOfConditionPageComp mode={mode} />}
                      />
                      <Route
                        path="infoRegister"
                        element={<InfoRegisterPage mode={mode} />}
                      />
                      <Route
                        path="registerDone"
                        element={<RegisterDonePage mode={mode} />}
                      />
                    </Route>
                  </Route>
                  <Route
                    path="/client-pw-change-page"
                    element={<ClientPwPage mode={mode} />}
                  />
                  <Route path="/*" element={<NotFoundPage mode={mode} />} />
                </Routes>
              </ContextProvider>
            </>
          )}
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default Router;
