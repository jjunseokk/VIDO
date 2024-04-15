import React from 'react';
import DashboardRow from './DashboardRow';
import { DashBoardTablestyle } from './DashBoardTablestyle';
import {useTranslation} from "react-i18next";

const DashBoardTable = ({ data, profit = false }) => {
  const {t} = useTranslation();
  return (
    <DashBoardTablestyle>
      {data ? (
        <>
          <thead>
            <tr>
              <td>
                <p>{t("mypage.dashboard.art_analysis.count.total")}</p>
              </td>
              <td>
                <p>{t("mypage.dashboard.art_analysis.media_art")}</p>
              </td>
              {/*{profit ? (*/}
              {/*  <td>*/}
              {/*    <p>수익 (%)</p>*/}
              {/*  </td>*/}
              {/*) : null}*/}
              <td>
                <p>{t("mypage.dashboard.art_analysis.date")}</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {data.map((value, idx) => (
              <DashboardRow key={idx} data={value} profit={profit} />
            ))}
          </tbody>
        </>
      ) : null}
    </DashBoardTablestyle>
  );
};

export default DashBoardTable;
