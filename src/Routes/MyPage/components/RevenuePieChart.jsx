import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenuePieChart = ({ rawData, label }) => {
    const pieData = {
        labels: label,
        datasets: [
            {
                data: [...rawData],

                backgroundColor: ['#002E85', '#0054A6', '#0077B7', '#D9D9D9'],
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
                        const label = context.label.length > 10
                            ? context.label.substring(0, 10) + '...'
                            : context.label;
                        return `${label} : ${context.raw.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`;
                    },
                },
            },
        },
    };
    return (
        <div className='Doughnut'>
            {rawData ? <Doughnut data={pieData} options={pieOpt} /> : null}
        </div>
    )
}

export default RevenuePieChart