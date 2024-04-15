//webp converter
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 0;
  height: 0;
  overflow: hidden;
  > canvas {
  }
`;

const Converter = ({ inputFile, width = 600, height = 400, setWebp }) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const draw = (e) => {
    if (canvasRef.current) {
      console.log(1);
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(imgRef.current, 0, 0, width, height);
      const dataURL = canvasRef.current.toDataURL('image/webp', 0.9);
      fetch(dataURL)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'thumbnail.webp', {
            type: 'image/webp',
            lastModified: new Date(),
          });
          setWebp(file);
        });
    }
  };
  return (
    <Div>
      <p>og Img</p>
      <img src={inputFile} ref={imgRef} onLoad={draw} />
      <p>canvas</p>
      <canvas ref={canvasRef} width={width} height={height} />
    </Div>
  );
};

export default Converter;
