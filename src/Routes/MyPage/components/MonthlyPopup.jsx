import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { getSettlement } from '../../util/userInfoGet';
import { replaceAll } from '../../util/replaceAll';
import { UserContext } from '../../ContextProvider';
import SettlementDetail from './SettlementDetail';
import {useTranslation} from "react-i18next";

const Div = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;

  > .modal {
    top: 0;
    left: 0;
    width: 100vw;
    position: absolute;
    height: 100vh;
    background-color: #151515;
    opacity: 0.3;
  }
  > .popup {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    background-color: #fff;
    padding: 60px;
    max-height: 860px;
    overflow: auto;
    width: 600px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    &::-webkit-scrollbar {
      width: 14px;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      background: #f2f2f2;
      width: 12px;
      margin-right: 2px;
      border-radius: 6px;
      border: 2px solid #fff;
    }
    > .close {
      position: absolute;
      top: 12px;
      right: 12px;
    }
    > header {
      display: flex;
      gap: 60px;
      margin-bottom: 40px;
      align-items: center;

      > h1 {
        font: 400 22px ${({ theme }) => theme.noto};
        color: #707070;
      }
      > button {
        position: absolute;
        right: 60px;
        transition: ${({ theme }) => theme.transition};
        &:hover {
          background-color: ${({ theme }) => theme.mainColor};
          color: #fff;
        }
        width: 80px;
        height: 24px;
        border: ${({ theme }) => theme.border};
        font: 400 12px ${({ theme }) => theme.noto};
      }
    }
    > ul {
      display: flex;
      flex-direction: column;
      gap: 40px;
      .date {
        > p:last-of-type {
          color: #707070;
          font: 400 16px ${({ theme }) => theme.noto};
        }
      }
      .total {
        > p:last-of-type {
          color: #525252;
          font: 500 24px ${({ theme }) => theme.noto};
          letter-spacing: -0.48px;
        }
      }
    }
  }
  @media (max-width: 760px) {
    > .popup {
      padding: 24px;
      width: 400px;
      > header {
        gap: 10px;
      }
      > ul {
        gap: 20px;
      }
    }
  }
`;

const Select = styled.div`
  position: relative;
  > button {
    position: relative;
    width: 120px;
    height: 24px;
    text-align: left;
    padding: 0 8px;
    font: 400 12px ${({ theme }) => theme.noto};
    letter-spacing: -0.3px;
    border: ${({ theme }) => theme.border};
    color: #707070;
    z-index: 20;
    > img {
      position: absolute;
      right: 8px;
      top: 4px;
    }
  }
  > ul {
    width: 120px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    position: absolute;
    top: 24px;
    > li {
      > p {
        background-color: #fff;
        transition: all 0.2s;
        color: #707070;
        padding-left: 8px;
        font: 400 12px/32px ${({ theme }) => theme.noto};
        letter-spacing: -0.3px;
        &:hover {
          background-color: #f0f0f0;
          color: ${({ theme }) => theme.mainColor};
        }
      }
    }
  }
`;

const BlueP = styled.p`
  font: 400 14px/19px ${({ theme }) => theme.noto};
  color: ${({ theme }) => theme.mainColor};
  margin-bottom: 10px;
`;

const Table = styled.ul`
  > li {
    width: 100%;
    > ul {
      display: flex;
      gap: 30px;
      align-items: center;
      &.thead {
        background-color: #f8f8f8;
        height: 48px;
        font: 500 14px ${({ theme }) => theme.noto};
        color: #707070;
      }
      &.tbody {
        height: 96px;
        border-bottom: ${({ theme }) => theme.border};
        > li {
          &.num {
            font: 400 14px ${({ theme }) => theme.roboto};
            color: #151515;
          }
          &.thumb {
            img {
              width: 90px;
              height: 60px;
            }
          }
        }
      }
      > li {
        &.num {
          padding-left: 18px;
          width: 56px;
        }
        &.thumb {
          width: 90px;
        }

        &.title {
          > .title {
            font: 500 14px ${({ theme }) => theme.noto};
            letter-spacing: -0.35px;
            color: #707070;
          }
          > .des {
            font: 400 12px ${({ theme }) => theme.noto};
            letter-spacing: -0.35px;
            color: #707070;
          }
        }
      }
    }
  }
  @media (max-width: 760px) {
    > li > ul {
      gap: 10px;
      &.thead {
        font: 500 12px ${({ theme }) => theme.noto};
      }
      &.tbody {
        font: 400 12px ${({ theme }) => theme.roboto};
      }
      > li {
        &.title {
          > .title {
            font: 500 12px ${({ theme }) => theme.noto};
          }
          > .des {
            font: 400 10px ${({ theme }) => theme.noto};
          }
        }
      }
    }
  }
`;

const MonthlyPopup = ({ setPopup, month, dateList }) => {
  const {t} = useTranslation();
  const { serverAddress } = useContext(UserContext);
  const [select, setSelect] = useState(month);
  const [showSelect, setShowSelect] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  //수익날짜 불러올때 하루 뒤 날짜로 불러오면 됨 ex 1.30=>1.31
  const { data, status, refetch, isLoading } = useQuery(
    `settlement ${select}`,
    () => getSettlement(replaceAll(select, '-', '').slice(2, 8)),
    { enabled: !!select }
  );

  // useEffect(()=>refetch(),[select])
  return (
    <Div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="modal" onClick={() => setPopup(false)}></div>
      <AnimatePresence>
        {showDetail ? (
          <SettlementDetail
            month={select}
            data={data}
            setPopup={setShowDetail}
          />
        ) : null}
      </AnimatePresence>
      <div className="popup">
        <button className="close" onClick={() => setPopup(false)}>
          <img src="/img/close-popup.svg" />
        </button>
        <header>
          <h1>{t("mypage.refund.month_receipt")}</h1>
          <Select>
            <button onClick={() => setShowSelect((prev) => !prev)}>
              {`${select.slice(0, 4)}${t("mypage.refund.year")} ${select.slice(5, 7)}${t("mypage.refund.month")}`}{' '}
              <img src="/img/openmenu.svg" />
            </button>
            <AnimatePresence>
              {showSelect ? (
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
                          setSelect(date);
                          setShowSelect(false);
                        }}
                      >
                        {`${date.slice(0, 4)}${t("mypage.refund.year")} ${date.slice(5, 7)}${t("mypage.refund.month")}`}
                      </p>
                    </li>
                  ))}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </Select>
          <button onClick={() => setShowDetail(true)}>{t("mypage.refund.detail")}</button>
        </header>
        <ul>
          <li className="date">
            <BlueP>{t("mypage.refund.receipt_date")}</BlueP>
            <p>{`${select.slice(0, 4)}. ${
              select.slice(5, 7)[0] == '0'
                ? select.slice(6, 7)
                : select.slice(5, 7)
            }`}</p>
          </li>
          <li className="art">
            <BlueP>{t("mypage.refund.receipt_art")}</BlueP>
            <Table>
              <li>
                <ul className="thead">
                  <li className="num">{t("common.num")}</li>
                  <li className="thumb">{t("mypage.media_art.thumbnail")}</li>
                  <li className="title">{t("mypage.media_art.title_description")}</li>
                </ul>
              </li>
              {!isLoading
                ? data.mediaArts
                  ? data.mediaArts.map((art) => (
                      <li key={art.id}>
                        <ul className="tbody">
                          <li className="num">{art.id}</li>
                          <li className="thumb">
                            <img src={serverAddress + art.thumbnailPath} />
                          </li>
                          <li className="title">
                            <p className="title">
                              {art.title.length > 20
                                ? art.title.slice(0, 18) + '...'
                                : art.title}
                            </p>
                            <p className="des">
                              {art.description.length > 25
                                ? art.description.slice(0, 23) + '...'
                                : art.description}
                            </p>
                          </li>
                        </ul>
                      </li>
                    ))
                  : null
                : null}
            </Table>
          </li>
          <li className="total">
            <BlueP>{t("mypage.refund.receipt_total")}</BlueP>
            <p>
              {!isLoading
                ? data.settlementAmount
                  ? data.settlementAmount.toLocaleString()
                  : null
                : null}{' '}
              ￦
            </p>
          </li>
        </ul>
      </div>
    </Div>
  );
};

export default MonthlyPopup;
