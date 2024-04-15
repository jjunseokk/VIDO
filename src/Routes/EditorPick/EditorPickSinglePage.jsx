import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../ContextProvider';
import styles from './EditorPickSinglePage.module.scss';
import { useParams, useLocation } from 'react-router-dom';
import ChartUl from '../Components/ChartUl';
import AxiosConfig from '../../AxiosConfig';
import ErrorPopup from '../Components/ErrorPopup';
import Footer from '../Components/Footer';
import MediaArtListStyle from '../MediaArtPage/MediaArtListStyle';

const EditorPickSinglePage = ({ mode }) => {
  const { state } = useLocation();
  const params = useParams();
  const { serverAddress } = useContext(UserContext);
  const [mediaList, setMediaList] = useState([]);
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getMediaList = () => {
    AxiosConfig(`/art/editorPick/${params.id}/mediaArt`).then((res) => {
      if (res.data.statusCode === 200) {
        setMediaList(res.data.result);
      } else {
        setApiError('에디터 픽');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
    });
  };
  useEffect(() => getMediaList(), []);
  return (
    <div style={{ background: mode == 'light' ? '#ffff' : '#151515' }}>
      {errorPopup ? (
        <ErrorPopup
          context={apiError}
          errorMessage={errorMessage}
          setErrorPopup={setErrorPopup}
        />
      ) : null}
      <div className={mode == 'light' ? styles.EditorPickSinglePage : styles.EditorPickSingleDarkPage}>
        <h1>{state.title}</h1>
        <MediaArtListStyle>
          {mediaList ? <ChartUl mode={mode} chartData={mediaList} /> : null}
        </MediaArtListStyle>
      </div>
      <Footer mode={mode} />
    </div>
  );
};

export default EditorPickSinglePage;
