import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import MyArt from './components/MyArt';

const ArtPage = () => {
  const [loading, setLoading] = useState(false);
  const [changeInfo, setChangeInfo] = useState(['', false]);
  const [notificaiton, setNotification] = useState([]);
  const [userData, setUserData] = useState({});
  const [whichInfo, setWhichInfo] = useState(0);

  const [selectMenu, setSelectMenu] = useState(0);
  const handleMenuSelect = (n) => {
    setSelectMenu(n);
  };
  const handleInfoSelect = (n) => {
    setWhichInfo(n);
  };

  return (
    <>
      <div>
        <div>
          <MyArt />
        </div>
        <Footer  mode={mode}/>
      </div>
    </>
  );
};

export default ArtPage;
