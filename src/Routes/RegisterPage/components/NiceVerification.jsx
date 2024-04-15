import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AxiosConfig from '../../../AxiosConfig';
import CloseBig from '../../Components/CloseBig';
const NiceVerification = ({
  verification = false,
  setVeriNum = () => {},
  setDi = () => {},
  setVeriInfo = () => {},
  URL = `https://vido.gallery/signup/infoRegister`,
}) => {
  const [info, setInfo] = useState(null);
  const [popup, setPopup] = useState(false);
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [returnUrl, setReturnUrl] = useState('');
  //TODO 아이다, 비밀번호 찾기 url 넣어야함
  const reqData = {
    requestno: String(new Date().getTime()),
    returnUrl: `https://vido.gallery/signup/infoRegister`,
    sitecode: '',
    authtype: 'M',
    popupyn: 'Y',
  };
  const niceVeri = () => {
    let wl = window.location;
    let returnUrl = `vido.gallery/nice/decrypt/data`;
    let redirectUrl = `${wl.protocol}//${wl.host}/result`;
    AxiosConfig.get(`/account/token`)
      .then((res) => {
        let encodeData = res.data.result;
        document.form_chk.action =
          'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
        document.form_chk.enc_data.value = encodeData.encData;
        document.form_chk.token_version_id.value = encodeData.tokenVersionId;
        document.form_chk.integrity_value.value = encodeData.integrityValue;
        // setUrl(`https://vido.gallery/nice/encrypt/data`);

        const openPopup = () => {
          const popupVeri = window.open(
            '',
            'popupChk',
            'width=500, height=550, fullscreen=no, menubar=no'
          );
          const endVeriURL =
            /[(https://vido.gallery/signup/infoRegister?token_version_id=)+]/;
          document.form_chk.target = 'popupChk';
          document.form_chk.submit();
          let interval = null;
          setTimeout(() => {
            console.log('timeout');
            interval = setInterval(() => afterVeri(), 300);
          }, 2000);
          const afterVeri = () => {
            if (endVeriURL.test(popupVeri.document.URL) === true) {
              setReturnUrl(popupVeri.document.URL);
              clearInterval(interval);
              getReturnData(
                popupVeri.document.URL,
                encodeData.key,
                encodeData.iv
              );
              popupVeri.close();
            }
          };
        };
        openPopup();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getVeriToken = (data) => {
    AxiosConfig.post(`/account/token/decode`, data)
      .then((res) => {
        console.log(res);
        if (res.data.statusCode == 200) {
          setVeriNum(true);
          let info = JSON.parse(res.data.result);
          setVeriInfo(info);
          setDi(info.di);
          console.log(info);
        } else {
          console.log('fali');
          setVeriNum(false);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (verification == true) {
      niceVeri();
    }
  }, [verification]);

  const getReturnData = (url, key, iv) => {
    let data = decodeURIComponent(url);
    let decodeData = data.substring(41);
    let arr = decodeData.split('&');
    let param = {
      tokenVersionId: arr[0].substring(17),
      encData: arr[1].substring(9),
      interityValue: arr[2].substring(16),
      key: key,
      iv: iv,
    };
    getVeriToken(param);
  };

  return (
    <>
      <form name="form_chk" method="post">
        <input type={'hidden'} id="m" name="m" value="service" />
        <input type="hidden" name="token_version_id" id="token_version_id" />

        <input type={'hidden'} id="enc_data" name="enc_data" />
        <input type={'hidden'} name="integrity_value" id="integrity_value" />
        {/* <div onClick={niceVeri}>ddddddddd</div> */}
      </form>
    </>
  );
};

export default NiceVerification;
