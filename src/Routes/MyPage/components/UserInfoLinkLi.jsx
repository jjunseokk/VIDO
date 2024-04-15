import React, { useState, useEffect } from 'react';
import SelectDropdown from '../../Components/SelectDropdown';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';
import AddLinkInfo from './AddLinkInfo';
import {useTranslation} from "react-i18next";

const Div = styled.div`
  position: relative;
  li {
    > input.url {
      position: relative;
      left: 8px;
      height: 30px;
      width: ${px2vw(648)};
      padding: 0 4px;
      background-color: #f8f8f8;
    }
  }
  > p {
    position: absolute;
    right: 0;
    cursor: pointer;
  }
  .addLink {
    display: flex;
    cursor: pointer;
    font: 500 14px/24px ${({ theme }) => theme.noto};
    color: #9d9d9d;
    letter-spacing: -0.35px;
    gap: 12px;
    transition: ${({ theme }) => theme.transition};
    &:hover {
      color: ${({ theme }) => theme.mainColor};
    }
  }
  @media (max-width: 1428px) {
    li > input.url {
      height: 24px;
    }
    .addLink {
      font: 500 12px/20px ${({ theme }) => theme.noto};
      gap: 10px;
      img {
        height: 20px;
      }
    }
  }
`;

const UserInfoLinkLi = ({
  value,
  link,
  setLink,
  setLinkChange,
  setRemove,
  remove,
  mode
}) => {
  const {t} = useTranslation();
  const linkList = ['홈페이지', '유튜브', '인스타그램'];
  const [urlType, setUrlType] = useState(
    value ? value.map((v) => v.urlType) : [linkList[0]]
  );
  const [url, setUrl] = useState(value ? value.map((v) => v.url) : ['']);
  const prevDataUrlType = value.map((v) => v.urlType);
  const prevDataUrl = value.map((v) => v.url);

  // useEffect(() => {
  //   let tempArr = urlType.map((value, idx) =>
  //     url[idx] != '' ? { urlType: value, url: url[idx] } : null
  //   );
  //   setLink(tempArr);
  //   console.log(link);
  // }, [url, urlType]);

  const changeLinkArr = (type, adress) => {
    let tempArr = type.map((value, idx) => {
      if (adress[idx] != '') {
        return { urlType: value, url: adress[idx] };
      }
    });
    return setLink(tempArr);
  };

  const selectUrlType = (val, idx) => {
    let tempArr = urlType;
    tempArr[idx] = val;
    setUrlType(tempArr);
    if (val != prevDataUrlType[idx] || url[idx] != prevDataUrl[idx]) {
      setLinkChange(true);
    } else {
      setLinkChange(false);
    }
    return changeLinkArr(tempArr, url);
  };

  const urlChange = (val, idx) => {
    let tempArr = url;
    tempArr[idx] = val;
    setUrl(tempArr);
    if (urlType[idx] != prevDataUrlType[idx] || val != prevDataUrl[idx]) {
      setLinkChange(true);
    } else {
      setLinkChange(false);
    }
    return changeLinkArr(urlType, tempArr);
  };

  const deleteItem = (i) => {
    setLinkChange(true);
    let tempTypeArr = urlType;
    let tempUrlArr = url;
    let deleteType = tempTypeArr.splice(i, 1);
    let deleteUrl = tempUrlArr.splice(i, 1);

    if (prevDataUrl.includes(deleteUrl[0])) {
      let removeArr = [
        ...remove,
        {
          urlType: deleteType[0],
          url: deleteUrl[0],
        },
      ];
      setRemove(removeArr);
    }
    setUrlType(tempTypeArr);
    setUrl(tempUrlArr);
    changeLinkArr(tempTypeArr, tempUrlArr);
  };

  return (
    <Div>
      <ul>
        {urlType.map((value, idx) => (
          <li key={idx}>
            <AddLinkInfo
              selectUrlType={selectUrlType}
              urlTypeList={urlType}
              urlChange={urlChange}
              valueUrlType={value}
              idx={idx}
              deleteItem={deleteItem}
              valueUrl={url[idx]}
            />
            {/* <Div>
              <SelectDropdown height="30px">
                <p onClick={() => setShow((prev) => (prev == 0 ? idx + 1 : 0))}>
                  {value}
                </p>
                {show - 1 == idx ? (
                  <ul>
                    {linkList.map((v) => (
                      <li key={v} onClick={() => selectUrlType(v, idx)}>
                        {v}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </SelectDropdown>
              <div>
                <input
                  className="url"
                  value={url[idx]}
                  onChange={(e) => inputChange(e.target.value, idx)}
                  placeholder={'URL 입력'}
                />
              </div>
            </Div> */}
          </li>
        ))}
      </ul>
      {urlType.length <= 2 ? (
        <div
          className="addLink"
          onClick={() => {
            setUrlType([...urlType, '선택하기']);
            setUrl([...url, '']);
          }}
        >
          <img src="/img/plus-button.svg" />
          <p>{t("mypage.info.change.link.add")}</p>
        </div>
      ) : null}
    </Div>
  );
};

export default UserInfoLinkLi;
