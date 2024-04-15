import React from 'react'
import PieChart from './PieChart';

export const SummaryArtAnalysisChart = ({ page, color, score, label, rawData, title }) => {
    return (
        <div>
            <p className='title'>{title}</p>
            <div className='chart'>
                <PieChart
                    page={page}
                    color={color}
                    score={score}
                    label={label}
                    rawData={rawData} />
            </div>
        </div>
    )
}
