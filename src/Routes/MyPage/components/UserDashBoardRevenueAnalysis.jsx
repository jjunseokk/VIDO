import React, { useEffect, useContext } from 'react'
import { UserDashBoardRevenueAnalysisStyle } from './UserDashBoardRevenueAnalysisStyle'
import { useTranslation } from 'react-i18next'
import SummaryItemBox from './SummaryItemBox'
import BarHorizontalChart from './BarHorizontalChart'
import RevenuePieChart from './RevenuePieChart'
import RenderPagination from '../../Components/RenderPagination'
import { useState } from 'react'
import AxiosConfig from '../../../AxiosConfig'
import { UserContext } from '../../ContextProvider'
import styled from 'styled-components'
import { replaceAll } from '../../util/replaceAll';

const Percent = styled.div`
  width: ${({ percent }) => percent}%;
  height: 100%;
  position: absolute;
  top: 0px;
  background: #002E85;
`

const UserDashBoardRevenueAnalysis = ({ mode, start, end, term, refundData }) => {
    const { serverAddress } = useContext(UserContext);
    const { t } = useTranslation();
    const [getPage, setGetPage] = useState(1);
    const [fundDetail, setFundDetail] = useState()




    const getDashBoardRefundDetail = () => {
        AxiosConfig.get(
            `/user/dashboard/refund/detail?start=${start}&end=${end}&p=${getPage}`
        ).then((res) => {
            setFundDetail(res.data.result)
        })
    }

    // 수익률 최상위 작품
    const top3 = refundData?.max?.top3?.map((item) => item.amount);
    const sum = top3.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const topData = [...top3, refundData?.userTotal - sum];
    const label = refundData?.max?.top3?.map((item) => item.mediaArt.title);
    const labelData = [...label, `${t("mypage.dashboard.revenue_analysis.etc")}`]


    useEffect(() => {
        getDashBoardRefundDetail()
    }, [getPage, start, end])

    return (
        <UserDashBoardRevenueAnalysisStyle mode={mode}>
            <div>
                <p>
                    {t("mypage.dashboard.revenue_analysis.title")}
                </p>
                <div className='revenue_analysis_score'>
                    <SummaryItemBox
                        bg={"#0077B7"}
                        title={t("mypage.dashboard.summary.revenue_analysis.lowest_return")}
                        unit={t("mypage.dashboard.summary.revenue_analysis.return_unit")}
                        data={refundData?.min}
                        type={'analysis'}
                        term={term}
                    />
                    <SummaryItemBox
                        bg={"#0054A6"}
                        title={t("mypage.dashboard.summary.revenue_analysis.highest_return")}
                        unit={t("mypage.dashboard.summary.revenue_analysis.return_unit")}
                        data={refundData?.max}
                        type={'analysis'}
                        term={term}
                    />
                    <SummaryItemBox
                        bg={"#002E85"}
                        title={t("mypage.dashboard.summary.revenue_analysis.average_return")}
                        unit={t("mypage.dashboard.summary.revenue_analysis.return_unit")}
                        data={refundData?.avg}
                        type={'analysis'}
                        term={term}
                    />
                </div>
                <div className='line'></div>
                <div className='revenue_analysis_section'>
                    <p className='revenue_analysis_title'>
                        {t("mypage.dashboard.revenue_analysis.art_revenue")}
                    </p>
                    <div className='revenue_area'>
                        <div className='revenue_area_chart'>
                            <p>{t("mypage.dashboard.revenue_analysis.top_revenue")}</p>
                            <RevenuePieChart
                                rawData={topData}
                                label={labelData}
                            />
                            <div className='revenue_top3'>
                                {refundData?.max.top3 == '' ? (
                                    <p>{t("mypage.dashboard.no_data")}</p>
                                ) : (
                                    refundData?.max?.top3?.map((value, idx) => {
                                        const totalAmount = refundData.userTotal;
                                        const amount = value.amount;

                                        const totalData = (amount / totalAmount) * 100;
                                        const totalDataFixed = totalData.toFixed(1);

                                        return (
                                            <div key={idx}>
                                                <p className='number'>{idx + 1}</p>
                                                <img src={serverAddress + value.mediaArt.thumbnailPath} alt={`Thumbnail for ${value.mediaArt.title}`} />
                                                <div>
                                                    <p>{value.mediaArt.title}</p>
                                                    <p>{value.mediaArt.description}</p>
                                                </div>
                                                <div className='chart'>
                                                    <Percent percent={totalDataFixed}></Percent>
                                                </div>
                                                <span>{totalDataFixed}%</span>
                                            </div>
                                        );
                                    })
                                )}

                            </div>
                        </div>
                        <table className='revenue_area_table'>
                            <thead>
                                <th>{t("mypage.dashboard.revenue_analysis.art_revenue_table.art_num")}</th>
                                <th>{t("mypage.dashboard.revenue_analysis.art_revenue_table.art_name")}</th>
                                <th>{t("mypage.dashboard.revenue_analysis.art_revenue_table.upload_date")}</th>
                                <th>{t("mypage.dashboard.revenue_analysis.art_revenue_table.revenue")}</th>
                            </thead>

                            {fundDetail?.data.map((value) => {
                                return (
                                    <tr>
                                        <td className='number'>{value.mediaArt.id}</td>
                                        <td className='art'>
                                            <img src={serverAddress + value.mediaArt.thumbnailPath} alt="" />
                                            <div>
                                                <p>{value.mediaArt.title}</p>
                                                <p>{value.mediaArt.description}</p>
                                            </div>
                                        </td>
                                        <td className='upload'>{replaceAll(value.mediaArt.createdDatetime.slice(0, 10), '-', '. ')}</td>
                                        <td className='revenue'>{value.count?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    </tr>
                                )
                            })}
                            {fundDetail?.totalPage == 0 ? <div className='noData'>{t("mypage.dashboard.no_data")}</div> :
                                <RenderPagination mode={mode} totalPage={fundDetail?.totalPage} setPage={setGetPage} page={Number(getPage)} />
                            }
                        </table>

                    </div>

                </div>
            </div>
        </UserDashBoardRevenueAnalysisStyle>
    )
}

export default UserDashBoardRevenueAnalysis