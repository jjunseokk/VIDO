import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import px2vw from '../../util/px2vw';


const DIV = styled.div`
    width: ${px2vw(120)};
    margin: 0 auto;
    text-align: center;
    .subTitle{
        font: 700 24px/54.52px ${({ theme }) => theme.noto};
        color: ${({ color }) => color};
    }
    .averageMultiple{
        font: 500 10px/14.8px ${({ theme }) => theme.noto};
        color: #707070;
        margin-bottom: 20px;
        >span{
            font: 700 10px/14.8px ${({ theme }) => theme.noto};
            color: ${({ color }) => color};
            
        }
    }
    @media screen and (max-width : 2000px) {
        width: 100%;
    }
`
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const BarVerticalChart = ({ page, color, score, label, rawData }) => {
    const { t } = useTranslation();
    const pieData = {
        labels: label,
        datasets: [
            {
                data: [...rawData],

                backgroundColor: ['#D9D9D9', color,],
                borderWidth: 0,
                barThickness: 30,

            },
        ],

    };
    const pieOpt = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
            },
            title: {
                display: false,
            },
            tooltip: {
                display: false,
            },
            datalabels: {
                display: false,
            },
        },
        scales: {
            y: {
                display: false,
                grid: {
                    display: false,
                },
            },
            x: {
                display: true,
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 10,
                    },
                    color: '#707070',
                    autoSkip: false,
                    maxRotation: 0,
                },
            },
        },
    };

    return (
        <DIV color={color}>
            <p className='subTitle'>{score}</p>
            <p className='averageMultiple'>{t("mypage.dashboard.summary.revenue_analysis.all_average_multiple")}
                {rawData[1] == 0 || rawData[1] == 0 ? <span>0{t("mypage.dashboard.summary.revenue_analysis.multiply")} </span> : <span>{(rawData[1] / rawData[0]).toFixed(1)}{t("mypage.dashboard.summary.revenue_analysis.multiply")}</span>}
            </p>
            {rawData ? <Bar data={pieData} options={pieOpt} /> : null}
        </DIV>
    )
}

export default BarVerticalChart;