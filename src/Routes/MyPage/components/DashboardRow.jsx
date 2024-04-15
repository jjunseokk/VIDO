import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../ContextProvider';

const DashboardRow = ({ data, profit = false }) => {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  const reduceStr = (str, len) => {
    if (screenSize.dynamicWidth > 1650 || screenSize.dynamicWidth < 1084) {
      return str.length > len ? str.slice(0, len - 3) + '...' : str;
    }
    if (screenSize.dynamicWidth > 1500) {
      return str.length > len - len / 10
        ? str.slice(0, len - len / 10 - 3) + '...'
        : str;
    }
    if (screenSize.dynamicWidth > 1300) {
      return str.length > len - len * 0.5
        ? str.slice(0, len - len * 0.5 - 3) + '...'
        : str;
    }
    if (screenSize.dynamicWidth > 100) {
      return str.length > len - len * 0.8
        ? str.slice(0, len - len * 0.8 - 3) + '...'
        : str;
    }
  };
  const { serverAddress } = useContext(UserContext);
  return (
    <tr>
      <td>
        <p>{data.mediaArtId}</p>
      </td>
      <td>
        <img src={serverAddress + data.thumbnailPath} alt="thumbnail" />
        <p>
          <span>{reduceStr(data.title, 24)}</span>
          <span>
            <br />
            {reduceStr(data.description, 24)}
          </span>
        </p>
      </td>
      {profit ? (
        <td>{Math.round((data.revenue / profit) * 10000) / 100}</td>
      ) : null}
      {/* {profit ? <td>{data.revenue}</td> : null} */}
      <td>
        {data.uploadedDatetime
          ? data.uploadedDatetime.slice(0, 10).replace(/-/g, '.')
          : data.createdDatetime.slice(0, 10).replace(/-/g, '.')}
      </td>
    </tr>
  );
};

export default DashboardRow;
