import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import RenderPagination from '../../Components/RenderPagination';

const DIV = styled.div`
    height: ${({ height }) => height}px;
    width: 400px;
    canvas {
        height: 100% !important;
    }
`;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarHorizontalChart = ({ page, color, score, label, rawData, mode, height }) => {
    const { t } = useTranslation();

    const max = Math.max.apply(null, rawData)

    const pieData = {
        labels: label,
        datasets: [
            {
                data: rawData,
                backgroundColor: [color],
                borderWidth: 0,
                barThickness: 20,
            },
        ],
    };

    const pieOpt = {
        responsive: true,
        indexAxis: 'y',
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
                enabled: false,
            },
            datalabels: {
                display: true,
                color: '#000',
                anchor: 'end',
                align: 'end',
                font: {
                    size: 12,
                    weight: 700,
                    lineHeight: 17.76
                },
                formatter: (value) => {
                    return value + ` / ${((value / score) * 100).toFixed(1)}%`
                }
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
                    display: true,
                },
                ticks: {
                    font: {
                        size: 1,
                    },
                    color: '#707070',
                    autoSkip: false,
                    maxRotation: 0,
                },
                max: max + 30,

            },
        },
    };


    return (
        <DIV color={color} height={height} >
            {rawData ? <Bar data={pieData} options={pieOpt} /> : null}
        </DIV >
    );
};

export default BarHorizontalChart;