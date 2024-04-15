import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';
import NoticeRow from './NoticeRow';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { pagination } from '../../util/pagination';
import { getNoticeList } from '../../util/axiosGet';
import MediaListPagination from '../../Components/MediaListPagination';
import {useTranslation} from "react-i18next";

const Div = styled.div`
  transition: ${({ theme }) => theme.transition};
  > ul.bulletin {
    width: ${({ theme }) => theme.pgWidth};
    position: relative;
    left: ${({ theme }) => theme.left};
    margin-bottom: 40px;
    > li > ul {
      > li {
        &:nth-of-type(1) {
          text-align: center;
          width: ${px2vw(94)};
        }
        &:nth-of-type(2) {
          width: ${px2vw(1000)};
          padding-left: ${px2vw(64)};
        }
        &:nth-of-type(3) {
          width: ${px2vw(96)};
          text-align: center;
        }
      }
    }
    > li.head {
      font: 500 16px/40px ${({ theme }) => theme.noto};
      color: #707070;
      border-top: 1px solid #d5d5d5;
      border-bottom: 1px solid #d5d5d5;
      > ul {
        display: flex;
        width: ${px2vw(1280)};
      }
    }
    > li:last-of-type {
      border-bottom: 1px solid #d5d5d5;
    }
  }
  @media (max-width: 1376px) {
    > ul.bulletin > li.head {
      font: 500 14px/32px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 1242px) {
    > ul.bulletin {
      > li > ul {
        > li {
          &:nth-of-type(1) {
            text-align: center;
            width: ${px2vw(94)};
          }
          &:nth-of-type(2) {
            width: ${px2vw(900)};
            padding-left: ${px2vw(64)};
          }
          &:nth-of-type(3) {
            width: ${px2vw(196)};
            text-align: center;
          }
        }
      }
      > li.head {
        font: 500 12px/32px ${({ theme }) => theme.noto};
      }
    }
  }
`;

const Notice = () => {
  const {t} = useTranslation();
  const [list, setList] = useState([]);
  const [wholePage, setWholePage] = useState(1);
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(`notice${page}`, () => getNoticeList(page));
  useEffect(() => {
    if (status == 'success') {
      setList(data.notice);
      setWholePage(data.total_page);
    }
  }, [status]);
  if (status == 'success')
    return (
      <Div layout>
        <motion.ul className="bulletin">
          <li className="head">
            <ul>
              <li>{t("common.num")}</li>
              <li>{t("service.notice.content_title")}</li>
              <li>{t("service.notice.date")}</li>
            </ul>
          </li>
          {Array.isArray(data.notice)
            ? data.notice.map((val) => (
                <NoticeRow
                  key={val.id}
                  id={val.id}
                  title={val.title}
                  content={val.content}
                  date={val.createdDatetime.slice(0, 10)}
                />
              ))
            : null}
        </motion.ul>
        {wholePage > 1 ? (
          <MediaListPagination
            page={page}
            setPage={setPage}
            wholePage={wholePage}
          />
        ) : null}
      </Div>
    );
};

export default Notice;
