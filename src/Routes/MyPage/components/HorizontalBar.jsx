import React, { useEffect, useState } from 'react';
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
import DashboardSingleArt from './DashboardSingleArt';
import styles from './DashBoardHorBarGraph.module.scss';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const HorizontalBar = ({ label, dataset, monthly = false }) => {
  const [graphData, setGraphData] = useState([]);

  const barData = {
    labels: label,
    datasets: [
      {
        label: '',
        data: dataset,
        backgroundColor: '#002E85',
      },
    ],
  };
  const opt = {
    maintainAspectRatio: false,
    responsive: true,

    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      datalabels: {
        display: false,
      },
      tooltip: {
        enabled: false,
        callbacks: {
          label: (c) => {
            console.log(c);
            const value = Number(c.dataset.data[c.dataIndex]);
            const title = c.label;
            const positiveOnly = value < 0 ? -value : value;
            // return positiveOnly.toLocaleString() + '₩';
            return positiveOnly;
          },
        },
      },
    },
    layout: {
      paddingTop: 0,
      // padding: {
      //   top: 4,
      //   bottom: 4,
      // },
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
    datasets: {
      bar: {
        maxBarThickness: 8,
      },
    },
  };
  return (
    <div
      style={{
        height: monthly ? '100px' : `${label.length * 38}px`,
        width: monthly ? '208px' : '75px',
      }}
    >
      <Bar options={opt} data={barData} />
    </div>
  );
};

export default HorizontalBar;
