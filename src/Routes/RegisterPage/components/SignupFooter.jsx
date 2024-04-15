import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FooterPopup from './FooterPopup';
import {useTranslation} from "react-i18next";

const Footer = styled.footer`
  margin: 32px auto 0 auto;
  font-family: ${({ theme }) => theme.noto};
  display: block;
  width: fit-content;
  ul {
    display: flex;
    li {
      font-size: 14px;
      letter-spacing: -0.7px;
      color: #707070;
      padding: 0 10px;
      position: relative;
      text-align: center;
      cursor: pointer;
      &:not(:first-of-type) {
        &::after {
          display: block;
          content: '|';
          position: absolute;
          top: 0;
          left: 0px;
        }
      }
    }
  }
  p {
    margin-top: 12px;
    text-align: center;
    font: 400 12px/16px ${({ theme }) => theme.roboto};
    color: #707070;
  }
`;

const SignupFooter = ({mode}) => {
  const {t} = useTranslation();
  const [popup, setPopup] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      {popup > 0 ? <FooterPopup popup={popup} setPopup={setPopup} /> : null}
      <Footer mode={mode}>
        <ul>
          <li onClick={() => navigate('/about')}>{t("footer.about")}</li>
          <li onClick={() => setPopup(2)}>{t("footer.terms")}</li>
          <li onClick={() => setPopup(3)}>{t("footer.privacy")}</li>
          <li onClick={() => navigate('/FaQ')}>{t("footer.service_contact")}</li>
        </ul>
        <p>ⓒ VIDO Corp. All Rights Reserved.</p>
      </Footer>
    </>
  );
};

export default SignupFooter;
