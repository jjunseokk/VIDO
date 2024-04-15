import React, { useState } from 'react';
import Footer from '../Components/Footer';
import ProfileMenu from './components/ProfileMenu';
import { Outlet } from 'react-router-dom';
import DeleteMember from './components/DeleteMember';
import { AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { getUserInfo } from '../util/userInfoGet';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo } from '../util/recoilState';
import styled from 'styled-components';
import px2vw from '../util/px2vw';

const Page = styled.div`
  border-top: ${({ theme }) => theme.border};
  position: relative;
  min-height: 100vh;
  > div {
    display: flex;
    top: 32px;
    position: relative;
    margin-bottom: 96px;
    margin: 0 ${({ theme }) => theme.left};
    gap: ${px2vw(20)};
    margin-bottom: 120px;
  }
  @media (max-width: 842px) {
    > div {
      flex-direction: column;
      margin: 0 5vw;
      margin-bottom: 120px;
    }
  }
`;

const MyPage = ({mode}) => {
  const setUserInfo = useSetRecoilState(userInfo);
  const userInfomation = useRecoilValue(userInfo);
  const { data, status } = useQuery('userInfo', getUserInfo);
  if (status === 'success') {
    setUserInfo(data);
  }
  const [popup, setPopup] = useState(false);

  const [whichInfo, setWhichInfo] = useState(0);

  const [selectMenu, setSelectMenu] = useState(0);
  const handleMenuSelect = (n) => {
    setSelectMenu(n);
  };
  const handleInfoSelect = (n) => {
    setWhichInfo(n);
  };

  return (
    <div style={{background : mode == 'light'? '#ffff' : '#151515'}}>
      <AnimatePresence>
        {popup ? <DeleteMember setPopup={setPopup} /> : null}
      </AnimatePresence>
      <Page>
        <div>
          {/* 마이페이지 프로필 */}
          <ProfileMenu
            nickName={userInfomation.authorName}
            profileImgPath={userInfomation.profileImgPath}
            handleMenuSelect={handleMenuSelect}
            handleInfoSelect={handleInfoSelect}
            selectMenu={selectMenu}
            whichInfo={whichInfo}
            mode={mode}
          />
          {/* 마이페이지 정보변경 */}
          <Outlet />
        </div>
        <Footer mode={mode}/>
      </Page>
    </div>
  );
};

export default MyPage;
