import React from 'react';
import styled from 'styled-components';
import tableData from '../data/tableData';
import {motion} from 'framer-motion';
import {opacity} from '../../util/Framer';
import {useTranslation} from "react-i18next";

const Table = styled(motion.table)`
  position: relative;
  margin-left: ${({theme}) => theme.left};
  width: ${({theme}) => theme.pgWidth};
  border-collapse: collapse;

  thead {
  }

  th {
    text-align: left;
    border-top: 1px solid #707070;
    border-bottom: 1px solid #707070;
    height: 44px;
    font: 600 18px/27px ${({theme}) => theme.noto};
    padding-left: 60px;
    color: ${({mode})=>(mode == 'light'? '#363636' : '#ffff')};
  } 

  tbody {
    td {
      height: 44px;
      text-align: left;
      padding-left: 60px;
      border-bottom: 1px solid #c1c1c1;
      font: 400 18px ${({theme}) => theme.noto};
      color: ${({mode})=>(mode == 'light'? '#363636' : '#ffff')};
    }
  }

  @media (max-width: 1356px) {
    thead th {
      padding-left: 32px;
      font: 600 16px/24px ${({theme}) => theme.noto};
    }

    tbody td {
      padding-left: 32px;
      font: 400 14px ${({theme}) => theme.noto};
      height: 36px;
    }
  }
  @media (max-width: 786px) {
    thead th {
      padding-left: 12px;
      font: 600 12px/24px ${({theme}) => theme.noto};
    }

    tbody td {
      padding-left: 12px;
      font: 400 10px ${({theme}) => theme.noto};
      height: 36px;
    }
  }
  @media (max-width: 606px) {
    margin-left: 5vw;
    width: 90vw;
    thead th {
      padding-left: 12px;
      font: 600 10px/24px ${({theme}) => theme.noto};
    }

    tbody td {
      padding-left: 12px;
      font: 400 10px ${({theme}) => theme.noto};
      height: 36px;
    }
  }
`;

// 콜렉터 표
const CollectorTable = ({mode}) => {
    const {t} = useTranslation();
    return (
        <Table mode={mode} variants={opacity.container} initial="hidden" animate="show">
            <thead>
            <tr>
                <th>{t("collector.collector")}</th>
                <th>{t("collector.resolution")} / {t("collector.size")}</th>
                <th>{t("collector.ratio")}</th>
                <th>{t("collector.keyword")}</th>
            </tr>
            </thead>
            <tbody>
            {tableData.map((value, idx) => (
                <tr key={idx}>
                    <td>{value.name}</td>
                    <td>{value.res ?? value.size}</td>
                    <td>{value.ratio}</td>
                    <td>{value.keyword}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default CollectorTable;
