import React from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';

const Div = styled.div`
  img{
    width: 150px;
    margin: 0px 25px;
    &:nth-of-type(2){
      width: 120px;
    }
    &:nth-of-type(8){
      width: 120px;
    }
    &:nth-of-type(3), &:nth-of-type(11){
      width: 200px;
    }
    &:nth-of-type(9){
      width: 230px;
    }
    &:nth-of-type(14){
      width: 50px;
    }
    &:nth-of-type(19){
      scale: 1.5;
    }
    &:nth-of-type(20){
      scale: 1.2;
    }
    &:nth-of-type(21){
      width: 90px;
      margin-right: 100px;
    }
  }
  .up{
    margin-top: 100px;
  }
  .down{
    margin-bottom: 100px;
  }
`
// VIOD 소개 - 제휴사이미지
const Companies = () => {
  const compArr = [
    'ba',
    'bhak',
    'connecart',
    'exxit',
    'jj',
    'noflex',
    'xmedia',
  ];
  return (
    <Div>
      <Marquee gradient={false} speed={50}>
        {/* <img
          src="/img/campaign.svg"
          // src="/img/companies.png"
          style={{ marginRight: '290px', marginTop: '60px' }}
        /> */}
        <img className='up' src="/img/partners_1.svg" alt="" />
        <img className='down' src="/img/partners_2.svg" alt="" />
        <img className='up' src="/img/partners_3.svg" alt="" />
        <img className='down' src="/img/partners_4.svg" alt="" />
        <img className='up' src="/img/partners_20.svg" alt="" />
        <img className='down' src="/img/partners_21.svg" alt="" />
        <img className='up' src="/img/partners_5.svg" alt="" />
        <img className='down' src="/img/partners_6.svg" alt="" />
        <img className='up' src="/img/partners_7.svg" alt="" />
        <img className='down' src="/img/partners_8.svg" alt="" />
        <img className='up' src="/img/partners_9.svg" alt="" />
        <img className='down' src="/img/partners_10.svg" alt="" />
        <img className='up' src="/img/partners_11.svg" alt="" />
        <img className='down' src="/img/partners_12.svg" alt="" />
        <img className='up' src="/img/partners_13.svg" alt="" />
        <img className='down' src="/img/partners_14.svg" alt="" />
        <img className='up' src="/img/partners_15.svg" alt="" />
        <img className='down' src="/img/partners_16.svg" alt="" />
        <img className='up' src="/img/partners_17.svg" alt="" />
        <img className='down' src="/img/partners_18.svg" alt="" />
        <img className='up' src="/img/partners_19.svg" alt="" />
      </Marquee>
    </Div>
  );
};

export default Companies;
