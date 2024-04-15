import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import ToggleCheck from './ToggleCheck';
import {useTranslation} from "react-i18next";
import {i18n} from "../../../language/i18n";

const Div = styled.div`
  width: max-content;
  > ul {
    > li {
      position: relative;
      display: flex;
      width: fit-content;
      align-items: center;
      > p {
        font: 400 14px/20px ${({ theme }) => theme.noto};
        letter-spacing: -0.35px;
        color: ${({mode})=>(mode == 'light' ? '#707070' : '#ffffff')};
        margin-right: 18px;
      }
      > div {
      }
    }
  }
  @media (max-width: 1428px) {
    > ul > li {
      > p {
        font: 400 12px/20px ${({ theme }) => theme.noto};
      }
      > div {
        label span {
          font: 300 12px/24px ${({ theme }) => theme.roboto};
        }
      }
    }
  }
  @media (max-width: 1064px) {
    > ul > li {
      > p {
        font: 400 10px/20px ${({ theme }) => theme.noto};
      }
      > div {
        label span {
          font: 300 10px/24px ${({ theme }) => theme.roboto};
        }
      }
    }
  }
`;

const UserMarketing = ({ marketing, setMarketing, mode }) => {
  const {t} = useTranslation();
  const [agree, setAgree] = useState(marketing);
  useEffect(() => {
    setMarketing(agree);
  }, [agree]);
  return (
    <Div mode={mode} style={i18n.language === "ko" ? null : {left: "240px"}}>
      <ul>
        <li>
          <p>{t("common.email")}</p>
          <ToggleCheck
            id="email"
            agree={agree}
            onClick={() => setAgree((prev) => !prev)}
          />
        </li>
        {/* <li>
            <p>SMS</p>
            <ToggleCheck id="sms" agree={data.marketing2} />
          </li> */}
      </ul>
    </Div>
  );
};

export default UserMarketing;
