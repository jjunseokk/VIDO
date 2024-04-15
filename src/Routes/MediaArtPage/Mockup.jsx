import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../ContextProvider';
import px2vw from '../../util/px2vw';

const Cont = styled.div``;

const El = styled.div`
  position: relative;
  .thumb {
    position: absolute;
    top: ${px2vw(30)};
  }
  .mockup {
    position: relative;
    width: ${({ theme }) => theme.pgWidth};
    height: auto;
    display: block;
  }
`;

const Mockup = ({ basic }) => {
  const { serverAddress } = useContext(UserContext);
  return (
    <Cont>
      <El id={0}>
        {basic ? <img src={serverAddress + basic} className="thumb" /> : null}
        <img className="mockup" src="/img/mockup/Mockup-0.webp" alt="mockup1" />
      </El>
    </Cont>
  );
};

export default Mockup;
