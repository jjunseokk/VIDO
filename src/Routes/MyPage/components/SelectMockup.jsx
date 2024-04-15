import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import MockupSingle from './MockupSingle';
import { UserContext } from '../../ContextProvider';
import { useQuery } from 'react-query';
import { getMockup } from '../../util/axiosGet';
import px2vw from '../../util/px2vw';
import AxiosConfig from '../../../AxiosConfig';
import {useTranslation} from "react-i18next";

const Div = styled.div`
  margin-bottom: 20px;
  > div {
  }
  > p {
    font: 500 14px/20px ${({ theme }) => theme.noto};
    color: #151515;
    margin-bottom: 4px;
    &:nth-of-type(2) {
      font: 400 12px/16px ${({ theme }) => theme.noto};
      color: #707070;
      margin-bottom: 10px;
    }
  }
  > ul {
    display: flex;
    gap: 12px;
  }
  @media (max-width: 1362px) {
    > p {
      font: 500 12px/20px ${({ theme }) => theme.noto};
      &:nth-of-type(2) {
        font: 400 10px/16px ${({ theme }) => theme.noto};
        margin-bottom: 4px;
      }
    }
  }
  @media (max-width: 960px) {
    > p {
      font: 500 10px/20px ${({ theme }) => theme.noto};
    }
  }
`;

const Hovered = styled.div`
  position: absolute;
  top: 462px;
  left: 0px;
  width: ${px2vw(300)};
  > img {
    width: ${px2vw(300)};
    height: auto;
    position: relative;
    &.thumb {
      position: absolute;
      width: ${({ id }) => {
        switch (id) {
          case 1:
            return px2vw(256);
          case 2:
            return px2vw(78.2);
          case 3:
            return px2vw(248.5);
        }
      }};
      left: ${({ id }) => {
        switch (id) {
          case 1:
            return px2vw(22);
          case 2:
            return px2vw(110.5);
          case 3:
            return px2vw(28);
        }
      }};
      top: ${({ id }) => {
        switch (id) {
          case 1:
            return px2vw(42.9);
          case 2:
            return px2vw(24.5);
          case 3:
            return px2vw(35.2);
        }
      }};
    }
  }
  > p {
    font: 400 12px ${({ theme }) => theme.noto};
    color: ${({ theme }) => theme.highlightColor};
  }
`;
const SelectMockup = ({ artId = 0, mockup, setMockup }) => {
  const {t} = useTranslation();
  const [hover, setHover] = useState(0);
  const [newMockup1, setNewMockup1] = useState({});
  const [newMockup2, setNewMockup2] = useState({});
  const [newMockup3, setNewMockup3] = useState({});
  const [prev, setPrev] = useState({
    1: null,
    2: null,
    3: null,
  });
  const srcList = [newMockup1, newMockup2, newMockup3];
  const { serverAddress } = useContext(UserContext);
  const { data, status } = useQuery(`getMockup${artId}`, () =>
    getMockup(artId)
  );
  useEffect(() => {
    const tempArr = [];
    srcList.map((v) =>
      v.thumbnailFile
        ? tempArr.push({
            mockupId: v.id,
            thumbnailFile: v.thumbnailFile,
          })
        : null
    );
    tempArr.map((val) => {
      if (mockup.filter((el) => el.mockupId == val.mockupId)) {
        AxiosConfig.delete(
          `/user/art/${artId}/mockup?mockupId=${val.mockupId}`
        ).then((res) => console.log(res));
      }
    });
    setMockup(tempArr);
  }, [newMockup1, newMockup2, newMockup3]);
  useEffect(() => {
    if (Array.isArray(data)) {
      data.map((val) => {
        let tempObj = prev;
        tempObj[val.mockupId] = serverAddress + val.thumbnailPath;
        setPrev(tempObj);
      });
      console.log(prev);
    }
  }, [data]);
  return (
    <>
      {hover > 0 ? (
        <Hovered id={hover}>
          {srcList[hover - 1].src ? (
            <img className="thumb" src={srcList[hover - 1].src} alt="thumb" />
          ) : prev[hover] ? (
            <img className="thumb" src={prev[hover]} alt="thumb" />
          ) : null}
          <img src={`/img/Mockup/Mockup-${hover}.webp`} />
          {hover !== 2 ? (
            <p>1000 x 200 px 이상의 이미지를 업로드 해주세요.</p>
          ) : (
            <p>450 x 800 px 이상의 이미지를 업로드 해주세요.</p>
          )}
        </Hovered>
      ) : null}
      <Div>
        <p>{t("mypage.media_art.upload.mockup.title")}</p>
        <p>
          {t("mypage.media_art.upload.mockup.description")}
        </p>
        <ul>
          <MockupSingle
            id={1}
            setMockup={setNewMockup1}
            mockup={newMockup1}
            exist={prev}
            setExist={setPrev}
            setHover={setHover}
            artId={artId}
          />
          <MockupSingle
            id={2}
            mockup={newMockup2}
            setMockup={setNewMockup2}
            exist={prev}
            setExist={setPrev}
            setHover={setHover}
            artId={artId}
          />
          <MockupSingle
            id={3}
            mockup={newMockup3}
            setMockup={setNewMockup3}
            setExist={setPrev}
            exist={prev}
            setHover={setHover}
            artId={artId}
          />
        </ul>
      </Div>
    </>
  );
};

export default SelectMockup;
