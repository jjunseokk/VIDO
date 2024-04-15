import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import MediaListPagination from '../../Components/MediaListPagination';
import { pagination } from '../../util/pagination';
import px2vw from '../../util/px2vw';
import { getAskList } from '../../util/userInfoGet';
import MyAskRow from './MyAskRow';
import {useTranslation} from "react-i18next";

const Ul = styled.ul`
  min-height: 640px;
  margin-bottom: 40px;

  > li:last-of-type {
    border-bottom: 1px solid #d5d5d5;
  }

  > li > ul {
    display: grid;
    grid-template-columns: 60px 210px 1fr 100px;
    > li {
      &:nth-of-type(1) {
        text-align: center;
      }
      &:nth-of-type(2) {
        padding-left: 44px;
      }
      &:nth-of-type(3) {
        padding-left: 54px;
        padding-right: ${px2vw(74)};
      }
    }
  }
  > li.head {
    font: 500 16px/40px ${({ theme }) => theme.noto};
    color: #707070;
    border-top: 1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
  }
  @media (max-width: 1376px) {
    > li.head {
      font: 500 12px/32px ${({ theme }) => theme.noto};
    }
    > li > ul {
      grid-template-columns: 40px 150px 1fr 100px;
      > li {
        &:nth-of-type(2) {
          padding-left: 24px;
        }
        &:nth-of-type(3) {
          padding-left: 24px;
          padding-right: ${px2vw(74)};
        }
      }
    }
  }
  @media (max-width: 1242px) {
    > li > ul {
      display: grid;
      grid-template-columns: 32px 120px 1fr 100px;
      > li {
        &:nth-of-type(1) {
          text-align: center;
        }
      }
    }
    > li.head {
      font: 500 10px/32px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 762px) {
    > li {
      > ul {
        display: grid;
        grid-template-columns: 32px 100px 1fr 72px;

        > li {
          &:nth-of-type(1) {
            text-align: center;
          }
          &:nth-of-type(2) {
            padding-left: 12px;
          }
          &:nth-of-type(3) {
            padding-left: 12px;
          }
        }
      }
      > li.head {
        font: 500 10px/32px ${({ theme }) => theme.noto};
      }
    }
  }
`;
const MyAsk = () => {
  const {t} = useTranslation();
  const { data, status } = useQuery('ask', getAskList);
  const [list, setList] = useState([]);
  const [wholePage, setWholePage] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (status == 'success') {
      pagination([...data].reverse(), setList, setWholePage);
    }
  }, [status]);

  return (
    <>
      <Ul>
        <li className="head">
          <ul>
            <li>{t("common.num")}</li>
            <li>{t("service.inquiry.history.category")}</li>
            <li>{t("service.inquiry.history.content_title")}</li>
            <li>{t("service.inquiry.history.is_answer")}</li>
          </ul>
        </li>
        {Array.isArray(list[0])
          ? list[page - 1].map((val) => <MyAskRow key={val.id} data={val} />)
          : null}
      </Ul>
      {wholePage > 1 ? (
        <MediaListPagination
          page={page}
          setPage={setPage}
          wholePage={wholePage}
        />
      ) : null}
    </>
  );
};

export default MyAsk;
