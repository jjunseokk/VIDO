import React, { useState } from 'react';
import styled from 'styled-components';
import AxiosConfig from '../../AxiosConfig';

const Inquiry = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;

  .inquiry_container{
    width: 600px;
    height: 750px;
    border-radius: 4px;
    background: #ffffff;
    padding: 50px 50px;
    position: relative;
    >p{
      font: 500 14px/17.09px ${({ theme }) => theme.pretendard};
      >span{
        margin-left: 10px;
      }
    }
    >.logo{
      display: block;
      margin: 0 auto;
      margin-bottom: 35px;
    }
    >.close{
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    >input{
      width: 100%;
      height: 40px;
      border: 1px solid #838383;
      margin-top: 10px;
      border-radius: 4px;
      padding-left: 12px;
      margin-bottom: 20px;
      font: 500 15px/19.87px ${({ theme }) => theme.pretendard};
    }
    >textarea{
      width: 100%;
      height: 150px;
      resize: none;
      font: 500 15px/19.87px ${({ theme }) => theme.pretendard};
      margin-top: 10px;
      padding-left: 12px;
      padding-top: 10px;
    }
    >button{
      width: 200px;
      height: 40px;
      border-radius: 94px;
      background: #000000;
      color: #ffffff;
      font: 700 16px/20.64px ${({ theme }) => theme.pretendard};
      display: block;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
  .success_inquiry{
    width: 500px;
    height: 200px;
    background: #ffffff;
    font: 700 20px/24.64px ${({ theme }) => theme.pretendard};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 4px;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    >button{
      width: 150px;
      height: 40px;
      border-radius: 94px;
      background: #000000;
      color: #ffffff;
      font: 700 20px/24.64px ${({ theme }) => theme.pretendard};
      display: block;
      margin: 0 auto;
      margin-top: 10px;
    }
  }
`

const InquiryPopup = ({ setPopup }) => {
  const [showSuccess, setShowSuccess] = useState(0);
  const [company, setCompany] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [contents, setContents] = useState();


  const inquiryMail = () => {
    AxiosConfig.post(`/inquiryMail`, {
      name: name,
      from: email,
      companyName: company,
      message: contents,
      number: phone
    }).then((res) => {
      console.log(res);
      if (res.data.statusCode == 200) {
        setShowSuccess(1);
      } else {
        setShowSuccess(2);
      }
    })
  }

  return (
    <Inquiry >
      <div className='inquiry_container'>
        <img className='logo' src='/img/inquiry_logo.svg' alt='inquiry_logo' />
        <img onClick={() => { setPopup(false) }} className='close' src='/img/closeBig.svg' alt='close' />
        <p>회사명<span>NAME OF COMPANY</span></p>
        <input placeholder='회사명' type='text' value={company} onChange={(e) => { setCompany(e.target.value) }} />
        <p>담당자<span>NAME</span></p>
        <input placeholder='담당자 성명' type='text' value={name} onChange={(e) => { setName(e.target.value) }} />
        <p>연락처<span>PHONE</span></p>
        <input maxLength={11} placeholder='연락 가능 번호' type='text' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
        <p>이메일<span>E-MAIL</span></p>
        <input placeholder='이메일' type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <p>내용<span>CONTENTS</span></p>
        <textarea placeholder='디스플레이 갯수 / 크기 / 장소 / 구독 기간 등을 설명해주세요.' type='email' value={contents} onChange={(e) => { setContents(e.target.value) }} />
        <button onClick={inquiryMail}>
          플램폼 구독 문의
        </button>
      </div>

      {showSuccess == 1 ? (
        <div className='success_inquiry'>
          문의를 완료하였습니다.
          <button onClick={() => {
            setPopup(false)
          }}>
            확인
          </button>
        </div>
      ) : showSuccess == 2 ? (
        <div className='success_inquiry'>
          입력란에 빈 내용이 없는지 확인해 주세요.
          <button onClick={() => {
            setShowSuccess(0)
          }}>
            확인
          </button>
        </div>
      ) : null}
    </Inquiry>
  )
}

export default InquiryPopup