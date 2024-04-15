import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import CropPopup from './CropPopup';
const PopupDom = ({ res, id, x, y, width, height, setPopup }) => {
  const [container, setContainer] = useState(null);
  const newWindow = useRef(null);

  useEffect(() => {
    setContainer(document.createElement('div'));
  }, []);
  useEffect(() => {
    if (container) {
      newWindow.current = window.open(
        `${
          import.meta.env.DEV
            ? 'https://office.vers.kr:3000'
            : 'https://vido.gallery'
        }/cropPreview/${id}/${res[0]}x${res[1]}x${width}x${height}x${x}x${y}`,
        '',
        `left=0,top=0, scrollbars=1, width=1900, height=1000`
      );
      newWindow.current.document.body.appendChild(container);
      const currWindow = newWindow.current;
      setPopup(false);
      return () => currWindow.close;
    }
  }, [container]);

  return container && createPortal(<CropPopup />, container);
};

export default PopupDom;
