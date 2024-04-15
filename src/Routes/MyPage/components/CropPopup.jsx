import React, { useState, useRef, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../ContextProvider.jsx';
import { useQuery } from 'react-query';
import { getMediaArtDetail } from '../../util/userInfoGet.jsx';

const Div = styled.div`
  background-color: #fff;
  overflow: scroll;
  width: 100vw;
  height: 100vh;
  > div {
    width: ${({ res }) => res[0]}px;
    height: ${({ res }) => res[1]}px;
    overflow: hidden;
  }
  video {
    position: relative;
    /* width: ${({ res }) => (res[0] > res[1] ? res[0] + 'px' : 'auto')}; */
    /* height: ${({ res }) => (res[0] > res[1] ? 'auto' : res[1] + 'px')}; */
    width: ${({ size }) => size[0]}px;
    height: ${({ size }) => size[1]}px;
    transform: translate(
      ${({ coord }) => -coord[0]}px,
      ${({ coord }) => -coord[1]}px
    );
  }
`;

const CropPopup = ({ setPopup = () => {} }) => {
  const [res, setRes] = useState([100, 100]);
  const [size, setSize] = useState([100, 100]);
  const [coord, setCoored] = useState([0, 0]);
  const params = useParams();
  const { serverAddress } = useContext(UserContext);
  const { data, status } = useQuery('detail', () =>
    getMediaArtDetail(params.id)
  );
  useEffect(() => {
    window.addEventListener('beforeunload', () => setPopup(false));
    if (params.info) {
      const arr = params.info.split('x');
      setRes([arr[0], arr[1]]);
      setSize([arr[2], arr[3]]);
      setCoored([arr[4], arr[5]]);
      console.log(arr);
    }
  }, []);
  if (status == 'success')
    return (
      <Div res={res} size={size} coord={coord}>
        <div>
          <video
            src={serverAddress + data.videoPath}
            autoPlay
            muted
            loop
            style={
              {
                // width: res[0] < res[1] ? res[0] + 'px' : 'auto',
                // height: res[0] < res[1] ? 'auto' : res[1] + 'px',
              }
            }
          />
          {/* <Cropper
          video={'/assets/swirl.mp4'}
          // image={'https://loremflickr.com/320/240'}
          crop={crop}
          zoom={zoom}
          maxZoom={20}
          aspect={res[0] / res[1]}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          disableAutomaticStylesInjection={true}
        /> */}
        </div>
      </Div>
    );
};

export default CropPopup;
