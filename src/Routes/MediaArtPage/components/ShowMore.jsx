import React, { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useTranslation} from "react-i18next";

const Div = styled(motion.div)`
  width: 100vw;
  height: 1px;
  background-color: #e0e0e0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.25s ease-in-out;
    height: 1px;
    background-color: ${({ theme }) => theme.highlightColor};
    width: ${({ hover }) => (hover ? '50vw' : 0)};
  }
  &::before {
    display: block;
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    transition: all 0.4s ease-in-out;
    height: 1px;
    background-color: ${({ theme }) => theme.highlightColor};
    width: ${({ hover }) => (hover ? '50vw' : 0)};
  }
  > div {
    position: relative;
    z-index: 10;
    height: 48px;
    border-radius: 24px;
    background-color: #fff;
    width: 180px;
    transition: ${({ hover }) =>
      hover ? 'border 0.2s ease-in-out 0.3s' : 'border 0.2s ease-in-out '};
    &::hover {
      transition: border 0.1s ease-in-out;
    }
    border: ${(props) =>
      props.hover
        ? '1px solid ' + props.theme.highlightColor
        : props.theme.border};
    > a {
      display: block;
      width: 180px;
      transform: ${({ theme }) => theme.transition};
      height: 48px;
      transition: ${({ theme }) => theme.transition};
      text-align: center;
      font: 500 16px/48px ${({ theme }) => theme.noto};
      color: #363636;
      &:hover {
        color: ${({ theme }) => theme.highlightColor};
      }
    }
  }
`;
const Div2 = styled.div`
  width: 100vw;
  height: 1px;
  background-color: #e0e0e0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.25s ease-in-out;
    height: 1px;
    background-color: ${({ theme }) => theme.highlightColor};
    width: ${({ hover }) => (hover ? '50vw' : 0)};
  }
  &::before {
    display: block;
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    transition: all 0.4s ease-in-out;
    height: 1px;
    background-color: ${({ theme }) => theme.highlightColor};
    width: ${({ hover }) => (hover ? '50vw' : 0)};
  }
  > div {
    position: relative;
    z-index: 10;
    height: 48px;
    border-radius: 24px;
    background-color: #fff;
    width: 180px;
    transition: ${({ hover }) =>
      hover ? 'border 0.2s ease-in-out 0.3s' : 'border 0.2s ease-in-out '};
    &::hover {
      transition: border 0.1s ease-in-out;
    }
    border: ${(props) =>
      props.hover
        ? '1px solid ' + props.theme.highlightColor
        : props.theme.border};
    > a {
      width: 100%;
      display: block;
      transform: ${({ theme }) => theme.transition};
      height: 48px;
      transition: ${({ theme }) => theme.transition};
      text-align: center;
      font: 500 16px/48px ${({ theme }) => theme.noto};
      color: #363636;
      &:hover {
        color: ${({ theme }) => theme.highlightColor};
      }
    }
  }
`;
const ShowMore = ({ to }) => {
    const { t } = useTranslation();
  const [hover, setHover] = useState(false);
  return (
    <Div2 hover={hover}>
      <motion.div>
        <Link
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          to={to}
        >
          {t("media_art.more")}
        </Link>
      </motion.div>
    </Div2>
  );
};

export default ShowMore;
