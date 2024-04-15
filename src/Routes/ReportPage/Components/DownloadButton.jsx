import React, {useContext, useState} from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {i18n} from "../../../language/i18n";


const Div = styled.div`
  position: fixed;
  right: 25%;
  bottom: 20%;
  width: 110px;
  height: 120px;
  background-color: white;
  box-shadow: 0 3px 6px #00000029;
  border: 1px solid #c1c1c1;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  div {
    margin: auto;
    text-align: center;
    
    > p {
      font: 700 18px/27px ${({theme}) => theme.noto};
      color: ${({theme}) => theme.highlightColor};
    }

    > img {
      margin-top: 11px;
    }
  }
`;

const DownloadButton = ({date}) => {

    const {t} = useTranslation();

    const onDownloadClick = async () => {
        try {
            const getFile = await axios.get(`/reports/${date}.pdf`, {
                responseType: "blob"
            });

            const objectURL = window.URL.createObjectURL(new Blob([getFile.data]));
            const link = document.createElement("a");
            link.href = objectURL;
            link.style.display = "none";
            link.download = `${date}.pdf`;

            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(objectURL);

        } catch (_) {
            alert("파일을 다운로드 할 수 없습니다.");
        }
    }

    return (
        <Div>
            {date ? (
                <div onClick={onDownloadClick}>
                    <p style={i18n.language === "en" ? {fontSize: "14px"} : null}>{`${t(`report.month_list.${Number(date.split(".")[1]) - 1}`)}${t("report.month")}`}</p>
                    <p style={i18n.language === "en" ? {lineHeight: "20px"}: null}>{t("report.monthly_report")}</p>
                    <img src="/img/download.svg" alt={"download_report"} />
                </div>
            ) : null}
        </Div>
    );
}

export default DownloadButton