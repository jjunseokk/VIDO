import React, { useState, useEffect } from 'react';
import styles from './VerticalBar.module.scss';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalBar = ({
  label = [
    ' 1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
  ],
  dataset = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ],
  n = 12,
}) => {
  const [page, setPage] = useState(0);
  const [pageArr, setPageArr] = useState([]);
  const [graphData, setGraphData] = useState();
  const [loading, setLoading] = useState(true);
  const dataLength = label.length;
  const getData = () => {
    let tempArr = [];
    for (let i = 0; i < label.length; i += n) {
      tempArr.push({
        label: label.slice(i, i + n),
        dataset: dataset.slice(i, i + n),
      });
    }
    setPageArr(tempArr);
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  useEffect(() => {
    if (pageArr[0]) {
      setGraphData({
        labels: pageArr[page].label,
        datasets: [
          {
            data: pageArr[page].dataset,
            backgroundColor: ['#002E85'],
            barThickness: 12,
            maxBarThickness: 12,
            minBarLength: 10,
          },
        ],
      });
      return setLoading(false);
    }
  }, [pageArr, page]);

  // const data = {
  //   labels: pageArr[page].label,
  //   datasets: [
  //     {
  //       data: pageArr[page].dataset,
  //       backgroundColor: ['#002E85'],
  //       barThickness: 12,
  //       maxBarThickness: 12,
  //       minBarLength: 10,
  //     },
  //   ],
  // };

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
        formatter: (val) => val.toLocaleString(),
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

  return (
    <>
      {!loading ? (
        <div className={styles.VerticalBar}>
          {dataLength > n ? (
            <>
              {page > 0 ? (
                <button
                  style={{ left: '0px' }}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <img src="../img/graphBtnLeft.svg" />
                </button>
              ) : null}
              {page < pageArr.length - 1 ? (
                <button
                  style={{ right: '0px' }}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  <img src="../img/graphBtnRight.svg" />
                </button>
              ) : null}
            </>
          ) : null}
          <div
            style={{
              width: `${pageArr[page].label.length * 36}px`,
              height: '124px',
            }}
          >
            <Bar options={barOpt} data={graphData} />{' '}
            <ul>
              {pageArr[page].label.map((value, idx) => (
                <li key={idx}>
                  <p>{value.length < 8 ? value : value.slice(0, 6) + '...'}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default VerticalBar;
