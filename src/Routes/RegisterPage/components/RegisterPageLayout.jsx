import React from 'react';
import styled from 'styled-components';
import SignupFooter from './SignupFooter';

const Layout = styled.div`
  background-color: '#f7f7f7';
  padding-top: 100px;
  min-height: calc(100vh - 90px);
  h1 {
    text-align: center;
    font-size: 22px;
    font-family: ${({ theme }) => theme.noto};
    letter-spacing: -0.44px;
    margin-bottom: 30px;
  }
  div.box {
    background-color: #fff;
    width: ${({ width }) => width}px;
    box-shadow: 0px 3px 6px #00000029;
    margin: 0 auto;
    padding: 60px 60px;
    li {
      position: relative;
      &:not(:last-of-type) {
        margin-bottom: 32px;
      }
    }
  }
  footer {
    padding-bottom: 190px;
  }
`;

const RegisterPageLayout = ({ title, children, width = 400, mode }) => {
  return (
    <Layout mode={mode} width={width}>
      {children}
      <SignupFooter />
    </Layout>
  );
};

export default RegisterPageLayout;
