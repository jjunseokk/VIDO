import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import px2vw from "../util/px2vw";
import { useTranslation } from "react-i18next";
import { i18n } from "../../language/i18n";
import { useCookies } from "react-cookie";
import DownloadButton from "./Components/DownloadButton";
import KaKaoBtn from '../Components/KaKaoBtn';

const Report = styled.div`
  margin-top: ${px2vw(40)};
  div.h40 {
    width: 40px;
  }

  div.discover {
    margin-left: ${px2vw(450)};

    > div.select_year {
      display: flex;
      cursor: pointer;
      background-color: #f7f7f7;
      border: 1px solid #e0e0e0;
      width: 140px;
      height: 30px;
      vertical-align: center;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      padding-right: 10px;
      font: 500 16px/24px ${({ theme }) => theme.noto};
      color: #707070;

      > img {
        height: 30px;
      }
    }

    > div.year_dropdown {
      position: absolute;
      width: 140px;
      background-color: #FFFFFF;
      box-shadow: 0px 3px 6px #00000029;

      > div.item {
        cursor: pointer;
        height: 40px;
        font: 500 16px/27px ${({ theme }) => theme.noto};
        color: #707070;
        vertical-align: center;
        align-items: center;
        display: flex;
        margin-left: 20px;
      }

      > div.item:hover {
        color: ${({ theme }) => theme.highlightColor};
      }

    }

    > div.year_row {
      display: flex;
      margin-top: 30px;
      gap: 40px;

      > div.item {
        cursor: pointer;
        display: flex;
        width: ${px2vw(180)};
        height: 36px;
        border: 1px solid #9d9d9d;
        border-radius: 31px;
        vertical-align: center;
        justify-content: center;
        align-items: center;
        font: 500 18px/24px ${({ theme }) => theme.noto};
        color: #707070;
      }

      > div.selected {
        color: ${({ theme }) => theme.highlightColor};
        font: 700 18px/24px ${({ theme }) => theme.noto};
        border: 1px solid ${({ theme }) => theme.highlightColor};;
      }
    }
  }

  div.more {
    > hr {
      border-top: 1px solid #e0e0e0;
      margin-top: ${px2vw(64)};
    }

    > div {
      cursor: pointer;
      position: absolute;
      display: flex;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      border: 1px solid #c1c1c1;
      border-radius: 24px;
      width: ${px2vw(148)};
      height: 48px;
      background-color: white;
      vertical-align: center;
      justify-content: center;
      align-items: center;
      font: 400 16px/24px ${({ theme }) => theme.noto};
    }
  }
`;

const ReportPage = ({ mode }) => {
    const { t } = useTranslation();

    const [html, setHtml] = useState({ __html: null });
    const [selectedYear, setSelectedYear] = useState("0");
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [isDropdown, setIsDropdown] = useState(false);
    const [monthList, setMonthList] = useState([]);
    const [splitMonthList, setSplitMonthList] = useState([]);
    const [filteredMonthList, setFilteredMonthList] = useState([]);
    const [disabledMonthList, setDisabledMonthList] = useState([]);
    const [isMore, setIsMore] = useState(false);
    const [yearList, setYearList] = useState([]);

    const yearDropdownRef = useRef(null);

    const splitRows = () => {
        let i = 0;
        const list = [];
        filteredMonthList.map((value, index) => {
            (list[i] || (list[i] = [])).push(value);
            if ((index + 1) % 5 === 0) {
                i++;
            }
        });
        setSplitMonthList(list);
    }

    const filterRows = () => {
        if (selectedYear === "0") {
            setFilteredMonthList(monthList);
        } else {
            setFilteredMonthList(monthList.filter((value) => value.includes(selectedYear)));
        }
    }


    const getHtml = async (fileName) => {
        const result = await axios.get(`/reports/${fileName}.html`);
        const data = result.data;
        if (data.indexOf("<title>VIDO</title>") > -1) { //404 페이지 인지 확인
            throw ("Not found");
        }
        const replaced = data.replaceAll("이 메일이 잘 안보이시나요?", "");
        setHtml({ __html: replaced });
    }

    const getExistHtml = async () => {
        let num = 0;
        while (num < monthList.length) {
            try {
                await getHtml(monthList[num]);
                setSelectedMonth(monthList[num]);
                break;
            } catch (_) {
                console.log("error");
                setDisabledMonthList(disabledMonthList.concat(monthList[num]));
                num++;
            }
        }
        filterRows();
    }

    const convertLangValue = (value) => {
        let splitted = value.split(".");
        let converted = `${splitted[0]}${t("report.year")}${t(`report.month_list.${Number(splitted[1]) - 1}`)}`;
        converted = converted.concat(t("report.month"));

        return converted
    }

    const onMoreClick = () => {
        setIsMore(!isMore);
    }

    const onDropdownClick = () => {
        setIsDropdown(!isDropdown);
    }

    const onMonthClick = async (id) => {
        try {
            await getHtml(id);
            setSelectedMonth(id);
        } catch (_) {
            alert("아직 게시글이 올라오지 않았습니다.");
        }
    }

    const onYearClick = (value) => {
        setSelectedYear(value);
        setIsDropdown(false);
        setIsMore(false);
        filterRows();
    }

    const handleClickOutside = (event) => {
        if (yearDropdownRef && !yearDropdownRef.current.contains(event.target)) {
            setIsDropdown(false);
        }
    }

    useEffect(() => {
        if (monthList.length === 0) {
            let date = new Date("2022-11-01");
            const now = new Date();
            const set = new Set();

            do {
                date.setMonth(date.getMonth());
                monthList.push(`${date.getFullYear()}.${date.getMonth() + 1}`)
                set.add(date.getFullYear());
                date.setMonth(date.getMonth() + 1);
            } while (date <= now)

            setMonthList(monthList.reverse());
            set.add("0");
            setYearList(Array.from(set).reverse());

            getExistHtml();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        }
    }, []);

    useEffect(() => {
        splitRows();
    }, [filteredMonthList]);

    useEffect(() => {
        filterRows();
    }, [selectedYear]);

    useEffect(() => {
    }, [disabledMonthList]);

    useEffect(() => {
        if (i18n.language === "en") {
            const index = yearList.indexOf("전체보기");
            yearList[index] = t("report.show_all");
        } else {
            const index = yearList.indexOf("Show All");
            yearList[index] = t("report.show_all");
        }
        splitRows();
    }, [i18n.language]);

    return (
        <Report mode={mode}>
            {/* <KaKaoBtn /> */}
            <div className={"discover"}>
                <div className={"select_year"} ref={yearDropdownRef} onClick={onDropdownClick}>
                    {selectedYear === "0" ? t("report.show_all") : selectedYear}
                    <img src={"/img/arrow_dropdown.svg"} alt={"language_dropdown"} />
                </div>
                <div className={"year_dropdown"} style={isDropdown ? { display: "block" } : { display: "none" }}>
                    {
                        yearList.map(value => (
                            <div className={"item"} onClick={() => onYearClick(value)}>{value === "0" ? t("report.show_all") : value}</div>
                        ))
                    }
                </div>
                {splitMonthList.length === 0 ? null : isMore ? splitMonthList.map(value => {
                    return (
                        <div className={"year_row"} style={{ marginTop: "40px" }}>
                            {
                                value.map((_, i) =>
                                    <div className={`item ${selectedMonth === value[i] ? "selected" : ""}`} id={value[i]}
                                        onClick={() => onMonthClick(value[i])}>
                                        {convertLangValue(value[i])}
                                    </div>
                                )
                            }
                        </div>
                    )
                }) : splitMonthList.slice(0, 1).map(value => {
                    return (
                        <div className={"year_row"} style={{ marginTop: "40px" }}>
                            {
                                value.map((_, i) =>
                                    <div className={`item ${selectedMonth === value[i] ? "selected" : ""}`} id={value[i]} onClick={() => onMonthClick(value[i])}>
                                        {convertLangValue(value[i])}
                                    </div>
                                )
                            }
                        </div>
                    )
                })}
            </div>
            {
                splitMonthList.length < 2 ? <div style={{ marginTop: px2vw(64) }} /> : (
                    <div className={"more"}>
                        <hr />
                        <div onClick={onMoreClick}>{isMore ? t("report.close") : t("report.more")}</div>
                    </div>
                )
            }

            <div className={"html"}>
                {html.__html ? <div dangerouslySetInnerHTML={html} /> : null}
            </div>
            <DownloadButton date={selectedMonth} />
        </Report>
    );
}

export default ReportPage;