import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import px2vw from '../../util/px2vw';

ChartJS.register(ArcElement, Tooltip, Legend);


const DIV = styled.div`
  position: relative;
  margin: 0 auto;
  width: ${px2vw(120)};
  .chartScore{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .totalPercentScore{
      font: 700 30px/44.4px ${({ theme }) => theme.noto};
      color: ${({ color }) => color};
    }
    .totalPercent{
      font: 500 10px/14.8px ${({ theme }) => theme.noto};
      span{
        font: 700 10px/14.8px ${({ theme }) => theme.noto};
        color: ${({ color }) => color};
      }
    }
    .total{
      font: 400 12px/17.76px ${({ theme }) => theme.noto};
      color: #707070;
    }
    .totalScore{
     
      font: 700 24px/30.52px ${({ theme }) => theme.noto};
      color: #151515;
    }
  }

  @media screen and (max-width : 2000px){
    width: 100%;
  }
`;

const PieChart = ({ rawData, label, score, color, page }) => {
  const { t } = useTranslation();
  const pieData = {
    labels: label,
    datasets: [
      {
        data: [...rawData],

        backgroundColor: [color, '#D9D9D9', '#929292'],
        borderWidth: 0,
      },
    ],
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
        callbacks: {
          label: (context) => {
            return `${context.label}`;
          },
        },
      },
    },
  };



  return (
    <DIV color={color} >
      {rawData ? <Doughnut data={pieData} options={pieOpt} /> : null}
      <div div className='chartScore' >
        {page === 'summary' ?
          (
            <>
              <p className='totalPercentScore'>{score}</p>
              <p className='totalPercent'>
                {t("mypage.dashboard.summary.art_analysis.summary_unit")}
                {rawData[0] == 0 || rawData[1] == 0 ? <span>0%</span>
                  : <span>{((rawData[0] / (rawData[0] + rawData[1])) * 100).toFixed(2)}%</span>}
              </p>
            </>
          ) : (
            <>
              <p className='total'>{t("mypage.dashboard.summary.art_analysis.art_analysis_unit")}</p>
              <p className='totalScore'>{score}</p>
            </>
          )
        }

      </div>
    </DIV >
  );
};

export default PieChart;
