import React, { useState, useEffect } from 'react';
import CloseBig from '../Components/CloseBig';
import OpenMenuSvg from '../Components/OpenMenuSvg';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorPopup from '../Components/ErrorPopup';
import UserDashboardPaymentStat from './components/UserDashboardPaymentStat';
import UserDashBoardArtStat from './components/UserDashBoardArtStat';
import AxiosConfig from '../../AxiosConfig';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../util/recoilState';
import { UserDashboardStyle } from './UserDashboardStyle';
import { useTranslation } from "react-i18next";
import UserDashBoardSummary from './components/UserDashBoardSummary';
import UserDashBoardRevenueAnalysis from './components/UserDashBoardRevenueAnalysis';

const UserDashboard = ({ mode }) => {
  const { t } = useTranslation();
  const today = new Date();
  const currMonth = today.getMonth() + 1;
  const currYear = today.getFullYear();
  const getRecentYear = () => {
    let arr = [];
    for (let i = 0; i < 13; i++) {
      let mon = currMonth - i > 0 ? currMonth - i : currMonth + 12 - i;
      arr.push(mon);
    }
    return arr;
  };


  const getRecentMonth = (MonthValue) => {
    const recentMonthsArray = [];

    for (let i = 0; i < MonthValue; i++) {


      const month = today.getMonth() - i;
      let year = today.getFullYear();

      if (month < 0) {
        year--;
      }

      const formattedMonth = (month % 12 + 12) % 12 + 1;
      const formattedDate = `${year}-${String(formattedMonth).padStart(2, '0')}`;

      recentMonthsArray.push(formattedDate);
    }
    setStartDate(recentMonthsArray[recentMonthsArray.length - 1]);
    setEndDate(recentMonthsArray[0]);
  }
  const recentY = getRecentYear();

  const [callendarYear, setCallendarYear] = useState(currYear);
  const [selectTerm, setSelectTerm] = useState(t("mypage.dashboard.date.all"));
  const [showSelectTerm, setShowSelectTerm] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCal, setShowCal] = useState(false);
  const [showArtData, setShowArtData] = useState('summary');
  const [startDate, setStartDate] = useState('2022-12');
  const [endDate, setEndDate] = useState('2099-12')
  const [data, setData] = useState(null);
  const [refundData, setRefundData] = useState();
  const [term, setTerm] = useState(recentY);
  const [loading, setLoading] = useState(true);
  let allMonth = [];
  for (let i = 1; i < 13; i++) {
    allMonth.push(i);
  }
  const recentMonth = [
    term[0],
    term[0] - 1 > 0 ? term[0] - 1 : term[0] + 11,
    term[0] - 2 > 0 ? term[0] - 2 : term[0] + 10,
  ];
  const setLogin = useSetRecoilState(loginState);

  const updateTermBasedOnSelectTerm = () => {
    switch (selectTerm) {
      case `${t("mypage.dashboard.date.all")}`:
        setTerm([recentY[0], recentY[recentY.length - 1]]);
        setStartDate('2022-12');
        setEndDate('2099-12');
        break;
      case `${t("mypage.dashboard.date.3month")}`:
        setTerm([recentY[0], recentY[2]]);
        getRecentMonth(3);
        break;
      case `${t("mypage.dashboard.date.6month")}`:
        setTerm([recentY[0], recentY[5]]);
        getRecentMonth(6);
        break;
      case `${currYear}${t("mypage.dashboard.date.year")}`:
        setTerm([currMonth, 1]);
        setStartDate(`${currYear}-01`);
        setEndDate(`${currYear}-12`);
        break;
      case `${currYear - 1}${t("mypage.dashboard.date.year")}`:
        setTerm(
          currMonth == 11 ? [12, 0] : [currMonth + 1, 12]
        );
        setStartDate(`${currYear - 1}-01`);
        setEndDate(`${currYear - 1}-12`);
        break;
      case `${currMonth}${t("mypage.dashboard.date.month")}`:
        setTerm([currMonth, 0]);
        setStartDate(`${currYear}-${currMonth.toString().padStart(2, '0')}`);
        setEndDate(`${currYear}-${currMonth.toString().padStart(2, '0')}`);
        break;
      case `${currMonth == 1 ? 12 : currMonth - 1}${t("mypage.dashboard.date.month")}`:
        setTerm(currMonth == 1 ? [12, 0] : [currMonth - 1, 0]);

        break;
      case `${currMonth - 2 > 0 ? currMonth - 2 : 10 + currMonth}${t("mypage.dashboard.date.month")}`:
        setTerm(
          currMonth - 2 > 0
            ? [currMonth - 2, 0]
            : [10 + currMonth, 0]
        );
        break;
      default:
        break;
    }
  };


  const getDashBoardData = () => {
    setLoading(true);
    AxiosConfig.get(
      `user/dashboard?start=${startDate}&end=${endDate}`
    ).then((res) => {
      if (res.data.statusCode == 200) {
        setData(res.data.result);
        setLoading(false);
      } else if (res.data.statusCode == 104) {
        window.location.reload();
      } else {
        setApiError('유저 대시보드');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
    });
  };
  const getDashBoardRefund = () => {
    AxiosConfig.get(
      `/user/dashboard/refund?start=${startDate}&end=${endDate}`
    ).then((res) => {
      setRefundData(res.data.result);
    })
  }



  useEffect(() => {
    updateTermBasedOnSelectTerm();
  }, [selectTerm, startDate, endDate]);

  useEffect(() => {
    getDashBoardData();
    getDashBoardRefund();
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectTerm === t("mypage.dashboard.date.all") && data != null) {
    }
  }, [data]);

  return (
    <>
      {errorPopup ? (
        <ErrorPopup
          context={apiError}
          errorMessage={errorMessage}
          setErrorPopup={setErrorPopup}
        />
      ) : null}
      <UserDashboardStyle>
        <div>
          <header>
            <h1>{t("mypage.dashboard.title")}</h1>
            <div className="select">
              <button
                onClick={() => {
                  setShowSelectTerm((prev) => !prev);
                  setShowCal(false);
                }}
              >
                {selectTerm}
                <OpenMenuSvg />
              </button>
              <AnimatePresence>
                {!showSelectTerm ? null : (
                  <motion.ul
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <li
                      onClick={() => {
                        setShowSelectTerm(false);
                        setShowCal(false);
                        setSelectTerm(`${t("mypage.dashboard.date.all")}`);
                        updateTermBasedOnSelectTerm();
                      }}
                    >
                      <p>{t("mypage.dashboard.date.all")}</p>
                    </li>
                    <li
                      onClick={() => {
                        setShowSelectTerm(false);
                        setShowCal(false);
                        setSelectTerm(`${t("mypage.dashboard.date.3month")}`);
                        updateTermBasedOnSelectTerm();
                      }}
                    >
                      <p>{t("mypage.dashboard.date.3month")}</p>
                    </li>
                    <li
                      onClick={() => {
                        setShowSelectTerm(false);
                        setShowCal(false);
                        setSelectTerm(`${t("mypage.dashboard.date.6month")}`);
                        updateTermBasedOnSelectTerm();
                      }}
                    >
                      <p>{t("mypage.dashboard.date.6month")}</p>
                    </li>
                    <li
                      onClick={() => {
                        setShowSelectTerm(false);
                        setShowCal(false);
                        setSelectTerm(`${currYear}${t("mypage.dashboard.date.year")}`);
                        updateTermBasedOnSelectTerm();
                      }}
                    >
                      <p>{currYear}{t("mypage.dashboard.date.year")}</p>
                    </li>
                    {currMonth == 12 ? null : (
                      <li
                        onClick={() => {
                          setShowSelectTerm(false);
                          setShowCal(false);
                          setSelectTerm(`${currYear - 1}${t("mypage.dashboard.date.year")}`);
                          updateTermBasedOnSelectTerm();
                        }}
                      >
                        <p>{currYear - 1}{t("mypage.dashboard.date.year")}</p>
                      </li>
                    )}
                    <li onClick={() => setShowCal(true)}>
                      <p>{t("mypage.dashboard.date.custom")}</p>
                      <AnimatePresence>
                        {!showCal ? null : (
                          <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                          >
                            <div>
                              <img
                                src="/img/callenderArrowRight.svg"
                                onClick={() =>
                                  setCallendarYear((prev) => prev - 1)
                                }
                              />
                              <p>{callendarYear}년</p>
                              <img
                                src="/img/callenderArrowLeft.svg"
                                onClick={() =>
                                  setCallendarYear((prev) => prev + 1)
                                }
                              />
                            </div>
                            <div>
                              {allMonth.map((v) => (
                                <p
                                  key={v}
                                  onClick={() => {
                                    if (
                                      callendarYear < currYear - 1 ||
                                      callendarYear > currYear ||
                                      (callendarYear === currYear && v > currMonth) ||
                                      (callendarYear == currYear - 1 && v <= currMonth)
                                    ) {
                                      return null;
                                    } else {
                                      const formattedMonth = v.toString().padStart(2, '0');
                                      setSelectTerm(`${formattedMonth}${t("mypage.dashboard.date.month")}`);
                                      setTerm([v, 0]);
                                      setStartDate(`${callendarYear}-${formattedMonth}`);
                                      setEndDate(`${callendarYear}-${formattedMonth}`);
                                    }
                                    setShowCal(false);
                                    setShowSelectTerm(false);
                                  }}
                                  className={
                                    callendarYear < currYear - 1 ||
                                      callendarYear > currYear ||
                                      (callendarYear === currYear && v > currMonth) ||
                                      (callendarYear == currYear - 1 && v <= currMonth)
                                      ? 'disabled'
                                      : null
                                  }
                                >
                                  {v}{t("mypage.dashboard.date.month")}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>

              <span>
                {selectTerm == `${t("mypage.dashboard.date.all")}` ? `${t("mypage.dashboard.date.all")}` :
                  startDate == endDate ? startDate : `${startDate}~${endDate}`}
              </span>
            </div>
          </header>
          <nav>
            <ul>
              <li
                className={showArtData === "summary" ? 'selected' : null}
                onClick={() => {
                  setShowArtData('summary')
                  setSelectTerm(`${t("mypage.dashboard.date.all")}`)
                }}
              >
                {t("mypage.dashboard.summary.title")}
              </li>
              <li
                className={showArtData === "art_analysis" ? 'selected' : null}
                onClick={() => {
                  setShowArtData('art_analysis')
                  setSelectTerm(`${t("mypage.dashboard.date.all")}`)
                }}
              >
                {t("mypage.dashboard.art_analysis.title")}
              </li>
              <li
                className={showArtData === "revenue_analysis" ? 'selected' : null}
                onClick={() => {
                  setShowArtData('revenue_analysis')
                  setSelectTerm(`${t("mypage.dashboard.date.all")}`)
                }}
              >
                {t("mypage.dashboard.revenue_analysis.title")}
              </li>
              {/* <li
                className={!showArtData ? styles.selected : null}
                onClick={() => setShowArtData(false)}
              >
                수익분석
              </li> */}
            </ul>
          </nav>
          {/* {console.log(data)} */}
          {loading ? null : (
            <div>
              {data ? (
                showArtData === "summary" ? (
                  <UserDashBoardSummary
                    data={data}
                    mode={mode}
                    start={startDate}
                    end={endDate}
                    term={selectTerm}
                    refundData={refundData}
                  />
                ) : showArtData === "art_analysis" ?
                  (
                    <UserDashBoardArtStat
                      mode={mode}
                      data={data}
                      term={selectTerm}
                      start={startDate}
                      end={endDate}
                    />
                  ) : showArtData === "revenue_analysis" ?
                    (<UserDashBoardRevenueAnalysis mode={mode}
                      data={data}
                      term={selectTerm}
                      start={startDate}
                      end={endDate}
                      refundData={refundData}
                    />
                    ) :
                    (
                      <UserDashboardPaymentStat
                        recentMonth={recentMonth}
                        data={data}
                      />
                    )
              ) : null}
            </div>
          )}
        </div>
      </UserDashboardStyle>
    </>
  );
};
export default UserDashboard;
