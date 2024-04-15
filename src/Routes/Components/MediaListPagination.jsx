import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const PaginationUl = styled.ul`
  display: flex;
  width: fit-content;
  position: ${(props) => (props.bottom ? 'absolute' : 'relative')};
  bottom: ${(props) => (props.bottom ? props.bottom : 0)};
  left: ${(props) => (props.bottom ? '50%' : 0)};
  transform: ${(props) => (props.bottom ? 'translateX(-50%)' : null)};
  gap: 20px;
  height: 30px;
  margin: 0 auto;
  li {
    display: block;
    transition: all 0.2s;
    height: 24px;
    width: 24px;
    text-align: center;
    font: 500 14px/22px ${({ theme }) => theme.noto};
    letter-spacing: -0.35px;
    cursor: pointer;
    color: #151515;
    border-radius: 50%;
    &:hover {
      color: #1152cc;
      font-weight: $medium;
    }
    &.selected {
      color: #fff;
      background-color: #1152cc;
      border-radius: 50%;
    }
  }
  @media (max-width: 1224px) {
    gap: 16px;
    li {
      height: 18px;
      width: 18px;
      font: 500 12px/18px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 1112px) {
    gap: 10px;
    li {
      height: 16px;
      width: 16px;
      font: 500 10px/16px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 782px) {
    gap: 4px;
    li {
      height: 14px;
      width: 14px;
      font: 500 10px/14px ${({ theme }) => theme.noto};
    }
  }
`;

const MediaListPagination = ({ wholePage, page, setPage, bottom }) => {
  //TODO 페이지네이션 9이상은 화살표버튼
  const [pageAmount, setPageAmount] = useState([]);
  const [pgArray, setPgArray] = useState(null);
  const [pgNum, setPgNum] = useState(0);

  const moveToPage = (n) => {
    setPage(n);
    if (n === 1) {
      setPgNum(0);
    }
    if (n === pageAmount[pageAmount.length - 1]) {
      setPgNum(pgArray.length - 1);
    }
  };
  useEffect(() => {
    let tempArr = [];
    const makeArray = () => {
      for (let i = 1; i < wholePage + 1; i++) {
        tempArr.push(i);
      }
      setPageAmount(tempArr);
      setVisiblePageNum(tempArr, page);
    };
    return makeArray();
  }, [wholePage]);
  const setVisiblePageNum = (arr, pg) => {
    const pgAmount = 10;
    if (wholePage <= pgAmount) {
      setPgArray([arr]);
    } else {
      let tempArr = [];
      let copiedArr = arr;
      let lastPgAmount = (arr.length % 10) - 1;
      tempArr = copiedArr.slice(0, 10);
      const firstPg = [...tempArr, '...', arr[arr.length - 1]];
      tempArr = [];
      copiedArr = arr;
      tempArr = copiedArr.slice(arr.length - lastPgAmount - 1, arr.length);
      console.log(tempArr);
      const lastPg = [arr[0], '...', ...tempArr];
      let tempList = [];
      let tempPgList = [];
      copiedArr = arr;
      for (let i = 10; i < arr.length - lastPgAmount - 1; i += pgAmount) {
        let tempMiddle = [];
        tempMiddle = copiedArr.slice(i, i + pgAmount);
        tempList = [arr[0], '...', ...tempMiddle, '...', arr[arr.length - 1]];
        tempPgList.push(tempList);
      }
      const tempPgArray = [firstPg, ...tempPgList, lastPg];
      setPgArray(tempPgArray);
    }
  };
  return (
    <PaginationUl bottom={bottom}>
      {pgArray
        ? pgArray[pgNum].map((value, i) => {
            if (i == 1 && value == '...') {
              return (
                <li key={i + value} onClick={() => setPgNum((cur) => cur - 1)}>
                  {value}
                </li>
              );
            } else if (i == pgArray[pgNum].length - 2 && value == '...') {
              return (
                <li key={i + value} onClick={() => setPgNum((cur) => cur + 1)}>
                  {value}
                </li>
              );
            } else {
              return (
                <li
                  className={value == page ? 'selected' : null}
                  onClick={() => moveToPage(value)}
                  key={value}
                >
                  {value}
                </li>
              );
            }
          })
        : null}
    </PaginationUl>
  );
};

export default MediaListPagination;
