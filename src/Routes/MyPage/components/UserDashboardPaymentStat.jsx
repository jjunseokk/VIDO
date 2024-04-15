import React, { useState, useContext, useEffect } from 'react';
import DashBoardTable from './DashBoardTable';
import styles from './UserDashboardPaymentStat.module.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import VerticalBar from './VerticalBar';
import HorizontalBar from './HorizontalBar';
import { UserContext } from '../../ContextProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const UserDashboardPaymentStat = ({ data, recentMonth }) => {
  const today = new Date();
  const currmonth = today.getMonth() + 1;
  const [artProfit, setArtProfit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profitPageArr, setProfitPageArr] = useState([]);
  const [profitPage, setProfitPage] = useState(1);
  const [profitCompany, setProfitCompany] = useState([]);
  const [profitWholePage, setProfitWholePage] = useState(1);
  const [monthlyProfit, setMonthlyProfit] = useState([]);
  const { serverAddress } = useContext(UserContext);
  const getArtProfit = () => {
    let tempArr = data.playCountByMediaArt;
    tempArr.sort((a, b) => {
      if (a.revenue > b.revenue) return -1;
      else if (a.revenue < b.revenue) return 1;
      else return 0;
    });
    return tempArr;
  };
  const getRecentYear = () => {
    let arr = [];
    for (let i = 0; i < 13; i++) {
      let mon = currmonth - i > 0 ? currmonth - i : currmonth + 12 - i;
      arr.push(mon);
    }
    return arr;
  };
  const recentY = getRecentYear();
  const getProfitPageArr = () => {
    let pageLength = 12;
    // let pageLength=6;
    if (artProfit.length > pageLength) {
      let tempArr = artProfit;
      let tempPgArr = [];
      for (let i = 0; i < tempArr.length - 1; i += pageLength) {
        tempPgArr.push(tempArr.slice(i, i + pageLength));
      }
      return tempPgArr;
    } else {
      return [artProfit];
    }
  };
  const getMonthly = () => {
    console.log(data.revenueByMonth[recentMonth[0]]);
    const tempArr = recentMonth.map((v) =>
      data.revenueByMonth[v] ? data.revenueByMonth[v] : 0
    );
    setMonthlyProfit(tempArr);
  };

  const getProfitByCompany = () => {
    let tempArr = data.playCountByClient;
    tempArr.sort((a, b) => {
      if (a.revenue > b.revenue) return -1;
      else if (a.revenue < b.revenue) return 1;
      else return 0;
    });
    return tempArr;
  };
  useEffect(() => {
    setArtProfit(getArtProfit());
    setProfitCompany(getProfitByCompany());
    getMonthly();
    return setLoading(false);
  }, []);

  useEffect(() => {
    artProfit ? setProfitPageArr(getProfitPageArr()) : null;
  }, [artProfit]);

  return (
    <div className={styles.UserDashboardPaymentStat}>
      {loading ? null : (
        <>
          <div>
            <ul>
              <li>
                <p>
                  수익<span>(원)</span>
                </p>
                <p>{data.revenue.toLocaleString()}</p>
              </li>
              <li>
                <p>작품 구독 업체 개수</p>
                <p>{data.subscribedClient}</p>
              </li>
              <li>
                <p>수익률 최상위 작품</p>
                <ul className={styles.bestProfit}>
                  <li>
                    <ul>
                      {artProfit.slice(0, 5).map((value) => (
                        <li key={value.mediaArtId}>
                          <img
                            src={serverAddress + value.thumbnailPath}
                            alt="thumb"
                          />
                          <p>
                            {value.title.length > 27
                              ? value.title.slice(0, 23) + '...'
                              : value.title}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <HorizontalBar
                      label={artProfit.slice(0, 5).map((value) => value.title)}
                      dataset={artProfit
                        .slice(0, 5)
                        .map((value) => -value.revenue)}
                    />
                  </li>
                  <li>
                    <ul>
                      {artProfit.slice(0, 5).map((value) => (
                        <li key={value.mediaArtId}>
                          <p>￦ {value.revenue.toLocaleString()}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <p>
                  월별 추정 수익<span>(최근 3개월 기준)</span>
                </p>
                <ul className={styles.monthlyProfit}>
                  <li>
                    <ul>
                      {recentMonth.map((v) => (
                        <li key={v}>{v} 월</li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <HorizontalBar
                      label={recentY.slice(0, 3)}
                      dataset={monthlyProfit.map((v) => -v)}
                      monthly={true}
                    />
                  </li>
                  <li>
                    <ul>
                      {monthlyProfit.map((v, idx) => (
                        <li key={idx}>￦ {v.toLocaleString()}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <div className={styles.profitByArt}>
              <p>
                작품별 수익 <span>(%)</span>{' '}
              </p>
              {profitPageArr ? (
                <DashBoardTable
                  data={profitPageArr[profitPage - 1]}
                  profit={data.revenue}
                />
              ) : null}
              <ul>
                <li>
                  <span>
                    {profitPage}/{profitPageArr.length}
                  </span>
                </li>
                <li onClick={() => setProfitPage(1)}>
                  <img src="/img/doubleArrowLeft.svg" />
                </li>
                <li
                  onClick={() =>
                    profitPage > 1 ? setProfitPage((prev) => prev - 1) : null
                  }
                >
                  <img src="/img/ArrowLeft.svg" />
                </li>
                <li
                  onClick={() =>
                    profitPage < profitPageArr.length
                      ? setProfitPage((prev) => prev + 1)
                      : null
                  }
                >
                  <img src="/img/ArrowRight.svg" />
                </li>
                <li onClick={() => setProfitPage(profitPageArr.length)}>
                  <img src="/img/doubleArrowRight.svg" />
                </li>
              </ul>
            </div>
            {/* <div className={styles.profitByPlace}>
              <p>
                장소별 수익률<span>(%)</span>
              </p>
              <div>
                <VerticalBar
                  label={profitCompany.map((value) => value.companyName)}
                  dataset={profitCompany.map(
                    (value) =>
                      Math.round((value.revenue / data.revenue) * 10000) / 100
                  )}
                  n={14}
                />
              </div>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboardPaymentStat;
