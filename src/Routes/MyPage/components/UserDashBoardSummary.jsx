import React from 'react'
import * as S from './UserDashBoardSummaryStyle';
import { useTranslation } from 'react-i18next';
import SummaryItemBox from './SummaryItemBox';
import { SummaryArtAnalysisChart } from './SummaryArtAnalysisChart';
import SummaryRevenueAnalysis from './SummaryRevenueAnalysis';

const UserDashBoardSummary = ({ mode, data, start, end, term, refundData }) => {
    const { t } = useTranslation();
    // console.log(refundData)
    return (
        <S.UserDashboardSummaryStyle>
            <div>
                <p>
                    {t("mypage.dashboard.art_analysis.title")}
                </p>
                <div className='art_analysis_area'>
                    <div className='art_analysis_score'>
                        <SummaryItemBox
                            bg={"#0077B7"}
                            title={t("mypage.dashboard.summary.art_analysis.upload")}
                            data={data?.upload}
                            term={term}
                        />
                        <SummaryItemBox
                            bg={"#0054A6"}
                            title={t("mypage.dashboard.summary.art_analysis.views")}
                            data={data?.views}
                            term={term}
                        />
                        <SummaryItemBox
                            bg={"#002E85"}
                            title={t("mypage.dashboard.summary.art_analysis.download")}
                            data={data?.download}
                            term={term}
                        />
                    </div>
                    <div className='art_analysis_PieChart'>
                        <SummaryArtAnalysisChart
                            page={'summary'}
                            color={'#0077B7'}
                            score={data.upload.user}
                            label={[
                                `${t("mypage.dashboard.summary.art_analysis.art_analysis_chart.my_upload")}`,
                                `${t("mypage.dashboard.summary.art_analysis.art_analysis_chart.all_upload")}`
                            ]}
                            rawData={[data.upload.user, data.upload.global - data.upload.user]}
                            title={t("mypage.dashboard.summary.art_analysis.upload")}
                        />
                        <SummaryArtAnalysisChart
                            page={'summary'}
                            color={'#0054A6'}
                            score={data.views.user}
                            label={[
                                `${t("mypage.dashboard.summary.art_analysis.art_analysis_chart.my_views")}`,
                                `${t("mypage.dashboard.summary.art_analysis.art_analysis_chart.all_views")}`
                            ]}
                            rawData={[data.views.user, data.views.global - data.views.user]}
                            title={t("mypage.dashboard.summary.art_analysis.views")}
                        />
                        <SummaryArtAnalysisChart
                            page={'summary'}
                            color={'#002E85'}
                            score={data.download.user}
                            label={[
                                `${t("mypage.dashboard.summary.art_analysis.art_analysis_chart.my_download")}`,
                                `${t("mypage.dashboard.summary.art_analysis.art_analysis_chart.all_download")}`
                            ]}
                            rawData={[data.download.user, data.download.global - data.download.user]}
                            title={t("mypage.dashboard.summary.art_analysis.download")}
                        />
                    </div>
                </div>
                <p>
                    {t("mypage.dashboard.revenue_analysis.title")}
                </p>
                <div className='art_analysis_area'>
                    <div className='art_analysis_score'>
                        <SummaryItemBox
                            bg={"#0077B7"}
                            title={t("mypage.dashboard.summary.revenue_analysis.lowest_return")}
                            data={refundData?.min}
                            term={term}
                            unit={t("mypage.dashboard.summary.revenue_analysis.return_unit")}
                        />
                        <SummaryItemBox
                            bg={"#0054A6"}
                            title={t("mypage.dashboard.summary.revenue_analysis.highest_return")}
                            data={refundData?.max}
                            term={term}
                            unit={t("mypage.dashboard.summary.revenue_analysis.return_unit")}
                        />
                        <SummaryItemBox
                            bg={"#002E85"}
                            title={t("mypage.dashboard.summary.revenue_analysis.average_return")}
                            data={refundData?.avg}
                            term={term}
                            unit={t("mypage.dashboard.summary.revenue_analysis.return_unit")}
                        />
                    </div>
                    <div className='art_analysis_BarChart'>
                        <SummaryRevenueAnalysis
                            page={'summary'}
                            color={'#0077B7'}
                            score={refundData?.min.user}
                            label={[
                                `${t("mypage.dashboard.summary.revenue_analysis.revenue_analysis_chart.all_average")}`,
                                `${t("mypage.dashboard.summary.revenue_analysis.revenue_analysis_chart.my_revenue")}`
                            ]}
                            rawData={[refundData?.min.global, refundData?.min.user]}
                            title={t("mypage.dashboard.summary.revenue_analysis.lowest_return")}
                            unit={t("mypage.dashboard.summary.revenue_analysis.return_unit")}
                        />
                        <SummaryRevenueAnalysis
                            page={'summary'}
                            color={'#0054A6'}
                            score={refundData?.max.user}
                            label={[
                                `${t("mypage.dashboard.summary.revenue_analysis.revenue_analysis_chart.all_average")}`,
                                `${t("mypage.dashboard.summary.revenue_analysis.revenue_analysis_chart.my_revenue")}`
                            ]}
                            rawData={[refundData?.max.global, refundData?.max.user]}
                            title={t("mypage.dashboard.summary.revenue_analysis.highest_return")}
                            unit={t("mypage.dashboard.summary.revenue_analysis.return_unit")}
                        />
                        <SummaryRevenueAnalysis
                            page={'summary'}
                            color={'#002E85'}
                            score={refundData?.avg.user}
                            label={[
                                `${t("mypage.dashboard.summary.revenue_analysis.revenue_analysis_chart.all_average")}`,
                                `${t("mypage.dashboard.summary.revenue_analysis.revenue_analysis_chart.my_revenue")}`
                            ]}
                            rawData={[refundData?.avg.global, refundData?.avg.user]}
                            title={t("mypage.dashboard.summary.revenue_analysis.average_return")}
                            unit={t("mypage.dashboard.summary.revenue_analysis.return_unit")}
                        />
                    </div>
                </div>
            </div>
        </S.UserDashboardSummaryStyle>
    )
}

export default UserDashBoardSummary