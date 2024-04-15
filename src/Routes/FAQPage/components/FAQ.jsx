import React, { useState, useEffect } from 'react';
import Bulletin from './Bulletin';
import FAQList from '../Data/FAQ.json';
import Row from './Row';
import MediaListPagination from '../../Components/MediaListPagination';
import { pagination } from '../../util/pagination';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import px2vw from '../../util/px2vw';
import {useTranslation} from "react-i18next";

const Menu = styled(motion.ul)`
  display: flex;
  gap: 33px;
  margin-bottom: 24px;
  position: relative;
  left: ${({ theme }) => theme.left};
  width: ${({ theme }) => theme.pgWidth};
  > li {
    transition: ${({ theme }) => theme.transition};
    font: 400 16px/24px ${({ theme }) => theme.noto};
    cursor: pointer;
    text-align: center;
    &.selected {
      color: ${({ theme }) => theme.highlightColor};
      font: 500 16px/24px ${({ theme }) => theme.noto};
    }
    &:last-of-type {
      cursor: default;
      position: absolute;
      right: 0;
      height: 24px;
      display: flex;
      gap: 8px;
      > input {
        height: 24px;
        width: ${px2vw(232)};
        font: 500 14px/24px ${({ theme }) => theme.noto};
        color: #363636;
        border-bottom: ${({ theme }) => theme.border};
        &::placeholder {
          font: 400 14px/24px ${({ theme }) => theme.noto};
          color: #9d9d9d;
        }
      }
      > img {
        display: block;
      }
    }
  }
  @media (max-width: 1000px) {
    gap: 20px;
    > li {
      font: 400 14px/18px ${({ theme }) => theme.noto};
      &.selected {
        font: 500 14px/18px ${({ theme }) => theme.noto};
      }
      &:last-of-type {
        > input {
          font: 500 12px/18px ${({ theme }) => theme.noto};
          height: 18px;
          &::placeholder {
            font: 400 11px/18px ${({ theme }) => theme.noto};
            color: #9d9d9d;
          }
        }
        > img {
          height: 18px;
        }
      }
    }
  }
  @media (max-width: 832px) {
    gap: 12px;
    > li {
      font: 400 10px/18px ${({ theme }) => theme.noto};
      &.selected {
        font: 500 10px/18px ${({ theme }) => theme.noto};
      }
      &:last-of-type {
        > input {
          height: 18px;
          font: 500 10px/18px ${({ theme }) => theme.noto};
          &::placeholder {
            opacity: 0;
          }
        }
        > img {
          height: 18px;
        }
      }
    }
  }
  @media (max-width: 590px) {
    gap: 4px;
    > li {
      font: 400 10px/18px ${({ theme }) => theme.noto};
      letter-spacing: -1;
      &.selected {
        font: 500 10px/18px ${({ theme }) => theme.noto};
      }
      &:last-of-type {
        gap: 2px;
        > input {
          height: 18px;
          width: ${px2vw(142)};

          font: 500 10px/18px ${({ theme }) => theme.noto};
          &::placeholder {
            opacity: 0;
          }
        }
        > img {
          height: 18px;
        }
      }
    }
  }
`;

const FAQ = () => {
  const {t} = useTranslation();
  const [list, setList] = useState([]);
  const [categoryPage, setCategoryPage] = useState(0);
  const [input, setInput] = useState('');
  const [wholePage, setWholePage] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('전체');
  const tempList = [...FAQList].reverse();
  const categoryList = [
      t("service.faq.all"),
      t("service.faq.service"),
      t("service.faq.collector"),
      t("service.faq.artist"),
      t("service.faq.account")
  ];
  useEffect(() => {
    // const pageArr = [];
    // for (let i = 0; i < tempList.length; i += 10) {
    //   pageArr.push(tempList.slice(i, i + 10));
    // }
    // setList(pageArr);
    // setWholePage(pageArr.length);
    pagination(tempList, setList, setWholePage);
  }, []);

  useEffect(() => {
    setPage(1);
    if (category == t("service.faq.all")) {
      pagination(tempList, setList, setWholePage);
    } else {
      let arr = [...tempList].filter((el) => el.category == category);
      pagination(arr, setList, setWholePage);
    }
  }, [category]);

  const handleSearch = () => {
    const arr = [...tempList].filter(
      (el) => el.title.includes(input) || el.content.includes(input)
    );
    pagination(arr, setList, setWholePage);
  };
  return (
    <>
      <Menu>
        {categoryList.map((val, idx) => (
          <li
            onClick={() => setCategory(val)}
            key={idx}
            className={category == val ? 'selected' : null}
          >
            {val}
          </li>
        ))}
        <li>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("service.faq.hint")}
            onKeyUp={(e) => (e.key == 'Enter' ? handleSearch() : null)}
          />
          <img src="/img/search.svg" onClick={handleSearch} />
        </li>
      </Menu>
      <Bulletin layout>
        <li className="head">
          <ul>
            <li>{t("common.num")}</li>
            <li>{t("service.faq.category")}</li>
            <li>{t("service.faq.content_title")}</li>
          </ul>
        </li>
        {Array.isArray(list[0])
          ? list[page - 1].map((value) => (
              <Row
                key={value.id}
                id={value.id}
                title={value.title}
                content={value.content}
                category={value.category}
                date={value.date}
                ect={value.ect ? value.ect : null}
              />
            ))
          : null}
      </Bulletin>
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

export default FAQ;
