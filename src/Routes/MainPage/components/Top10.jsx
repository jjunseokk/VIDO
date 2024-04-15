import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import MediaList from '../../Components/MediaList';
import { getTop10 } from '../../util/axiosGet';
import { useQuery } from 'react-query';
import { errorState } from '../../util/recoilState';
import { AnimatePresence, motion } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const Div = styled.div`
  position: relative;
  left: ${({ theme }) => theme.left};
  margin-bottom: 24px;
  > h1 {
    font: 700 22px/25.78px ${({ theme }) => theme.roboto};
    color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
  }
  > p {
    font: 400 16px/24px ${({ theme }) => theme.noto};
    color: ${({ mode }) => (mode == 'light' ? '#363636' : '#ffffff')};
  }
`;

const Top10 = ({ mode }) => {
  const { t } = useTranslation();
  const { data, status } = useQuery('Top10', getTop10);
  const setError = useSetRecoilState(errorState);
  // if (status === 'error') {
  //   setError({
  //     errorMessage: 'Top10',
  //     popup: true,
  //   });
  // }
  return (
    <div style={{ marginTop: '60px' }}>
      <Div mode={mode}>
        <h1>{t("main.top10.title")}</h1>
        <p>{t("main.top10.sub_title")}</p>
      </Div>
      {status == 'success' ? (
        <AnimatePresence>
          <motion.div
            variants={FramerMotionAnimate[0]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
          >
            <MediaList
              lang={'eng'}
              title={['VIDO', ' TOP10']}
              dataList={data}
              mediaart={true}
              top10={true}
              mode={mode}
            />
          </motion.div>
        </AnimatePresence>
      ) : null}
    </div>
  );
};

export default Top10;
