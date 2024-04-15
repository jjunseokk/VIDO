import React, { useContext } from 'react';
import { UserContext } from '../../ContextProvider';
import styles from './DashboardSingleArt.module.scss';

const DashboardSingleArt = ({
  imgPath,
  title = 'titletitle',
  description = 'descriptiondescriotuion',
}) => {
  const { serverAddress } = useContext(UserContext);
  return (
    <div className={styles.DashboardSingleArt}>
      <img src={serverAddress + imgPath} alt="Thumbnail" />
      {/* <img src={'../img/sample.png'} alt="Thumbnail" /> */}
      <div>
        <p>{title.length > 12 ? title.slice(0, 12) + '...' : title}</p>
        <p>
          {description.length > 12
            ? description.slice(0, 12) + '...'
            : description}
        </p>
      </div>
    </div>
  );
};

export default DashboardSingleArt;
