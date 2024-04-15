import React from 'react'
import * as S from './UserDashBoardSummaryStyle';
import DownArrow from '../../../../img/downArrow.svg'
import upArrow from '../../../../img/upArrow.svg'
import { useTranslation } from 'react-i18next';

const SummaryItemBox = ({ bg, title, data, unit, type, term }) => {
    const { t } = useTranslation();
    // console.log(data)
    // const reData = data?.user;
    const reData = data?.user ? data?.user : data?.user;
    const integerPart = Math.floor(reData)
    const newData = integerPart?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    const termSlice = term?.lastIndexOf(' ');
    const termWithoutAfterLastSpace = termSlice !== -1 ? term?.split(' ')[1] : term;
    return (
        <>
            {type === "analysis" ?
                (<S.UserDashboardSummaryBox color={data?.prev > data?.user ? "down" : data?.prev == data?.user ? "same" : "up"} length={newData.length >= 4 ? true : false} width={295} height={47} padding={10} bg={bg}>
                    <p>{title} <span>{unit}</span></p>
                    <p>{
                        newData}
                        {term == 'All' || term == "전체기간" ? null :
                            <img src={data?.prev > data?.user ? DownArrow : upArrow} />}
                    </p>
                    {term == 'All' || term == "전체기간" ? <p>-</p> : (
                        <p>{t("mypage.dashboard.summary.last")} {termWithoutAfterLastSpace} {t("mypage.dashboard.summary.contrast")}</p>)

                    }
                    {term == 'All' || term == "전체기간" ? null : (data?.prev == 0 && data?.user == 0 ?
                        <p> 0%</p>
                        : data?.prev == 0 || data?.user == 0 ?
                            <p> 100%</p>
                            : <p> {(data?.user / (data?.prev / 100)).toFixed(2)}%</p>)
                    }

                </S.UserDashboardSummaryBox >) :
                (
                    <S.UserDashboardSummaryBox color={data?.prev > data?.user ? "down" : data?.prev == data?.user ? "same" : "up"} width={253} height={69} padding={16} bg={bg}>
                        <p>{title} <span>{unit}</span></p>
                        <div>
                            <p>
                                {newData}
                                {term == 'All' || term == "전체기간" ? null :
                                    <img src={data?.prev > data?.user ? DownArrow : data?.prev == data?.user ? null : upArrow} />}
                            </p>
                            {term == 'All' || term == "전체기간" ? <p>-</p> : (
                                <p>{t("mypage.dashboard.summary.last")} {termWithoutAfterLastSpace} {t("mypage.dashboard.summary.contrast")}
                                    {data?.prev == 0 && data?.user == 0 ?
                                        <span> 0%</span>
                                        : data?.prev == 0 || data?.user == 0 ?
                                            <span> 100%</span>
                                            : <span> {(data?.user / (data?.prev / 100)).toFixed(2)}%</span>}
                                </p>

                            )}
                        </div>
                    </S.UserDashboardSummaryBox>
                )
            }
        </>

    )
}

export default SummaryItemBox