import React, { useState, useEffect, useContext } from 'react';
import styles from './ArtStat.module.scss';
import { Bar, Doughnut } from 'react-chartjs-2';
import AxiosConfig from '../../../AxiosConfig';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { UserContext } from '../../ContextProvider';
import ErrorPopup from '../../Components/ErrorPopup';
import sortMonthlyData from '../utils/sortMonthlyData';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const ArtStat = ({ currmonth, stat, term, loading, setLoading }) => {
  const profCalc = 1;

  const recentMonth = [
    currmonth,
    currmonth - 1 > 0 ? currmonth - 1 : currmonth + 11,
    currmonth - 2 > 0 ? currmonth - 2 : currmonth + 10,
  ];
  const { serverAddress } = useContext(UserContext);
  const [playCountBy, setPlayCountBy] = useState(true);
  const [playtimeBy, setPlaytimeBy] = useState(true);
  const [approved, setApproved] = useState([]);
  const [playCount, setPlayCount] = useState([]);
  const [playCountData, setPlayCountData] = useState([]);
  const [playCountWhole, setPlayCountWhole] = useState(0);
  const [playCountBarData, setPlayCountBarData] = useState({});
  const [playtime, setPlaytime] = useState([]);
  const [playtimeData, setPlaytimeData] = useState([]);
  const [playtimeWhole, setPlaytimeWhole] = useState(0);
  const [playtimeBarData, setPlaytimeBarData] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [playerCount, setPlayerCount] = useState([]);
  const [playerCountData, setPlayerCountData] = useState([]);
  const [playerCountWhole, setPlayerCountWhole] = useState(0);
  const [playerCountBarData, setPlayerCountBarData] = useState({});
  const [playertime, setPlayertime] = useState([]);
  const [playertimeData, setPlayertimeData] = useState([]);
  const [playertimeWhole, setPlayertimeWhole] = useState(0);
  const [playertimeBarData, setPlayertimeBarData] = useState({});
  const [subscriber, setSubscriber] = useState(0);
  const [recentProfit, setRecentProfit] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [uploadedPage, setUploadedPage] = useState([]);
  const [uploadedPageNum, setUploadedPageNum] = useState(0);
  const [profitPage, setProfitPage] = useState([]);
  const [profitPageNum, setProfitPageNum] = useState(0);
  const [profitData, setProfitData] = useState({});
  const [recentProfitData, setRecentProfitData] = useState({});
  const [playerProfitData, setPlayerProfitData] = useState({});
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function getSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    };
  }

  useEffect(() => {
    const getStatWhole = () => {
      setLoading(true);
      AxiosConfig.get(`user/art`).then((res) => {
        setUploaded(res.data.result.reverse());
        let approved = 0;
        let rejected = 0;
        let waiting = 0;
        res.data.result.map((value) => {
          value.isApproved === true
            ? ++approved
            : value.isApproved === false
            ? ++rejected
            : waiting++;
        });
        setApproved([approved, waiting, rejected]);
      });
      // if (term.length == 12) {
      //   AxiosConfig.get(`/user/statistics/total`).then((res) => {
      //     console.log(res.data.result);
      //     let tempArr = [];
      //     res.data.result.map((value) => tempArr.push(value));
      //     return getPlayTime(tempArr);
      //   });
      // }
      const getDashBoardMonthlyData = async (month) => {
        let tempArr = [];
        let tempSubIdArr = [];
        let tempRecentProfit = [];
        try {
          //전체 기간 불러올 때 최근 1년 것만 불러오기 가능!
          for (let i = 0; i <= term.length - 1; i++) {
            const res = await AxiosConfig.get(
              `/user/statistics/month/${term[i]}`
            );
            tempArr.push(...res.data.result);
            console.log(term[i]);
            if (i < 3 && term[0] === currmonth && term.length === 12) {
              if (res.data.statusCode === 200) {
                let monthlyProfit = 0;
                res.data.result.map((value) => {
                  if (tempSubIdArr.indexOf(value.client.id) < 0) {
                    tempSubIdArr.push(value.client.id);
                  }

                  monthlyProfit += value.mediaArt.playtime;
                });
                tempRecentProfit.push(monthlyProfit);
                setRecentProfit(tempRecentProfit);
                getRecentProfitData([tempRecentProfit, recentMonth]);
                console.log(monthlyProfit);
              } else {
                setApiError('대시보드');
                setErrorMessage(res.data.statusCode);
                setErrorPopup(true);
              }
            }
          }
          if (term.length > 0) {
            console.log(tempArr);
            sortMonthlyData(
              tempArr,
              setPlayCount,
              setPlaytime,
              'play',
              setPlayCountWhole,
              setPlaytimeWhole
            );
            sortMonthlyData(tempArr, setPlayerCount, setPlayertime, 'player');
            // setMonthlyData(tempArr);
            // getTermPlayTime(tempArr);
            // return getTermPlayTime();
          } else {
            setMonthlyData(tempArr);
            setSubscriber(tempSubIdArr.length);
            sortMonthlyData(tempArr, setPlayerCount, setPlayertime, 'player');
          }
        } catch (e) {
          console.log(e);
        }
      };
      getDashBoardMonthlyData(currmonth);
    };
    getStatWhole();
  }, [term]);
  // useEffect(() => {
  //   const getDataByTerm = () => {
  //     let tempTermData = [];
  //     term.map((m) => {
  //       AxiosConfig.get(`/user/statistics/month/${m}`).then((res) => {
  //         tempTermData.push(...res.data.result);
  //       });
  //     });
  //     setMonthlyData(tempTermData);
  //   };
  //   getDataByTerm();
  // }, [term]);
  useEffect(() => {
    const setPlayerBarData = () => {
      console.log(monthlyData);
      setData(playerCount, 'playCount', 'companyName', setPlayerCountBarData);
      setData(playertime, 'playtime', 'companyName', setPlayertimeBarData);
    };
    setPlayerBarData();
  }, [playertime]);

  useEffect(() => {
    const getPage = () => {
      if (uploaded.length > 6) {
        let tempArr = uploaded;
        let tempPgArr = [];
        for (let i = 0; i < uploaded.length; i += 6) {
          tempPgArr.push(tempArr.slice(i, i + 6));
          console.log(tempPgArr);
        }
        setUploadedPage(tempPgArr);
      } else {
        setUploadedPage([uploaded]);
      }
    };
    getPage();
  }, [uploaded]);
  const getProfitPage = (arr) => {
    if (playtime.length > 6) {
      let tempArr = arr;
      let tempPgArr = [];
      for (let i = 0; i < arr.length; i += 6) {
        tempPgArr.push(tempArr.slice(i, i + 6));
        console.log(tempPgArr);
        setProfitPage([tempPgArr]);
      }
    } else {
      setProfitPage([arr]);
    }
  };
  useEffect(() => getProfitPage(playtime), [playtime]);

  const getPlayTime = (data) => {
    console.log(data);
    let tempArr = [];
    console.log(data);
    data.map((value) =>
      tempArr.push({
        id: value.mediaArt.id,
        title: value.mediaArt.title,
        playCount: value.playCount,
        playtime: value.mediaArt.playtime * value.playCount,
        profit: value.mediaArt.playtime * value.playCount * profCalc,
        thumbnailPath: value.mediaArt.thumbnailPath,
        description: value.mediaArt.description,
        createdDatetime: value.mediaArt.createdDatetime,
      })
    );
    const countArr = [...tempArr];
    setPlayCount(countArr.sort(getSortOrder('playCount')));
    const timeArr = [...tempArr];
    setPlaytime(timeArr.sort(getSortOrder('playtime')));
    let tempPlayCount = 0;
    tempArr.map((value) => (tempPlayCount += value.playCount));
    setPlayCountWhole(tempPlayCount);
    let tempPlaytime = 0;
    tempArr.map((value) => (tempPlaytime += value.playtime));
    setPlaytimeWhole(tempPlaytime);
    console.log(playCount);
    getProfitPage(timeArr);
    setTimeout(() => {
      setData(countArr, 'playCount', 'title', setPlayCountData);
      setData(timeArr, 'playtime', 'title', setPlaytimeData);
    }, 500);
  };
  // const getTermPlayTime = () => {
  //   console.log('getTerm');
  //   setTimeout(() => {
  //     setData(playCount, 'playCount', 'title', setPlayCountData);
  //     setData(playtime, 'playtime', 'title', setPlaytimeData);
  //   }, 500);
  // };
  useEffect(() => {
    console.log(playtime);
    setData(playtime, 'playtime', 'title', setPlaytimeData);
  }, [playtime]);
  useEffect(() => {
    console.log('less');
    console.log(playCount);
    setData(playCount, 'playCount', 'title', setPlaytimeData);
  }, [playCount]);
  const setData = (data, propA, propB, setFunc) => {
    console.log(data);
    let tempArrA = [];
    let tempArrB = [];
    data.map((value) => {
      console.log(value[propA]);
      tempArrA.push(value[propA]);
      tempArrB.push(value[propB]);
    });
    setFunc([tempArrA, tempArrB]);
    console.log(propA);
    console.log([tempArrA, tempArrB]);
    setTimeout(() => setPlaytimeBy(false), 1000);
    setTimeout(() => setPlaytimeBy(true), 2000);
    setTimeout(() => setPlayCountBy(false), 1000);
    setTimeout(() => setPlayCountBy(true), 2000);
    if (propB === 'title') {
      return setTimeout(() => {
        console.log('?');
        getChartData([tempArrA, tempArrB], propA);
        propA == 'playtime' ? getProfitData([tempArrA, tempArrB]) : null;
      }, 100);
    } else {
      return setTimeout(
        getPlayerChartData([tempArrA.slice(0, 5), tempArrB.slice(0, 5)], propA),
        500
      );
    }
  };

  const pieData = {
    labels: ['승인완료', '승인전', '미승인'],
    datasets: [
      {
        data: [...approved],

        backgroundColor: ['#002E85', '#C4c4c4', '#d87a7a'],
        borderWidth: 0,
      },
    ],
  };
  const getChartData = (data, propA) => {
    if (propA === 'playCount') {
      console.log(data[1]);

      setPlayCountBarData({
        labels: data[1],
        datasets: [
          {
            data: data[0],
            backgroundColor: ['#002E85'],
            barThickness: 12,
            maxBarThickness: 12,
            minBarLength: 10,
          },
        ],
      });
    } else if (propA === 'playtime') {
      console.log(data[1]);
      let playtimeCalcArr = data[0].map((v) => parseInt(v / 60));
      setPlaytimeBarData({
        labels: data[1],
        datasets: [
          {
            data: playtimeCalcArr,
            backgroundColor: ['#002E85'],
            barThickness: 12,
            maxBarThickness: 12,
            minBarLength: 10,
          },
        ],
      });
    }
  };
  const getPlayerChartData = (data, propA) => {
    if (propA === 'playCount') {
      console.log(data[1]);

      setPlayerCountBarData({
        labels: data[1],
        datasets: [
          {
            data: data[0],
            backgroundColor: ['#002E85'],
            barThickness: 12,
            maxBarThickness: 12,
            minBarLength: 10,
          },
        ],
      });
    } else if (propA === 'playtime') {
      console.log(data[1]);
      let playtimeCalcArr = data[0].map((v) => parseInt(v / 60));
      setPlayertimeBarData({
        labels: data[1],
        datasets: [
          {
            data: playtimeCalcArr,
            backgroundColor: ['#002E85'],
            barThickness: 12,
            maxBarThickness: 12,
            minBarLength: 10,
          },
        ],
      });
      let playerProfArr = [];
      let whole = 0;
      playtimeCalcArr.map((v) => (whole += v));
      console.log(whole);
      playtimeCalcArr.map((v) =>
        playerProfArr.push(parseInt((v / whole) * 100))
      );

      setPlayerProfitData({
        labels: data[1],
        datasets: [
          {
            data: playerProfArr,
            backgroundColor: ['#002E85'],
            barThickness: 12,
            maxBarThickness: 12,
            minBarLength: 10,
          },
        ],
      });
    }
  };
  const getProfitData = (data) => {
    console.log('profit');
    let floatArr = [];
    floatArr = data[0].map((v) => -v);
    setProfitData({
      labels: data[1],
      datasets: [
        {
          data: floatArr,
          backgroundColor: ['#002E85'],
          barThickness: 8,
          maxBarThickness: 8,
          minBarLength: 10,
        },
      ],
    });
    return setLoading(false);
  };
  const getRecentProfitData = (data) => {
    console.log(data[1]);
    let floatArr = [];

    floatArr = data[0].map((v) => -v);

    setRecentProfitData({
      labels: data[1],
      datasets: [
        {
          data: floatArr,
          backgroundColor: ['#002E85'],
          barThickness: 8,
          maxBarThickness: 8,
        },
      ],
    });
  };
  const pieOpt = {
    plugins: {
      legend: {
        display: false,
        position: 'right',
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        display: false,
      },
    },
  };
  const barOpt = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },

      datalabels: {
        display: true,
        color: '#707070',
        fontSize: '8px',
        anchor: 'end',
        align: 'top',
      },
      tooltip: {
        displayColors: false,
      },
    },
    layout: {
      paddingLeft: 12,
      paddingRight: 12,
      padding: {
        top: 24,
      },
    },
    scales: {
      x: {
        display: false,
        barThickness: 12,
        maxBarThickness: 12,

        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },

      y: {
        display: false,
        grid: {
          display: false,
          borderWidth: 0,
          zeroLineColor: '#0000000',
          lineWidth: [0],
        },
      },
    },
  };
  const percentBarOpt = {
    responsive: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        display: false,
        color: '#707070',
        fontSize: '10px',
      },
      tooltip: {
        displayColors: false,

        callbacks: {
          label: (c) => {
            console.log(c);
            const value = Number(c.dataset.data[c.dataIndex]);

            return value + '%';
          },
        },
      },
    },
    layout: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    scales: {
      x: {
        display: false,
        barThickness: 12,
        maxBarThickness: 12,

        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },

      y: {
        display: false,
        grid: {
          display: false,
          borderWidth: 0,
          zeroLineColor: '#0000000',
          lineWidth: [0],
        },
      },
    },
  };
  const horBarOpt = {
    indexAxis: 'y',
    responsive: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (c) => {
            console.log(c);
            const value = Number(c.dataset.data[c.dataIndex]);
            const title = c.label;
            const positiveOnly = value < 0 ? -value : value;
            // return positiveOnly.toLocaleString() + '₩';
            return c.yLabel;
          },
        },
      },
    },

    scales: {
      x: {
        display: false,
        barThickness: 8,

        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },

      y: {
        display: false,
        grid: {
          display: false,
          borderWidth: 0,
          zeroLineColor: '#0000000',
          lineWidth: [0],
        },
        ticks: {
          reverse: false,
        },
      },
    },
  };

  return (
    <>
      {errorPopup ? (
        <ErrorPopup
          context={apiError}
          errorMessage={errorMessage}
          setErrorPopup={setErrorPopup}
        />
      ) : null}
      {stat ? (
        <div className={styles.ArtStat}>
          <div>
            <div className={styles.artPieChart}>
              <div>
                {!approved ? null : (
                  <Doughnut
                    data={pieData}
                    width={192}
                    height={192}
                    options={pieOpt}
                  />
                )}
                <div>
                  <p>작품 개수</p>
                  <p>{uploaded.length}</p>
                </div>
              </div>
              <div>
                <ul>
                  <li>
                    승인완료 <span>{approved[0]}</span>
                  </li>
                  <li>
                    승인전 <span>{approved[1]}</span>
                  </li>
                  <li>
                    미승인 <span>{approved[2]}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.recentUploaded}>
              <p>최근 업로드작품</p>
              <table>
                <thead>
                  <tr>
                    <td>
                      <p>작품번호</p>
                    </td>
                    <td>
                      <p>작품</p>
                    </td>
                    <td>
                      <p>업로드날짜</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {!loading
                    ? uploadedPage[uploadedPageNum].map((value) => (
                        <tr key={value.id}>
                          <td>
                            <p>{value.id}</p>
                          </td>
                          <td>
                            <img
                              src={serverAddress + value.thumbnailPath}
                              alt="thumbnail"
                            />
                            <div>
                              <p>
                                {value.title.length > 22
                                  ? value.title.slice(0, 22) + '...'
                                  : value.title}
                              </p>
                              <p>
                                {value.description.length > 25
                                  ? value.description.slice(0, 25) + '...'
                                  : value.description}
                              </p>
                            </div>
                          </td>
                          <td>
                            <p>{value.createdDatetime.slice(0, 10)}</p>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
              <ul>
                <li>
                  {uploadedPageNum + 1}/{uploadedPage.length}
                </li>
                <li onClick={() => setUploadedPageNum(0)}>
                  <img src="../img/doubleArrowLeft.svg" />{' '}
                </li>
                <li
                  onClick={() =>
                    setUploadedPageNum((prev) => (prev > 0 ? prev - 1 : prev))
                  }
                >
                  <img src="../img/ArrowLeft.svg" />{' '}
                </li>
                <li
                  onClick={() =>
                    setUploadedPageNum((prev) =>
                      prev < uploadedPage.length - 1 ? prev + 1 : prev
                    )
                  }
                >
                  <img src="../img/ArrowRight.svg" />{' '}
                </li>
                <li onClick={() => setUploadedPageNum(uploadedPage.length - 1)}>
                  <img src="../img/doubleArrowRight.svg" />{' '}
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className={styles.playCount}>
              <p>
                작품 플레이 횟수 <span>(회)</span>
              </p>
              <p>{playCountWhole}</p>
              <div>
                <ul>
                  <li
                    style={{ color: playCountBy ? '#002e85' : '#707070' }}
                    onClick={() => setPlayCountBy(true)}
                  >
                    장소별
                  </li>
                  <li
                    style={{ color: !playCountBy ? '#002e85' : '#707070' }}
                    onClick={() => setPlayCountBy(false)}
                  >
                    작품별
                  </li>
                </ul>
                {!playCountBarData.labels ? null : (
                  <div>
                    <div
                      style={{
                        display: playCountBy === true ? 'block' : 'none',
                      }}
                    >
                      {playCountBy ? (
                        <Bar
                          width={playerCount.length * 36 + 'px'}
                          height={'108px'}
                          data={playerCountBarData}
                          options={barOpt}
                        />
                      ) : null}
                    </div>
                    <div
                      style={{
                        display: playCountBy === false ? 'block' : 'none',
                      }}
                    >
                      {playCountBy ? null : (
                        <Bar
                          width={playCount.length * 36 + 'px'}
                          height={'108px'}
                          data={playCountBarData}
                          options={barOpt}
                        />
                      )}
                    </div>
                    <ul>
                      {!playCountBarData.labels
                        ? null
                        : playCountBy === true
                        ? playerCountBarData.labels.map((value, idx) => {
                            if (value.length > 8) {
                              return (
                                <li key={idx}>
                                  <p>
                                    {value.slice(0, 4)}
                                    <br />
                                    {value.slice(4, 8)}
                                    <br />
                                    ...
                                  </p>
                                </li>
                              );
                            } else if (value.length > 4) {
                              return (
                                <li key={idx}>
                                  <p>
                                    {value.slice(0, 4)}
                                    <br />
                                    {value.slice(4, 8)}
                                  </p>
                                </li>
                              );
                            } else {
                              return (
                                <li key={idx}>
                                  <p>{value}</p>
                                </li>
                              );
                            }
                          })
                        : playCountBarData.labels.map((value, idx) => {
                            if (value.length > 8) {
                              return (
                                <li key={idx}>
                                  <p>
                                    {value.slice(0, 4)}
                                    <br />
                                    {value.slice(4, 8)}
                                    <br />
                                    ...
                                  </p>
                                </li>
                              );
                            } else if (value.length > 4) {
                              return (
                                <li key={idx}>
                                  <p>
                                    {value.slice(0, 4)}
                                    <br />
                                    {value.slice(4, 8)}
                                  </p>
                                </li>
                              );
                            } else {
                              return (
                                <li key={idx}>
                                  <p>{value}</p>
                                </li>
                              );
                            }
                          })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.playTime}>
              <p>
                작품 플레이 시간 <span>(분)</span>
              </p>
              <p>{parseInt(playtimeWhole / 60)}</p>
              <div>
                <ul>
                  <li
                    style={{ color: playtimeBy ? '#002e85' : '#707070' }}
                    onClick={() => setPlaytimeBy(true)}
                  >
                    장소별
                  </li>
                  <li
                    style={{ color: !playtimeBy ? '#002e85' : '#707070' }}
                    onClick={() => setPlaytimeBy(false)}
                  >
                    작품별
                  </li>
                </ul>
                {!playtimeBarData.labels ? null : (
                  <div>
                    <div
                      style={{
                        display: playtimeBy === true ? 'block' : 'none',
                      }}
                    >
                      {playtimeBy ? (
                        <Bar
                          width={playertime.length * 36 + 'px'}
                          height={'108px'}
                          data={playertimeBarData}
                          options={barOpt}
                        />
                      ) : null}
                    </div>
                    <div
                      style={{
                        display: playtimeBy === false ? 'block' : 'none',
                      }}
                    >
                      {playtimeBy ? null : (
                        <Bar
                          width={playtime.length * 36 + 'px'}
                          height={'108px'}
                          data={playtimeBarData}
                          options={barOpt}
                        />
                      )}
                    </div>
                    <ul>
                      {!playtimeBarData.labels
                        ? null
                        : playtimeBy === true
                        ? playertimeBarData.labels.map((value, idx) => {
                            if (value.length > 8) {
                              return (
                                <li key={idx}>
                                  <p>
                                    {value.slice(0, 4)}
                                    <br />
                                    {value.slice(4, 8)}
                                    <br />
                                    ...
                                  </p>
                                </li>
                              );
                            } else if (value.length > 4) {
                              return (
                                <li key={idx}>
                                  <p>
                                    {value.slice(0, 4)}
                                    <br />
                                    {value.slice(4, 8)}
                                  </p>
                                </li>
                              );
                            } else {
                              return (
                                <li>
                                  <p>{value}</p>
                                </li>
                              );
                            }
                          })
                        : playtimeBarData.labels.map((value, idx) => {
                            if (value.length > 8) {
                              return (
                                <li key={idx}>
                                  <p>
                                    {value.slice(0, 4)}
                                    <br />
                                    {value.slice(4, 8)}
                                    <br />
                                    ...
                                  </p>
                                </li>
                              );
                            } else if (value.length > 4) {
                              return (
                                <li key={idx}>
                                  <p>
                                    {value.slice(0, 4)}
                                    <br />
                                    {value.slice(4, 8)}
                                  </p>
                                </li>
                              );
                            } else {
                              return (
                                <li>
                                  <p>{value}</p>
                                </li>
                              );
                            }
                          })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.ProfitStat}>
          <div className={styles.left}>
            <div>
              <div>
                <p>
                  수익<span>(원)</span>
                </p>
                <p>{parseInt(playtimeWhole * profCalc).toLocaleString()} ₩</p>
              </div>
              <div>
                <p>작품 구독 업체 개수</p>
                {/* <p>{subscriber}</p> */}
                <p>4</p>
              </div>
            </div>
            <div className={styles.bestProfit}>
              <p>수익률 최상위 작품</p>
              {profitData.labels ? (
                <ul>
                  <li>
                    <ul>
                      {profitPage[0].map((value, idx) => {
                        if (idx < 5)
                          return (
                            <li key={value.id}>
                              <img
                                src={serverAddress + value.thumbnailPath}
                                alt="thumbnail"
                              />
                            </li>
                          );
                      })}
                    </ul>
                  </li>
                  <li>
                    <ul>
                      {profitPage[0].map((value, idx) => {
                        if (idx < 5)
                          return (
                            <li key={value.id}>
                              {/* <p>
                                {value.title.length > 25
                                  ? value.title.slice(0, 25) + '...'
                                  : value.title}
                              </p> */}
                            </li>
                          );
                      })}
                    </ul>
                  </li>
                  <li>
                    <Bar
                      height={profitData.labels.length * 42 + ' px'}
                      width={'75px'}
                      data={profitData}
                      options={horBarOpt}
                    />
                  </li>
                  <li>
                    <ul>
                      {profitPage[0].map((value, idx) => {
                        if (idx < 5)
                          return (
                            <li key={value.id}>
                              <p>
                                {(value.playtime * profCalc).toLocaleString()} ₩
                              </p>
                            </li>
                          );
                      })}
                    </ul>
                  </li>
                </ul>
              ) : null}
            </div>
            <div>
              <p>
                월별 추정 수익 <span>(최근 3개월 기준)</span>
              </p>
              {recentProfitData.labels ? (
                <ul>
                  <li>
                    <ul>
                      {recentMonth.map((value, idx) => (
                        <li key={idx}>
                          <p>{value}월</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <Bar
                      height={'96 px'}
                      data={recentProfitData}
                      options={horBarOpt}
                      width={'200px'}
                    />
                  </li>
                  <li>
                    <ul>
                      {recentProfit.map((value, idx) => (
                        <li key={idx}>
                          <p>{value.toLocaleString()} ₩</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <div className={styles.recentUploaded}>
                <p>
                  작품별 수익<span>(%)</span>
                </p>
                <table>
                  <thead>
                    <tr>
                      <td>
                        <p>작품번호</p>
                      </td>
                      <td>
                        <p>작품</p>
                      </td>
                      <td>
                        <p>수익</p>
                      </td>
                      <td>
                        <p>업로드날짜</p>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {profitPage[0]
                      ? profitPage[profitPageNum].map((value) => (
                          <tr key={value.id}>
                            <td>
                              <p>{value.id}</p>
                            </td>
                            <td>
                              <img
                                src={serverAddress + value.thumbnailPath}
                                alt="thumbnail"
                              />
                              <div>
                                {/* <p>
                                  {value.title.length > 30
                                    ? value.title.slice(0, 30) + '...'
                                    : value.title}
                                </p> */}
                                {/* <p>
                                  {value.description.length > 50
                                    ? value.description.slice(0, 50) + '...'
                                    : value.description}
                                </p> */}
                              </div>
                            </td>
                            <td>
                              <p>
                                {parseInt(
                                  (value.playtime /
                                    (playtimeWhole * profCalc)) *
                                    100
                                )}
                              </p>
                            </td>
                            <td>
                              {/* <p>{value.createdDatetime.slice(0, 10)}</p> */}
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
                <ul>
                  <li>
                    {profitPageNum + 1}/{profitPage.length}
                  </li>
                  <li onClick={() => setProfitPageNum(0)}>
                    <img src="../img/doubleArrowLeft.svg" />{' '}
                  </li>
                  <li
                    onClick={() =>
                      setProfitPageNum((prev) => (prev > 0 ? prev - 1 : prev))
                    }
                  >
                    <img src="../img/ArrowLeft.svg" />{' '}
                  </li>
                  <li
                    onClick={() =>
                      setProfitPageNum((prev) =>
                        prev < profitPage.length - 1 ? prev + 1 : prev
                      )
                    }
                  >
                    <img src="../img/ArrowRight.svg" />{' '}
                  </li>
                  <li onClick={() => setProfitPageNum(profitPage.length - 1)}>
                    <img src="../img/doubleArrowRight.svg" />{' '}
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.placeProfit}>
              <p>
                장소별 수익률 <span>(%)</span>
              </p>
              <div>
                {playertimeBarData.labels ? (
                  <div>
                    <Bar
                      width={playertime.length * 36 + 'px'}
                      height={'108px'}
                      data={playerProfitData}
                      options={percentBarOpt}
                    />
                    <ul>
                      {playertimeBarData.labels.map((value, idx) => {
                        if (value.length > 8) {
                          return (
                            <li key={idx}>
                              <p>
                                {value.slice(0, 4)}
                                <br />
                                {value.slice(4, 8)}
                                <br />
                                ...
                              </p>
                            </li>
                          );
                        } else if (value.length > 4) {
                          return (
                            <li key={idx}>
                              <p>
                                {value.slice(0, 4)}
                                <br />
                                {value.slice(4, 8)}
                              </p>
                            </li>
                          );
                        } else {
                          return (
                            <li>
                              <p>{value}</p>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtStat;
