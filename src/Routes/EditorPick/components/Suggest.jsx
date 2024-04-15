import React, { useState, useEffect, useContext } from 'react';
import styles from './suggest.module.scss';
import SUGGEST from '../data/SUGGEST.json';
import { UserContext } from '../../ContextProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import AxiosConfig from '../../../AxiosConfig';
import ErrorPopup from '../../Components/ErrorPopup';
import { AnimatePresence, motion } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';

const Suggest = () => {
  const navigate = useNavigate();
  const { serverAddress } = useContext(UserContext);
  const [editorData, setEditorData] = useState([]);
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getEditorPick = () => {
    AxiosConfig(`/art/editorPick`).then((res) => {
      if (res.data.statusCode === 200) {
        setEditorData(res.data.result);
      } else {
        setApiError('에디터픽');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
    });
  };
  useEffect(() => getEditorPick(), []);

  return (
    <>
      {errorPopup ? (
        <ErrorPopup
          context={apiError}
          errorMessage={errorMessage}
          setErrorPopup={setErrorPopup}
        />
      ) : null}
      <AnimatePresence>
        <div className={styles.suggest}>
          <h1>이달의 에디터 추천</h1>

          <motion.ul
            variants={FramerMotionAnimate[0]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
          >
            {editorData.map((value) =>
              value.isShowing ? (
                <li
                  key={value.id}
                  onClick={() =>
                    navigate(`/editor-pick-detail/${value.id}`, {
                      state: {
                        title: value.title,
                      },
                    })
                  }
                >
                  <div>
                    <img src={serverAddress + value.thumbnailPath} />
                  </div>
                  <p>{value.title}</p>
                </li>
              ) : null
            )}
          </motion.ul>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Suggest;
