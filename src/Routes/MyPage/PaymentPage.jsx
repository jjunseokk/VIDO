import React, { useState, useEffect, useRef } from 'react';
import OpenMenuSVG from '../Components/OpenMenuSvg';
import SquareBtn from '../Components/SquareBtn';
import { replaceAll } from '../util/replaceAll';
import BankCode from './data/BankCode.json';
import AxiosConfig from '../../AxiosConfig';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import ErrorPopup from '../Components/ErrorPopup';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../util/recoilState';
import MonthlyPopup from './components/MonthlyPopup';
import { getSettlementDate } from '../util/userInfoGet';
import { PaymentPageStyle } from './PaymentPageStyles';
import { Trans, useTranslation } from "react-i18next";
import RenderPagination from '../Components/RenderPagination'

const PaymentPage = ({ mode }) => {
  const { t } = useTranslation();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [paymentAvail, setPaymentAvail] = useState(0);
  const [showBankSelect, setShowBankSelect] = useState(false);
  const [bankAcc, setBankAcc] = useState('');
  const [backHolder, setBankHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [paymentRequest, setPaymentRequest] = useState('');
  const [realRequest, setRealRequest] = useState(0);
  const [requestValid, setRequestValid] = useState(false);
  const [payed, setPayed] = useState(10000);
  const [bankInfoPopup, setBankInfoPopup] = useState(false);
  const [paymentRequestPopup, setPaymentRequestPopup] = useState(false);
  const [paymentArchive, setPaymentArchive] = useState([
    { payed: 1000, date: '2022.02.02' },
  ]);
  const [duplicationError, setDuplicationError] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [monthlyPopup, setMonthlyPopup] = useState(false);
  const [month, setMonth] = useState(false);
  const [showSelectMonth, setShowSelectMonth] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [page, setPage] = useState(1);

  // 페이지네이션 토탈 페이지 & 현재페이지 구현
  const totalPage = Math.ceil(paymentArchive.length / 3);

  const indexOfLastItem = page * 3;
  const indexOfFirstItem = indexOfLastItem - 3;
  const currentItems = paymentArchive.slice(indexOfFirstItem, indexOfLastItem);

  // ----------------------------------

  const setLogin = useSetRecoilState(loginState);
  const dateList = useQuery('settlementDate', getSettlementDate);

  const searchRef = useRef(null);

  const getPaymentInfo = () => {
    AxiosConfig.get(`/user/refund`).then((res) => {
      if (res.data.statusCode === 200) {
        setPaymentInfo(res.data.result);
        setBankAcc(res.data.result.refundAccount);
        setBankName(res.data.result.refundBank);
        setPaymentAvail(res.data.result.refundableAmount);
        setPaymentArchive(res.data.result.refundedHistory);
        setPayed(res.data.result.refundedTotalAmount);
        console.log(res.data)
      } else if (res.data.statusCode == 104) {
        window.location.reload();
        setLogin(false);
      } else {
        setApiError('출금정보');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
    });
  };

  const changeBankInfo = () => {
    AxiosConfig.post(`/user/refund`, {
      refundBank: bankName,
      refundAccount: bankAcc,
    }).then((res) => {
      if (res.data.statusCode === 200) {
        setBankInfoPopup(true);
        getPaymentInfo();
      } else {
        setApiError('출금정보 수정');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
    });
  };

  const requestPayment = () => {
    AxiosConfig.post(`/user/refund/request`, {
      amount: realRequest,
    }).then((res) => {
      if (res.data.statusCode == 200) {
        setPaymentRequestPopup(true);
      } else if (res.data.statusCode == 112) {
        setDuplicationError(true);
      } else {
        setApiError('출금요청');
        setErrorMessage(res.data.statusCode);
        setErrorPopup(true);
      }
      getPaymentInfo();
    });
  };

  useEffect(() => {
    function handleFocus(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        document.getElementById('thisSelectBox').checked = false;
        setShowBankSelect(false)
      }
    }

    document.addEventListener("mouseup", handleFocus);
    return () => { document.removeEventListener("mouseup", handleFocus); }
  }, [searchRef]);

  useEffect(() => {
    getPaymentInfo();
  }, [paymentRequest]);

  const sortBank = (a, b) => {
    if (a.bank < b.bank) {
      return -1;
    }
    if (a.bank > b.bank) {
      return 1;
    }
    return 0;
  };

  console.log(paymentArchive)

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
        {monthlyPopup ? (
          <MonthlyPopup
            setPopup={setMonthlyPopup}
            month={month}
            dateList={dateList}
          />
        ) : null}
      </AnimatePresence>
      <PaymentPageStyle mode={mode}>
        {duplicationError ? (
          <div className="duplication">
            <div
              className="modal"
              onClick={() => setDuplicationError(false)}
            ></div>
            <div className="popup">
              <p>{t("mypage.refund.message.yet")}</p>
              <button onClick={() => setDuplicationError(false)}>닫기</button>
            </div>
          </div>
        ) : null}
        {bankInfoPopup ? (
          <div className={"popup"}>
            <div onClick={() => setBankInfoPopup(false)}></div>
            <div>
              <p>{t("mypage.refund.message.register_done")}</p>
              <SquareBtn
                context="확인"
                onClick={() => setBankInfoPopup(false)}
                width="80px"
              />
            </div>
          </div>
        ) : null}
        {paymentRequestPopup ? (
          <div className={"popup"}>
            <div></div>
            <div style={{ height: '300px' }}>
              <p>{t("mypage.refund.message.request_done")}</p>
              <div onClick={() => setPaymentRequestPopup(false)}>
                <p>
                  <Trans i18nKey={"mypage.refund.message.request_description"} />
                </p>
              </div>
              <SquareBtn
                context={t("common.done")}
                width="80px"
                onClick={() => setPaymentRequestPopup(false)}
              />
            </div>
          </div>
        ) : null}
        {!paymentInfo ? null : (
          <>
            <h1>{t("mypage.refund.title")}</h1>
            <h2>{paymentAvail.toLocaleString()} ￦</h2>
            <ul ref={searchRef}>
              <li>
                <div>
                  <p>{t("mypage.refund.account")}</p>
                  <div>
                    <div>
                      <button
                        onClick={() => setShowBankSelect((prev) => !prev)}
                        id='thisSelectBox'
                      >
                        {bankName ? bankName : '선택'}
                        <OpenMenuSVG />
                      </button>
                      <AnimatePresence>
                        {!showBankSelect ? null : (
                          <motion.ul
                            layout
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            {BankCode.sort(sortBank).map((value) => (
                              <li
                                onClick={() => {
                                  setBankName(value.bank);
                                  setShowBankSelect(false);
                                }}
                                key={value.code}
                              >
                                {value.bank}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                    <input
                      value={bankAcc}
                      onChange={(e) => setBankAcc(e.target.value)}
                      placeholder={t("mypage.refund.account_hint")}
                      type="number"
                    />
                    <input
                      value={backHolder}
                      onChange={(e) => setBankHolder(e.target.value)}
                      placeholder={t("mypage.refund.name_hint")}
                    />
                    <SquareBtn
                      disabled={
                        !bankAcc ||
                        !bankName ||
                        isNaN(bankAcc) ||
                        (paymentInfo.refundAccount === bankAcc &&
                          paymentInfo.refundBank === bankName)
                      }
                      context={t("mypage.refund.register")}
                      width="104px"
                      onClick={() => changeBankInfo()}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <p>{t("mypage.refund.request_amount")}</p>
                  <input
                    value={paymentRequest}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (!isNaN(Number(replaceAll(val, ',', '')))) {
                        val = Number(replaceAll(val, ',', ''));
                        setRealRequest(val);
                        const format = val.toLocaleString();
                        setPaymentRequest(format);
                        if (
                          val >= 10000 &&
                          val % 1000 === 0 &&
                          val <= paymentAvail
                        ) {
                          setRequestValid(true);
                        } else {
                          setRequestValid(false);
                        }
                      }
                    }}
                    placeholder={t("mypage.refund.request_hint")}
                  />
                  <span>원</span>
                  <SquareBtn
                    onClick={requestPayment}
                    context={t("mypage.refund.request")}
                    width="104px"
                    disabled={!requestValid}
                  />
                  {requestValid || realRequest < 1 ? null : realRequest <
                    paymentAvail ? (
                    <span className={'request_error'}>
                      {t("mypage.refund.message.amount1")}
                    </span>
                  ) : (
                    <span className={'request_error'}>
                      {t("mypage.refund.message.amount2")}
                    </span>
                  )}
                </div>
              </li>
              <li>
                <div>
                  <p>{t("mypage.refund.total_amount")}</p>
                  <div>
                    <p>{payed.toLocaleString()} ￦</p>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <p>{t("mypage.refund.month_receipt")}</p>
                  <div>
                    <div>
                      <button
                        disabled={dateList.data.length == 0}
                        onClick={() => setShowSelectMonth((prev) => !prev)}
                      >
                        {month
                          ? `${month.slice(0, 4)}${t("mypage.refund.year")} ${month.slice(5, 7)}${t("mypage.refund.month")}`
                          : t("mypage.refund.select")}
                        <img src="/img/openmenu.svg" />
                      </button>
                      <AnimatePresence>
                        {dateList.data ? (
                          showSelectMonth ? (
                            <motion.ul
                              layout
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                            >
                              {dateList.data.map((date) => (
                                <li>
                                  <p
                                    onClick={() => {
                                      setMonth(date);
                                      setShowSelectMonth(false);
                                    }}
                                  >
                                    {`${date.slice(0, 4)}${t("mypage.refund.year")} ${date.slice(5, 7)}${t("mypage.refund.month")}`}
                                  </p>
                                </li>
                              ))}
                            </motion.ul>
                          ) : null
                        ) : null}
                      </AnimatePresence>
                    </div>
                    <SquareBtn
                      onClick={() => setMonthlyPopup(true)}
                      context={t("mypage.refund.receipt")}
                      width="104px"
                      disabled={!month}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <p>{t("mypage.refund.history.title")}</p>
                  <table>
                    <thead>
                      <tr>
                        <td>
                          <p>{t("mypage.refund.history.num")}</p>
                        </td>
                        <td>
                          <p>
                            {t("mypage.refund.history.amount")} <span>{t("mypage.refund.history.amount_unit")}</span>
                          </p>
                        </td>
                        <td>
                          <p>{t("mypage.refund.history.request_date")}</p>
                        </td>
                        <td>
                          <p>{t("mypage.refund.history.date")}</p>
                        </td>
                        <td>
                          <p>{t("mypage.refund.history.status")}</p>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {!paymentArchive
                        ? null
                        : currentItems.map((value, idx) => (
                          <tr key={idx}>
                            <td>
                              <p>{idx + 1}</p>
                            </td>
                            <td>
                              <p>{value.requestedAmount.toLocaleString()}</p>
                            </td>
                            <td>
                              <p>{value.requestedDatetime.slice(0, 10).replace(/-/g, '.')}</p>
                            </td>
                            <td>
                              <p>
                                {value.refundedDatetime
                                  ? value.refundedDatetime.slice(0, 10).replace(/-/g, '.')
                                  : ''}
                              </p>
                            </td>
                            <td
                              onClick={() => {
                                setShowHistory(showHistory === idx ? false : idx);
                              }}
                              className={
                                value?.rejectedReason == null
                                  ? value?.refundedDatetime == null
                                    ? 'gray'
                                    : 'black'
                                  : 'red'
                              }
                            >
                              {value?.rejectedReason == null
                                ? value?.refundedDatetime == null
                                  ? '대기'
                                  : '승인'
                                : '보류'}
                            </td>
                            {value?.rejectedReason == null ? null : showHistory === idx && (
                              <div>
                                <img
                                  onClick={() => {
                                    setShowHistory(false);
                                  }}
                                  src="/img/closeBig.svg"
                                  alt="Close"
                                />
                                <p>지급 보류 사유</p>
                                <div>{value.rejectedReason}</div>
                              </div>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {paymentArchive == "" ? null : <RenderPagination mode={mode} totalPage={totalPage} setPage={setPage} page={page} />}
                </div>
              </li>
            </ul>
          </>
        )}
      </PaymentPageStyle>
    </>
  );
};

export default PaymentPage;
