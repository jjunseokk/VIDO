import React, { useState, useEffect, useContext, useMemo } from 'react';
import styles from './ManageCrop.module.scss';
import { UserContext } from '../../ContextProvider';
import CloseSmall from '../../Components/CloseSmall';
import OpenMenuSvg from '../../Components/OpenMenuSvg';
import OrderTriangle from './OrderTriangle';
import InputCheckbox from '../../Components/InputCheckbox';
import CropRow from './CropRow';
import MediaListPagination from '../../Components/MediaListPagination';
import AxiosConfig from '../../../AxiosConfig';
import ErrorPopup from '../../Components/ErrorPopup';
import { AnimatePresence, motion } from 'framer-motion';
import SquareBtn from '../../Components/SquareBtn';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';
import CloseBig from '../../Components/CloseBig';
import { useQuery } from 'react-query';
import { getCropList, getResList } from '../../util/userInfoGet';
import sortDate from '../../util/sortDate';
import CropRejectPopup from './CropRejectPopup';
import { ManageCropStyle } from './ManageCropStyle';
import { pagination } from '../../util/pagination';
import RejectPopup from './RejectPopup';
import { useTranslation } from 'react-i18next';

const ManageCrop = ({ setPopup }) => {
  const { t } = useTranslation();

  const [cropData, setCropData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageList, setPageList] = useState([]);
  const [wholePage, setWholePage] = useState(1);
  const [checkedList, setCheckedList] = useState([]);
  const [showRatioSelect, setShowRatioSelect] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState({
    display: '전체보기',
  });
  const [orderBy, setOrderBy] = useState(true);
  const [order, setOrder] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);
  const [rejectData, setRejectData] = useState(null);
  const [errorPopup, setErrorPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rejectId, setRejectId] = useState(0);

  const resList = useQuery('resList', getResList);
  console.log(resList);

  const { data, status, refetch } = useQuery('cropList', getCropList);
  const getCropData = () => {
    AxiosConfig.get(`user/art/crop`).then((res) => {
      if (res.data.statusCode === 200) {
        setCropData(res.data.result);
      } else {
        setApiError('크롭 불러오기');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
    });
  };
  useMemo(() => {
    if (status == 'success' && data) {
      setCropData(data);
    }
  }, [status, data]);
  useEffect(() => {
    if (data) {
      let tempArr = data;
      if (selectedRatio.display == '전체보기') {
        setCropData(tempArr);
      } else {
        tempArr.filter(
          (el) => el.resolution.resolutionId == selectedRatio.resolutionId
        );
        console.log(tempArr);
        console.log(selectedRatio.resolutionId);
        setCropData(
          tempArr.filter(
            (el) => el.resolution.resolutionId == selectedRatio.resolutionId
          )
        );
      }
    }
  }, [selectedRatio]);

  useEffect(() => {
    if (Array.isArray(cropData)) {
      setPage(1);
      pagination(cropData, setPageList, setWholePage, 6);
    }
  }, [cropData]);

  const getRejectReason = (id) => {
    AxiosConfig.get(`/user/art/crop/${id}/reason`).then((res) => {
      if (res.data.statusCode === 200) {
        setRejectId(id);
        setRejectData(res.data.result);
        setRejectPopup(true);
      }
    });
  };
  const handleChecked = (id, checked) => {
    if (checked === true) {
      setCheckedList([...checkedList, id]);
    } else {
      let tempArr = checkedList;
      setCheckedList(tempArr.filter((el) => el != id));
    }
  };

  const handleCheckAll = (checked) => {
    if (checked == true) {
      setCheckedList(() => {
        let newArr = [];
        pageList[page - 1].filter((el) => {
          if (el.removedDateTime == null && el.mediaArtRemovedDatetime == null)
            newArr.push(el.compatibilityId);
        });
        return newArr;
      });
    } else {
      setCheckedList([]);
    }
  };
  const sortByDate = (sort) => {
    setOrderBy(sort);
    let tempArr = cropData;
    let arr = sortDate(tempArr, '-');
    sort ? setCropData(arr) : setCropData(arr.reverse());
  };
  const sortByApproval = (sort) => {
    setOrder(sort);
    let tempArr = cropData;
    tempArr.sort((a, b) => {
      a = a.isApproved;
      b = b.isApproved;
      if (a == true) {
        if (b == null || false) {
          return 1;
        } else {
          return 0;
        }
      } else if (a == null) {
        if (b == true) {
          return -1;
        } else if (b == null) {
          return 0;
        } else {
          return 1;
        }
      } else if (a == false) {
        if (b == null || true) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    sort ? setCropData(tempArr) : setCropData(tempArr.reverse());
  };
  const deleteCrop = () => {
    checkedList.map((id) => {
      if (Array.isArray(id)) {
        id.map((value) =>
          AxiosConfig.delete(`/user/art/resolution/${value}`).then((res) => {
            setDeletePopup(false);
            if (res.data.statusCode != 200) {
              setApiError('크롭 삭제');
              setErrorMessage(res.data.statusCode);
              setErrorPopup(true);
            } else {
              refetch();
              setCheckedList([]);
            }
          })
        );
      }
      AxiosConfig.delete(`/user/art/resolution/${id}`).then((res) => {
        setDeletePopup(false);

        if (res.data.statusCode === 200) {
          console.log(res);
          getCropData();
        }
      });
    });
  };
  if (status == 'success' && cropData)
    return (
      <>
        <AnimatePresence>
          {rejectPopup ? (
            <RejectPopup
              rejectReason={rejectData.rejectedReason}
              setPopup={setRejectPopup}
              // rejectId={rejectId}
              getCropData={getCropData}
            />
          ) : null}
          {errorPopup ? (
            <ErrorPopup
              context={apiError}
              errorMessage={errorMessage}
              setErrorPopup={setErrorPopup}
            />
          ) : null}
          {deletePopup ? (
            <div className={styles.deletePopup}>
              <div></div>
              <div>
                <button onClick={() => setDeletePopup(false)}>
                  <CloseSmall />
                </button>
                <p>{checkedList.length}개의 크롭을 삭제 하겠습니까?</p>
                <SquareBtn
                  context="예"
                  hoverColor="#f0f0f0"
                  bgColor="#e0e0e0"
                  color="#707070"
                  width="138px"
                  onClick={deleteCrop}
                />
                <SquareBtn
                  context="아니오"
                  onClick={() => setDeletePopup(false)}
                  width="138px"
                />
              </div>
            </div>
          ) : null}
        </AnimatePresence>
        <ManageCropStyle
          variants={FramerMotionAnimate[3]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition="transition"
        >
          <div className="modal"></div>
          <div className="popup">
            <button onClick={() => setPopup(false)}>
              {/* <CloseSmall /> */}
              <CloseBig />
            </button>
            <div>
              <h1>{t("mypage.media_art.crop_control.title")}</h1>
              <div>
                <div>
                  <button onClick={() => setShowRatioSelect((prev) => !prev)}>
                    {selectedRatio.display}
                    <OpenMenuSvg />
                  </button>
                  <AnimatePresence>
                    {showRatioSelect ? (
                      <motion.ul
                        layout
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <li
                          onClick={() => {
                            setSelectedRatio({
                              display: '전체보기',
                            });
                            setShowRatioSelect(false);
                          }}
                        >
                          전체보기
                        </li>
                        
                        {resList
                          ? resList?.data.map((value, idx) => (
                              <li
                                key={value.resolutionId}
                                onClick={() => {
                                  setSelectedRatio({
                                    ...value,
                                    display:
                                      value.resolution.horizontal +
                                      ' : ' +
                                      value.resolution.vertical,
                                  });
                                  setShowRatioSelect(false);
                                }}
                              >
                                {value.resolution.horizontal} :{' '}
                                {value.resolution.vertical}
                              </li>
                            ))
                          : null}
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>
                </div>
                {/* <button onClick={() => setDeletePopup(true)}>선택 삭제</button> */}
                {/* <div className="checkbox">
                  <InputCheckbox
                    size={12}
                    checked={
                      Array.isArray(pageList[page])
                        ? checkedList.length ===
                          pageList[page - 1].filter((el) => {
                            return (
                              el.removedDateTime == null &&
                              el.mediaArtRemovedDatetime == null
                            );
                          }).length
                        : null
                    }
                    onChange={(e) => handleCheckAll(e.target.checked)}
                  />
                </div> */}
              </div>
            </div>
            <div className="table">
              <div className="head row">
                <div>
                  <p>번호</p>
                </div>
                <div>
                  <p>썸네일</p>
                </div>
                <div>
                  <p>제목 / 설명</p>
                </div>
                <div>
                  <p
                    className={styles.click}
                    onClick={() => sortByDate(!orderBy)}
                  >
                    등록일자
                    <span className={orderBy ? null : styles.rotate}>
                      {/* <OrderTriangle /> */}
                    </span>
                  </p>
                </div>
                <div>
                  <p>비율</p>
                </div>
                <div>
                  <p
                    className={styles.click}
                    onClick={() => sortByApproval(!order)}
                  >
                    승인여부
                    <span className={order ? null : styles.rotate}>
                      {/* <OrderTriangle /> */}
                    </span>
                  </p>
                </div>
                {/* <div>삭제</div> */}
              </div>
              <div className="body">
                {Array.isArray(pageList[page - 1])
                  ? pageList[page - 1].map((value) => (
                      <CropRow
                        setRejectId={setRejectId}
                        value={value}
                        key={value.compatibilityId}
                        getRejectReason={getRejectReason}
                        handleChecked={handleChecked}
                        checkedList={checkedList}
                        filter={selectedRatio}
                      />
                    ))
                  : null}
              </div>
              {wholePage > 1 ? (
                <MediaListPagination
                  setPage={setPage}
                  page={page}
                  wholePage={wholePage}
                />
              ) : null}
            </div>
          </div>
        </ManageCropStyle>
      </>
    );
};

export default ManageCrop;
