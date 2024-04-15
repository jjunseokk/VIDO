import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../ContextProvider';
import px2vw from '../../util/px2vw';
import { useQuery } from 'react-query';
import { getArtMockup } from '../../util/axiosGet';

const Cont = styled.div``;

const El = styled.div`
  margin-top: 24px;
  position: relative;
  overflow: hidden;
  > .thumb {
    object-fit: cover;

    position: absolute;
    width: ${({ id }) => {
      switch (id) {
        case 0:
          return px2vw(743);
        case '1':
          return px2vw(1090.5);
        case '2':
          return px2vw(338);
        case '3':
          return px2vw(1060.5);
      }
    }};
    height: ${({ id }) => (id === 0 ? px2vw(557.25) : 'auto')};
    top: ${({ id }) => {
      switch (id) {
        case 0:
          return px2vw(36);
        case '1':
          return px2vw(182.5);
        case '2':
          return px2vw(97.5);
        case '3':
          return px2vw(148.5);
      }
    }};
    left: ${({ id }) => {
      switch (id) {
        case 0:
          return px2vw(280.2);
        case '1':
          return px2vw(94);
        case '2':
          return px2vw(471);
        case '3':
          return px2vw(120);
      }
    }};
  }
  > .frame {
    position: relative;
    width: ${({ theme }) => theme.pgWidth};
  }
`;

const Mock = ({ basic, artId }) => {
  const { serverAddress } = useContext(UserContext);
  const { data, status } = useQuery(`mockup${artId}`, () =>
    getArtMockup(artId)
  );
  return (
    <Cont>
      <El id={0}>
        {basic ? <img src={serverAddress + basic} className="thumb" /> : null}
        <img
          src="/img/Mockup/Mockup-0.webp"
          className="frame"
          alt="mockup frame"
        />
      </El>
      {Array.isArray(data)
        ? data.map((val) => (
            <El id={val.mockupId}>
              <img src={serverAddress + val.thumbnailPath} className="thumb" />
              <img
                src={`/img/Mockup/Mockup-${val.mockupId}.webp`}
                className="frame"
                alt="mockup frame"
              />
            </El>
          ))
        : null}
      {/* <El id={1}>
        {basic ? <img src={serverAddress + basic} className="thumb" /> : null}
        <img
          src="/img/Mockup/MockUp-1.png"
          className="frame"
          alt="mockup frame"
        />
      </El>
      <El id={2}>
        {basic ? <img src={serverAddress + basic} className="thumb" /> : null}
        <img
          src="/img/Mockup/MockUp-2.png"
          className="frame"
          alt="mockup frame"
        />
      </El>
      <El id={3}>
        {basic ? <img src={serverAddress + basic} className="thumb" /> : null}
        <img
          src="/img/Mockup/MockUp-3.png"
          className="frame"
          alt="mockup frame"
        />
      </El> */}
    </Cont>
  );
};

export default Mock;
