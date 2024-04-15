import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { getUserInfo } from '../../util/userInfoGet';
import {
  loginState,
  userBaseInfoState,
  userInfo,
} from '../../util/recoilState';
import InfoLi from './InfoLi';
import InfoChangeInput from './InfoChangeInput';
import { validEmail, validNickname, webpage } from '../../util/Regex';
import UserMarketing from './UserMarketing';
import BtnSmall from '../../Components/BtnSmall';
import AddLinkInfo from './AddLinkInfo';
import LinkInfoLi from './LinkInfoLi';
import AxiosConfig from '../../../AxiosConfig';
import UserInfoLinkLi from './UserInfoLinkLi';
import checkLogin from '../../util/checkLogin';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {Trans, useTranslation} from "react-i18next";
import {i18n} from "../../../language/i18n";

const Popup = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  > .modal {
    top: 0;
    left: 0;
    position: absolute;
    width: 100vw;
    height: 100vh;
  }
  > .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 24px 36px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    > p {
      margin-bottom: 24px;
      font: 500 16px ${({ theme }) => theme.noto};
      color: #151515;
    }
    > button {
      width: 80px;
      height: 30px;
      margin: 0 auto;
      display: block;
      background-color: ${({ theme }) => theme.mainColor};
      color: ${({mode})=>(mode == 'light'? '#151515' : '#ffffff')};
    }
  }
`;

const UserInfoChange = ({mode}) => {
  const {t} = useTranslation();
  const { data, status, refetch } = useQuery('userDetail', getUserInfo);
  const setInfo = useSetRecoilState(userInfo);
  const [nickName, setNickName] = useState('');
  const [nickNameValid, setNickNameValid] = useState('avail');
  const [emailValid, setEmailValid] = useState('avail');
  const [email, setEmail] = useState('');
  const [linkChange, setLinkChange] = useState(false);
  const [removedUrl, setRemovedUrl] = useState([]);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState([{ urlType: '홈페이지', url: '' }]);
  const [marketing, setMarketing] = useState();
  const [linkError, setLinkError] = useState(false);
  const setLogin = useSetRecoilState(loginState);

  const [initLink, setInitLink] = useState([{ urlType: '', url: '' }]);

  let nicknameSpan = {
    default: t("signup.input.nickname.valid.regex"),
    avail: t("signup.input.nickname.valid.check"),
    exist: t("signup.input.nickname.valid.duplicate"),
    existTest: t("signup.input.nickname.valid.no_check")
  };
  let emailSpan = {
    default: t("signup.input.email.valid.regex"),
    avail: t("signup.input.email.valid.check"),
    exist: t("signup.input.email.valid.duplicate"),
    existTest: t("signup.input.email.valid.no_check")
  };
  useEffect(() => {
    if (data) {
      nickName === data.authorName
        ? setNickNameValid('avail')
        : validNickname.test(nickName) == true
        ? setNickNameValid('existTest')
        : setNickNameValid('default');
    }
  }, [nickName]);
  useEffect(() => {
    if (data) {
      email === data.userEmail
        ? setEmailValid('avail')
        : validEmail.test(email) == true
        ? setEmailValid('existTest')
        : setEmailValid('default');
    }
  }, [email]);

  useMemo(() => {
    if (status == 'success') {
      setRemovedUrl([]);
      setInfo(data);
      setNickName(data.authorName);
      setEmail(data.userEmail);
      setDescription(data.description);
      setLink(data.userURLs);
      setMarketing(data.marketing1)
      setInitLink(data.userURLs);
    }
  }, [status, data]);
  const submitAll = () => {
    let linkErrorNum = 0;
    link.map((val) =>
      webpage.test(val.url) === false ? linkErrorNum++ : null
    );
    if (linkErrorNum === 0) {
      const urls = link.filter((el) => el != undefined);
      console.log(urls);
      const removeUrls = initLink.filter((l) => (link.find((i) => i.url === l.url && i.urlType === l.urlType)) === undefined)
      console.log(removeUrls);
      const newInfo = {
        authorName: nickName,
        userEmail: email,
        description: description,
        userURLs: urls,
        marketing1: marketing,
        removeURLs: removeUrls,
      };
      AxiosConfig.patch(`/user/info`, newInfo).then((res) => {
        if (res.data.statusCode == 200) {
          window.location.reload();
        }
      });
    } else {
      setLinkError(true);
    }
  };

  if (status == 'success' && data) {
    const canSubmit =
      (nickName != data.authorName ||
        email != data.userEmail ||
        description != data.description ||
        linkChange ||
        marketing != data.marketing1) &&
      nickNameValid === 'avail' &&
      emailValid == 'avail';

    const checkNicknameExist = (val) => {
      AxiosConfig.get(`/account/exist?authorName=${val}`).then((res) => {
        if (res.data.statusCode == 100) {
          setNickNameValid('exist');
        } else if (res.data.statusCode == 200) {
          setNickNameValid('avail');
        }
      });
    };
    const checkEmailExist = (val) => {
      AxiosConfig.get(`/account/exist?userEmail=${val}`).then((res) => {
        if (res.data.statusCode == 100) {
          setEmailValid('exist');
        } else if (res.data.statusCode == 200) {
          setEmailValid('avail');
        }
      });
    };
    if (data == "Missing session attribute 'user' of type Object") {
      window.location.reload();
    } else
      return (
        <>
          <div>
            <ul>
              <InfoLi mode={mode}>
                <div>
                  <p>{t("common.id")}</p>
                  <InfoChangeInput val={data.userId} />
                </div>
              </InfoLi>
              <InfoLi mode={mode}>
                <div>
                  <p>{t("common.nickname")}</p>
                  <InfoChangeInput
                    val={data.authorName}
                    maxLength={10}
                    setVal={setNickName}
                    checkExist={checkNicknameExist}
                  />
                  {nickNameValid != 0 && nickName != data.authorName ? (
                    <span
                      className="warning"
                      style={{
                        color: nickNameValid == 'avail' ? '#1152CC' : null,
                      }}
                    >
                      {nicknameSpan[nickNameValid]}
                    </span>
                  ) : null}
                </div>
              </InfoLi>
              <InfoLi mode={mode}>
                <div>
                  <p>{t("common.name")}</p>
                  <InfoChangeInput val={data.userName} />
                </div>
              </InfoLi>
              <InfoLi mode={mode}>
                <div>
                  <p>{t("common.email")}</p>
                  <InfoChangeInput
                    val={data.userEmail}
                    setVal={setEmail}
                    checkExist={checkEmailExist}
                  />
                  {emailValid != 0 && email != data.userEmail ? (
                    <span
                      style={{
                        color: emailValid == 'avail' ? '#1152CC' : null,
                      }}
                      className="warning"
                    >
                      {emailSpan[emailValid]}
                    </span>
                  ) : null}
                </div>
              </InfoLi>
              <InfoLi mode={mode}>
                <div>
                  <p>{t("common.number")}</p>
                  <InfoChangeInput
                    val={
                      data.userNumber
                        ? data.userNumber.replace(
                            /(\d{3})(\d{4})(\d{4})/,
                            '$1-$2-$3'
                          )
                        : null
                    }
                  />
                </div>
              </InfoLi>
              <InfoLi mode={mode} height={'100px'}>
                <div>
                  <p><Trans i18nKey={"mypage.info.change.description"} /></p>
                  <div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t("mypage.info.change.description_hint")}
                    />
                  </div>
                </div>
              </InfoLi>
              <InfoLi mode={mode} height={link ? 28 + link.length * 32 + 'px' : '82px'}>
                <div>
                  <p>{t("mypage.info.change.link.title")}</p>
                  <UserInfoLinkLi
                    value={data.userURLs}
                    link={link}
                    setLink={setLink}
                    setLinkChange={setLinkChange}
                    setRemove={setRemovedUrl}
                    remove={removedUrl}
                    mode={mode}
                  />
                </div>
              </InfoLi>
              <InfoLi mode={mode}>
                <div>
                  <p>{t("mypage.info.change.marketing")}</p>
                  <UserMarketing
                    marketing={data.marketing1}
                    setMarketing={setMarketing}
                    mode={mode}
                  />
                </div>
              </InfoLi>
            </ul>
            <div className="btn">
              <BtnSmall
                className={canSubmit ? null : 'disabled'}
                blue
                width="280px"
                onClick={() => {
                  setLinkError(false);
                  submitAll();
                }}
              >
                <p>{t("common.save")}</p>
              </BtnSmall>
            </div>
          </div>
          {linkError ? (
            <Popup>
              <div className="modal" onClick={() => setLinkError(false)}></div>
              <div className="popup">
                <p>{t("mypage.info.change.link.err")}</p>
                <button onClick={() => setLinkError(false)}>{t("mypage.info.change.close")}</button>
              </div>
            </Popup>
          ) : null}
        </>
      );
  }
};

export default UserInfoChange;
