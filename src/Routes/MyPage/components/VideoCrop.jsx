import React, { useState, useCallback, useEffect, useContext } from 'react';
import Cropper from 'react-easy-crop';
import './react-easy-crop.css';
import styles from './VideoCrop.module.scss';
import { UserContext } from '../../ContextProvider';
import { useParams } from 'react-router-dom';

const VideoCrop = ({
  ratio,
  cropComplete,
  setCropComplete,
  imagePath,
  company = '',
  recommenedRatio = '',
}) => {
  const { serverAddress } = useContext(UserContext);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  // const [aspect, setAspect] = useState([16, 9]);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedAreaPixels);
    setCropComplete(croppedAreaPixels);
  }, []);
  // useEffect(() => {
  //   getAspect(ratio);
  // }, [ratio]);
  const getAspect = useCallback((ratio) => setAspect(ratio), [ratio]);

  return (
    <div className={styles.videoCrop}>
      <div>
        <Cropper
          image={imagePath}
          // image={'https://picsum.photos/600/400'}
          crop={crop}
          zoom={zoom}
          aspect={ratio[0] / ratio[1]}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          disableAutomaticStylesInjection={true}
        />
      </div>
      {company ? (
        <ul>
          <li>
            요청업체
            <span>{company}</span>
          </li>
          <li>
            추천비율
            <span>{recommenedRatio}</span>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default VideoCrop;
