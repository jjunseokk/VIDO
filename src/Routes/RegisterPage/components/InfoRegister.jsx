import React, { useRef, useState, useEffect, useContext } from 'react';
import RegisterInputText from './RegisterInputText';
import RegisterBtn from './RegisterBtn';
import RoundBtn from './RoundBtn';
import EMAILS from '../data/EMAILS.json';
import AxiosConfig from '../../../AxiosConfig';
import ErrorPopup from '../../Components/ErrorPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import OpenMenuSvg from '../../Components/OpenMenuSvg';
import NiceToken from './NiceToken';
import NiceVerification from './NiceVerification';
import { InfoRegisterStyle } from './InfoRegisterStyle';
import { Trans, useTranslation } from "react-i18next";

const InfoRegister = ({ mode }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const userType = location.state.userType;
    const [idExist, setIdExist] = useState(0);
    const [nicknameExist, setNicknameExist] = useState(0);
    const [emailExist, setEmailExist] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [id, setId] = useState(['', false]);
    const [di, setDi] = useState('');
    const [veriInfo, setVeriInfo] = useState(null);
    const [nickname, setNickname] = useState(['', false]);
    const [pw, setPw] = useState(['', false]);
    const [pwCheck, setPwCheck] = useState(['', false]);
    const [name, setName] = useState(['', false]);
    const [email, setEmail] = useState(['', false]);
    const [emailCom, setEmailCom] = useState(['naver.com', true]);
    const [tel, setTel] = useState(['', false]);
    const [showEmailSelect, setShowEmailSelect] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [verificationSent, setVerficationSent] = useState(false);
    const [veriNum, setVeriNum] = useState(false);
    const [emailVerify, setEmailVerify] = useState(["", false])
    const [isEmailVerify, setIsEmailVerify] = useState(null);
    const customEmailCom = '직접 입력하기';
    const validId = /^[A-Z|a-z|0-9|\.\_\-]{4,12}$/;
    const validNickname = /^[\w|가-힣|\.\_\-]{1,12}$/;
    const validPwNo = /[\(\)\"\"\'\`가-힣|ㄱ-ㅎ|ㅏ-ㅣ]/;
    const validPwSpecial = /[-._!#%&,:;<>=@{}~\$\*\+\/\\\?\[\]\^\|]+/;
    const characterNeccessaryKor = /[A-Z|가-힣|a-z|0-9]+/;
    const characterNeccessary = /[A-Z|a-z|0-9]+/;
    // const validName = /^[A-Z|가-힣|a-z]{1,20}$/;
    const validName = /^[가-힣a-zA-Z\s]{1,20}$/;
    const validTel = /^\s*(?:\+?(\d{1,3})[-. (]*)?\s*((01[016789]{3})[-. )]*)?((\d{3,4})[-. ]*)+(\d{4})+\s*$/;
    const validTelVeri = /^\d{6}$/;
    const validEmailId = /^[\w|\.\_\-]{1,}$/;
    const validEmailCom = /^(\w|\.\_\-)*(\.\w{2,3})$/;
    const [errorPopup, setErrorPopup] = useState(false);
    const [apiError, setApiError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [requestId, setRequestId] = useState(0);
    const [mailCount, setMailCount] = useState(60 * 5);
    const [mailRetryCount, setMailRetryCount] = useState(0);
    const [isMailCountReset, setIsMailCountReset] = useState(false);
    const [emailSendTime, setEmailSendTime] = useState(new Date());

    const idAlreadyExist = async () => {
        setError(null);
        setLoading(true);
        const res = await AxiosConfig.get(`account/exist?userId=${id[0]}`);
        console.log(res);
        res.data.statusCode === 200 ? setIdExist(2) : setIdExist(1);

        setLoading(false);
    };
    const nickNameAlreadyExist = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await AxiosConfig.get(
                `account/exist?authorName=${nickname[0]}`
            );
            res.data.statusCode === 200 ? setNicknameExist(2) : setNicknameExist(1);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };
    const emailAlreadyExist = async () => {
        try {
            const res = await AxiosConfig.get(
                `account/exist?userEmail=${email[0]}@${emailCom[0]}`
            );
            console.log(res);
            res.data.statusCode === 200 ? setEmailExist(2) : setEmailExist(1);
        } catch (e) {
            console.log(e);
        }
    };

    const onEmailVerifyClick = () => {
        if (mailRetryCount < 3) {
            setMailRetryCount(mailRetryCount + 1);
            setEmailSendTime(new Date());
            const data = {};
            const id = Math.floor(Math.random() * (999999999 - 100000000) + 100000000);
            data["requestId"] = id;
            data["email"] = `${email[0]}@${emailCom[0]}`;
            setRequestId(id);

            if (mailCount < 5 * 60 && !isMailCountReset) {
                setIsMailCountReset(true);
                setMailCount(60 * 5);
                console.log("1")
            }

            AxiosConfig.get(`account/exist?userEmail=${email[0]}@${emailCom[0]}`).then((res) => {
                if (res.data.statusCode !== 200) {
                    setEmailExist(1);
                } else {
                    AxiosConfig.post(`account/email`, data).then((res) => {
                        setEmailExist(res.data.statusCode === 200 ? 2 : 1)
                    });
                }

                // setMailCount(60 * 5);
            })
        } else {
            alert(t("signup.input.email.alert"))
        }

    }

    const onEmailCheckClick = () => {
        const data = {};
        data["requestId"] = requestId;
        data["key"] = emailVerify[0];

        AxiosConfig.post(`account/email/verify`, data).then((res) => {
            setIsEmailVerify(res.data.statusCode === 200)
        })


    }

    let handleRegister = () => {
        AxiosConfig.post(`/account/signUp`, {
            userInfo,
            marketingInfo,
        }).then((res) => {
            console.log(res.data);
            if (res.data.statusCode === 200) {
                navigate('/signup/registerDone', { state: name });
            } else {
                setApiError('회원가입');
                setErrorMessage(res.data.statusCode);
                setErrorPopup(true);
            }
        });
    };

    const handleIdChange = (e) => {
        let testResult = validId.test(e.target.value);
        setId([e.target.value.toLowerCase(), testResult]);
        setIdExist(0);
    };

    const handleNicknameChange = (e) => {
        let testResult =
            validNickname.test(e.target.value) &&
            characterNeccessaryKor.test(e.target.value);
        setNickname([e.target.value, testResult]);
        setNicknameExist(0);
    };

    const handlePwChange = (e) => {
        let testResult =
            validPwNo.test(e.target.value) == false &&
            validPwSpecial.test(e.target.value) == true &&
            characterNeccessary.test(e.target.value) == true &&
            e.target.value.length >= 8 &&
            e.target.value.length <= 20;
        setPw([e.target.value, testResult]);
    };

    const handlePwCheckChange = (e) => {
        let testResult = pw[0] === e.target.value;
        setPwCheck([e.target.value, testResult]);
    };

    const handleNameChange = (e) => {
        if (veriInfo == null) {
            var name = e.target.value;
            var nameLength = 0;
            var ch1 = '';

            for (var i = 0; i < name.length; i++) {
                ch1 = name.charAt(i);
                if (encodeURI(ch1).length > 4) {
                    nameLength += 2;
                } else {
                    nameLength += 1;
                }
            }
            let testResult = validName.test(e.target.value) && nameLength <= 20;
            setName([e.target.value, testResult]);
        }
    };

    useEffect(() => {
        if (veriInfo != null) {
            setName([veriInfo.name, true]);
        }
    }, [veriInfo]);

    const handleEmailChange = (e) => {
        let testResult = validEmailId.test(e.target.value);
        setEmail([e.target.value, testResult]);
        setEmailExist(0);
    };

    const handleEmailVerifyChanged = (e) => {
        if (e.target.value.length > 7) return;
        setIsEmailVerify(null);
        setEmailVerify([e.target.value, e.target.value.length === 7]);
    }

    const handleCustomEmailChange = (e) => {
        let testResult = validEmailCom.test(e.target.value);
        setEmailCom([e.target.value, testResult]);
        setEmailExist(0);
    };

    const handleTelChange = (e) => {
        let testResult = validTel.test(e.target.value);
        setTel([e.target.value, testResult]);
        console.log([e.target.value, testResult])
    };

    const convertToTime = () => {
        const min = Math.floor(mailCount / 60);
        const sec = `0${mailCount % 60}`.slice(-2);

        return `0${min}:${sec}`;
    }

    let canRegister =
        id[1] &&
        nickname[1] &&
        pwCheck[1] &&
        pw[1] &&
        email[1] &&
        emailCom[1] &&
        tel[1] &&
        // di &&
        idExist === 2 &&
        emailExist === 2 &&
        nicknameExist === 2 && isEmailVerify;

    let userInfo = {
        userId: id[0],
        userPw: pw[0],
        userName: name[0],
        authorName: nickname[0],
        userNumber: tel[0],
        userEmail: email[0] + '@' + emailCom[0],
        userType: userType,
        // userType: location.state.userType.num,
    };
    let marketingInfo = {
        isMarketing1: location.state.marketingCollectInfo ?? false,
        isMarketing2: location.state.marketingSendInfo ?? false,
    };

    useEffect(() => {
        if (emailExist === 2) {
            setTimeout(() => {
                if (isMailCountReset) {
                    setIsMailCountReset(false);
                    setMailCount(60 * 5 - 1);
                } else if (mailCount > 1) {
                    setMailCount(60 * 5 - Math.floor(((new Date()).getTime() - emailSendTime) / 1000));
                } else if (mailCount === 1) {
                    setMailCount(0);
                }

            }, 1000);
        }
    }, [emailExist, mailCount]);

    // 회원가입 정보입력
    return (
        <>
            <h1 style={{color : mode == 'light'? '#151515' : '#ffffff'}} >{t("signup.info")}</h1>
            <InfoRegisterStyle className="box">
                {errorPopup ? (
                    <ErrorPopup
                        context={apiError}
                        errorMessage={errorMessage}
                        setErrorPopup={setErrorPopup}
                    />
                ) : null}
                <ul className="info">
                    <li>
                        <p>{t("common.id")}</p>
                        <div>
                            <RegisterInputText
                                placeHolder={t("signup.input.id.hint")}
                                value={id[0]}
                                width={360}
                                onChange={handleIdChange}
                                padding={0}
                                disabled={idExist === 2}
                            />
                            <RoundBtn
                                context={t("signup.input.id.submit")}
                                disabled={(idExist === 2 || !id[1])}
                                onClick={idAlreadyExist}
                            />
                        </div>
                        {id[0] ? (
                            id[1] ? (
                                idExist === 0 ? (
                                    <span>{t("signup.input.id.valid.no_check")}.</span>
                                ) : idExist === 1 ? (
                                    <span>{t("signup.input.id.valid.duplicate")}</span>
                                ) : (
                                    <span>{t("signup.input.id.valid.check")}</span>
                                )
                            ) : (
                                <span>
                                    {t("signup.input.id.valid.regex")}
                                </span>
                            )
                        ) : null}
                    </li>
                    <li>
                        <p>{t("common.nickname")}</p>
                        <div>
                            <RegisterInputText
                                placeHolder={t("signup.input.nickname.hint")}
                                value={nickname[0]}
                                onChange={handleNicknameChange}
                                width={360}
                                padding={0}
                            />
                            <RoundBtn
                                context={t("signup.input.nickname.submit")}
                                disabled={nickname[1] ? false : true}
                                onClick={nickNameAlreadyExist}
                            />
                        </div>
                        {nickname[0] ? (
                            nickname[1] ? (
                                nicknameExist === 0 ? (
                                    <span>{t("signup.input.nickname.valid.no_check")}</span>
                                ) : nicknameExist === 1 ? (
                                    <span>{t("signup.input.nickname.valid.duplicate")}</span>
                                ) : (
                                    <span>{t("signup.input.nickname.valid.check")}</span>
                                )
                            ) : (
                                <span>
                                    {t("signup.input.nickname.valid.regex")}
                                </span>
                            )
                        ) : null}
                    </li>
                    <li>
                        <p>{t("signup.input.password.title")}</p>
                        <RegisterInputText
                            width={360}
                            placeHolder={t("signup.input.password.hint")}
                            value={pw[0]}
                            onChange={handlePwChange}
                            type={'password'}
                            padding={0}
                        />
                        {pw[0] ? (
                            pw[1] ? null : (
                                <span>
                                    <Trans i18nKey={"signup.input.password.valid"} />
                                </span>
                            )
                        ) : null}
                        <RegisterInputText
                            placeHolder={t("signup.input.password.confirm.hint")}
                            width={360}
                            value={pwCheck[0]}
                            onChange={handlePwCheckChange}
                            padding={0}
                            type={'password'}
                        />
                        {pw[0] === pwCheck[0] || pwCheck[0] == '' ? null : (
                            <span>{t("signup.input.password.confirm.valid")}</span>
                        )}
                    </li>
                    <li>
                        <p>{t("common.name")}</p>
                        <RegisterInputText
                            width={360}
                            placeHolder={t("signup.input.name.hint")}
                            value={name[0]}
                            padding={0}
                            onChange={handleNameChange}
                        />
                        {name[1] || name[0] == '' ? null : (
                            <span>{t("signup.input.name.valid")}</span>
                        )}
                    </li>
                    <li>
                        <p>{t("common.email")}</p>
                        <div className="email">
                            <input
                                type="text"
                                placeholder={t("common.email")}
                                value={email[0]}
                                onChange={handleEmailChange}
                                disabled={emailExist === 2}
                            />
                            <p>@</p>
                            <div>
                                <div
                                    onClick={() => {
                                        if (emailExist !== 2) {
                                            setShowEmailSelect((prev) => !prev);
                                        }
                                    }}
                                >
                                    {showEmailInput ? null : emailCom[0]}
                                    <div>
                                        <OpenMenuSvg />
                                    </div>
                                </div>
                                {showEmailSelect ? (
                                    <ul>
                                        {EMAILS.map((value, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => {
                                                    setShowEmailSelect(false);
                                                    setEmailCom([value.email, true]);
                                                    setShowEmailInput(false);
                                                }}
                                            >
                                                {value.email}
                                            </li>
                                        ))}
                                        <li
                                            onClick={() => {
                                                setShowEmailInput(true);
                                                setShowEmailSelect(false);
                                                setEmailCom(['', false]);
                                            }}
                                        >
                                            {t("signup.input.email.self")}
                                        </li>
                                    </ul>
                                ) : null}
                                {showEmailInput ? (
                                    <input
                                        className="customEmail"
                                        placeholder={t("signup.input.email.self")}
                                        onChange={handleCustomEmailChange}
                                        disabled={emailExist === 2}
                                    />
                                ) : null}
                            </div>
                            <RoundBtn
                                context={isEmailVerify !== true && emailExist == 2 ? t("signup.input.email.retry") : t("signup.input.email.submit")}
                                disabled={!(emailCom[1] && email[0]) || isEmailVerify}
                                onClick={onEmailVerifyClick}
                            />
                        </div>
                        {email[0] ? (
                            emailCom[1] && email[1] ? (
                                emailExist === 0 ? (
                                    <span>{t("signup.input.email.valid.no_check")}</span>
                                ) : emailExist === 1 ? (
                                    <span>{t("signup.input.email.valid.duplicate")}</span>
                                ) : (
                                    <span>{t("signup.input.email.valid.check")}</span>
                                )
                            ) : (
                                <span>{t("signup.input.email.valid.regex")}</span>
                            )
                        ) : null}
                        {emailExist === 2 && !isEmailVerify ? (<span>{t("signup.input.email.left")} {convertToTime()}</span>) : null}
                    </li>
                    <li>
                        <p>{t("signup.input.email.verify.title")}</p>
                        <div>
                            <RegisterInputText
                                placeHolder={t("signup.input.email.verify.hint")}
                                padding={0}
                                value={emailVerify[0]}
                                type="number"
                                onChange={handleEmailVerifyChanged}
                                width={360}
                                disabled={emailExist !== 2 || isEmailVerify}
                            />
                            <RoundBtn
                                context={t("signup.input.email.verify.confirm")}
                                disabled={!emailVerify[1] || isEmailVerify}
                                onClick={onEmailCheckClick}
                            />
                        </div>
                        {isEmailVerify === false ? (
                            <span>{t("signup.input.email.verify.failed")}</span>
                        ) : null}
                    </li>
                    <li>
                        <p>{t("common.number")}</p>
                        <div>
                            <RegisterInputText
                                placeHolder={t("signup.input.number.hint")}
                                padding={0}
                                value={tel[0]}
                                type="number"
                                onChange={handleTelChange}
                                width={360}
                            />
                            {/*<RoundBtn*/}
                            {/*  context={t("signup.input.number.submit")}*/}
                            {/*  disabled={tel[1] ? false : true}*/}
                            {/*  onClick={() => setVerficationSent(true)}*/}
                            {/*/>*/}
                        </div>
                        {tel[1] || tel[0] == '' ? null : (
                            <span>{t("signup.input.number.valid")}</span>
                        )}
                    </li>
                </ul>
                <NiceVerification
                    verification={verificationSent}
                    setVeriNum={setVeriNum}
                    setVeriInfo={setVeriInfo}
                    setDi={setDi}
                />
                <RegisterBtn
                    disabled={!canRegister}
                    // disabled={import.meta.env.PROD ? !canRegister : !canRegisterDev}
                    context={t("signup.input.done")}
                    onClick={handleRegister}
                    state={{ nickname: nickname[0] }}
                />
            </InfoRegisterStyle>
        </>
    );
};

export default InfoRegister;
