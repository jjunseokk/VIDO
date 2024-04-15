import React from 'react'
import BarVerticalChart from './BarVerticalChart'

const SummaryRevenueAnalysis = ({ page, color, score, label, rawData, title, unit }) => {

    const returnScore = Math.floor(score)
    const newScore = returnScore?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div>
            <p className='title'>{title} <span>{unit}</span></p>
            <div className='chart'>
                <BarVerticalChart
                    page={page}
                    color={color}
                    score={newScore}
                    label={label}
                    rawData={rawData}
                />
            </div>
        </div>
    )
}

export default SummaryRevenueAnalysis