import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from 'react';
import styles from './MyArt.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../ContextProvider';
import AxiosConfig from '../../../AxiosConfig';
import MediaListPagination from '../../Components/MediaListPagination';
import { motion, AnimatePresence } from 'framer-motion';
import SquareBtn from '../../Components/SquareBtn';
import ErrorPopup from '../../Components/ErrorPopup';
import ManageCrop from './ManageCrop';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';
import UploadPopup from './UploadPopup';
import EditArt from './EditArt';
import RejectPopup from './RejectPopup';
import { MyArtStyle } from './MyArtStyle';
import { useTranslation } from "react-i18next";
import RenderPagination from '../../Components/RenderPagination';

const MyArt = ({ mode }) => {
  //editart
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { serverAddress } = useContext(UserContext);
  const [checkedList, setCheckedList] = useState([]);
  const [checkLength, setCheckLength] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  const [editId, setEditId] = useState(0);
  const [artApproved, setApproved] = useState(0);
  const [artData, setArtData] = useState([]);
  const [artPage, setArtPage] = useState(['']);
  const [wholePage, setWholePage] = useState(0);
  const [uploadArtPopup, setUploadArtPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [editArtPopup, setEditArtPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorPopup, setErrorPopup] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [cropPopup, setCropPopup] = useState(false);
  const tbody = useRef(null);
  const pageElement = 6;
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  const reduceStr = (str, len) => {
    if (screenSize.dynamicWidth > 1600) {
      return str?.length > len ? str.slice(0, len - 3) + '...' : str;
    }
    if (screenSize.dynamicWidth > 1400) {
      return str?.length > len - len / 10
        ? str?.slice(0, len - len / 10 - 3) + '...'
        : str;
    }
    if (screenSize.dynamicWidth > 1200) {
      return str?.length > len - 25 ? str.slice(0, len - 28) + '...' : str;
    }
    if (screenSize.dynamicWidth > 100) {
      return str?.length > len - len * 0.8
        ? str?.slice(0, len - len * 0.8 - 3) + '...'
        : str;
    }
  };
  const getCheckboxLength = (arr) => {
    let i = 0;
    arr.map((value) => (!value.removedDatetime ? i++ : i));
    return i;
  };
  useEffect(() => {
    setLoading(true);
    async function myPgInfo() {
      try {
        const res = await AxiosConfig.get(`user/art?p=${page}`);
        if (res.status === 200) {
          if (res.data.statusCode === 200) {
            const data = res.data.result.data;
            setWholePage(res.data.result.totalPage);
            setArtPage(data)
            // let pgNum = parseInt(data.length / 6);
            // data.length % 6 === 0
            //   ? setWholePage(pgNum + 1)
            //   : setWholePage(pgNum + 2);
            setArtData(data); //TODO splice 지우기
            setCheckLength(() => getCheckboxLength(res?.data?.result.data));
          } else if (res.data.statusCode === 103) {
            null;
          } else if (res.data.statusCode == 104) {
            window.location.reload();
          } else {
            setErrorPopup(true);
            setApiError('미디어 아트 불러오기');
            setErrorMessage(res.data.statusCode);
          }
        } else {
          navigate('/404');
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    }
    myPgInfo();
  }, [page]);
  async function myPgInfo() {
    try {
      const res = await AxiosConfig.get(`user/art`);
      const data = res.data.result;
      let pgNum = parseInt(data.length / 6);
      data.length % 6 === 0 ? setWholePage(pgNum + 1) : setWholePage(pgNum + 2);
      setArtData(data); //TODO splice 지우기
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }
  // useEffect(() => {
  //   const getPages = (data) => {
  //     let ogArr = [...data];
  //     let parentArr = [];
  //     for (let i = 0; i < data.length; i += pageElement) {
  //       let tempArr = [];
  //       tempArr = ogArr.splice(0, pageElement);
  //       parentArr.push(tempArr);
  //     }
  //     setArtPage(parentArr);
  //   };
  //   artData[0] ? getPages(artData) : null;
  // }, [artData]);
  const onCheckAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArr = [];
        artData.forEach((value) => {
          if (!value.removedDatetime) {
            checkedListArr.push(value.id);
          }
        });
        setCheckedList(checkedListArr);
      } else {
        setCheckedList([]);
      }
    },
    [artData]
  );

  const onChecked = useCallback(
    (checked, id) => {
      if (checked) {
        setCheckedList([...checkedList, id]);
      } else {
        setCheckedList(checkedList.filter((el) => el !== id));
      }
    },
    [checkedList]
  );

  const showCheckBox = (index) => {
    artPage.map((value, i) => 
      tbody.current.children[i].children[6].children[1]
        ? (tbody.current.children[i].children[6].children[1].style.display =
          'none')
        : null
    );
    if (index >= 0) {
      tbody.current.children[index].children[6].children[1].style.display =
        'block';
    }
  };
  const handleDeleteArt = (id) => {
    setDeletePopup(true);
    setDeleteId(id);
  };

  const getRejectReason = (id) => {
    setEditId(id);
    AxiosConfig.get(`user/art/${id}/reason`).then((res) => {
      if (res.data.statusCode === 200) {
        setRejectReason(res.data.result.rejectedReason);
        setRejectPopup(true);
      } else {
        setErrorPopup(true);
        setApiError('미디어 아트 거절 사유 불러오기');
        setErrorMessage(res.data.statusCode);
      }
    });
  };
  return (
    <>
      <AnimatePresence>
        {
          editArtPopup ? (
            <EditArt
              myPgInfo={myPgInfo}
              id={editId}
              approved={artApproved}
              setPopup={setEditArtPopup}
            />
          ) : null
          // <EditArtPopup

          //   userType={userContext.userType.id}
          //   nickname={userContext.nickName}
          //   id={editId}
          //   setEditPopup={setEditArtPopup}
          //   myPgInfo={myPgInfo}
          // />
        }
        {errorPopup ? (
          <ErrorPopup
            errorMessage={apiError}
            message={errorMessage}
            setErrorPopup={setErrorPopup}
          />
        ) : null}
        {cropPopup ? <ManageCrop setPopup={setCropPopup} /> : null}
        {rejectPopup ? (
          <RejectPopup
            id={editId}
            approved={artApproved}
            rejectReason={rejectReason}
            setPopup={setRejectPopup}
            setEditPopup={setEditArtPopup}
          />
        ) : null}

        {deletePopup ? (
          <motion.div
            variants={FramerMotionAnimate[0]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
            className={styles.deletePopup}
          >
            <div onClick={() => setDeletePopup(false)}></div>
            <motion.div
              variants={FramerMotionAnimate[2]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition="transition"
            >
              <button onClick={() => setDeletePopup(false)}>
                {/* <CloseSmall /> */}
              </button>
              {Array.isArray(deleteId) ? (
                <p>
                  {deleteId.length}개의 미디어아트를
                  <br />
                  정말로 삭제하시겠습니까?
                </p>
              ) : (
                <p>정말로 삭제하시겠습니까?</p>
              )}
              <SquareBtn
                context={t("common.cancel")}
                width="138px"
                onClick={() => setDeletePopup(false)}
              />
              <SquareBtn
                context={t("common.done")}
                onClick={() => {
                  if (Array.isArray(deleteId)) {
                    deleteId.map((value) => {
                      AxiosConfig.delete(`user/art/${value}`).then((res) => {
                        myPgInfo();
                      });
                    });
                  } else {
                    AxiosConfig.delete(`user/art/${deleteId}`).then((res) => {
                      myPgInfo();
                    });
                  }
                  setDeletePopup(false);
                  setCheckedList([]);
                }}
                hoverColor="#f0f0f0"
                bgColor="#F7F7F7"
                color="#002E85"
                width="138px"
              />
            </motion.div>
          </motion.div>
        ) : null}
        {uploadArtPopup ? (
          <UploadPopup
            setUploadArtPopup={setUploadArtPopup}
            myPgInfo={myPgInfo}
          // userType={userData.userType.id}
          />
        ) : null}
      </AnimatePresence>
      <div className={styles.scrollWrap}>
        <MyArtStyle mode={mode}>
          <button onClick={() => setUploadArtPopup(true)}>
            {t("mypage.media_art.upload.title")}
          </button>
          {/* <button onClick={() => setCropPopup(true)}>
            {t("mypage.media_art.crop_control.title")}
          </button> */}
          {/* <ul>
            <li onClick={() => handleDeleteArt(checkedList)}>선택삭제</li>
            <li>
              <InputCheckbox
                size={12}
                id={'all'}
                onChange={(e) => onCheckAll(e.target.checked)}
                checked={
                  checkedList.length == 0
                    ? false
                    : checkedList.length === checkLength
                    ? true
                    : false
                }
              />
            </li>
          </ul> */}
          <AnimatePresence>
            <table cellPadding="0" cellSpacing="0">
              <thead style={{ background: mode == 'light' ? '#ffff' : '#151515' }}>
                <tr>
                  <td>{t("common.num")}</td>
                  <td>{t("mypage.media_art.thumbnail")}</td>
                  <td>{t("mypage.media_art.title_description")}</td>
                  <td>{t("mypage.media_art.count")}</td>
                  <td>{t("mypage.media_art.down")}</td>
                  <td>{t("mypage.media_art.is_approved")}</td>
                  {/* <td>{t("mypage.media_art.request")}</td> */}
                  {/* <td>삭제</td> */}
                  <td>&nbsp;</td>
                </tr>
              </thead>
              <tbody ref={tbody} >
                {artPage
                  ? artPage?.map((value, index) => {
                    
                    return (
                      <motion.tr
                        variants={FramerMotionAnimate[0]}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition="transition"
                        key={value.id}
                        className={
                          value.removedDatetime ? styles.removed : null
                        }
                      >
                        <td style={{ color: mode == 'light' ? '#151515' : '#707070' }}>{value.id}</td>
                        <td
                          onClick={() => {
                            if (!value.removedDatetime) {
                              setEditId(value.id);
                              setApproved(value.isApproved);
                              setEditArtPopup(true);
                            }
                          }}
                        >
                          <img
                            src={serverAddress + value.thumbnailPath}
                            alt={value.title}
                          />
                        </td>
                        <td
                          onClick={() => {
                            if (!value.removedDatetime) {
                              setEditId(value.id);
                              setApproved(value.isApproved);
                              setEditArtPopup(true);
                            }
                          }}

                        >
                          <p style={{ color: mode == 'light' ? '#151515' : '#707070' }}>{reduceStr(value.title, 46)}</p>
                          <p style={{ color: mode == 'light' ? '#151515' : '#707070' }}>{reduceStr(value.title, 60)}</p>
                        </td>
                        <td style={{ color: mode == 'light' ? '#151515' : '#707070' }}>
                          {value.views
                            ? value.views.toLocaleString()
                            : '-'}
                        </td>
                        <td style={{ color: mode == 'light' ? '#151515' : '#707070' }}>
                          {value.downloadCount === 0? "-" : value.downloadCount}
                        </td>
                        <td>
                          {value.isApproved === true ? (
                            <span style={{ color: '#002E85' }}>{t("mypage.media_art.approved")}</span>
                          ) : value.isApproved === false ? (
                            <span
                              onClick={() => getRejectReason(value.id)}
                              style={{
                                color: '#D00000',
                                textDecoration: 'underline',
                              }}
                            >
                              {t("mypage.media_art.reject")}
                            </span>
                          ) : (
                            <span style={{ color: '#707070' }}>{t("mypage.media_art.ing")}</span>
                          )}
                        </td>
                        <td>
                          {value.removedDatetime ? (
                            <span></span>
                          ) : (
                            <>
                              <img
                                src="/img/dotMenu.svg"
                                onClick={() => showCheckBox(index)}
                              />
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="popup"
                                style={{ display: 'none' }}
                              >
                                <div onClick={() => showCheckBox(-1)}></div>
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  onClick={() => {
                                    setEditId(value.id);
                                    setApproved(value.isApproved);
                                    setEditArtPopup(true);
                                  }}
                                >
                                  {t("mypage.media_art.edit")}
                                </motion.span>
                                {/* {value.isApproved ? (
                                  <span>
                                    <Link to={'crop/' + value.id}>{t("mypage.media_art.crop_btn")}</Link>
                                  </span>
                                ) : null} */}
                                {/* <span
                                    onClick={() => handleDeleteArt(value.id)}
                                  >
                                    삭제
                                  </span> */}
                              </motion.div>
                            </>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })
                  : null}
              </tbody>
            </table>
          </AnimatePresence>
          <div>
            {wholePage > 1 ? (
              <RenderPagination mode={mode} totalPage={wholePage} setPage={setPage} page={page} />
            ) : null}
          </div>
        </MyArtStyle>
      </div>
    </>
  );
};

export default MyArt;
