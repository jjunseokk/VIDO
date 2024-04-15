import React, {useEffect} from 'react';
import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

    useEffect(() => {

    }, []);

  return (
    <div className={styles.NotFoundPage}>
      <section>
        <h1>404</h1>
        <p>PAGE NOT FOUND</p>
        <div></div>
      </section>
      <section>
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>
          요청하신 페이지를 찾을 수 없습니다.
          <br /> 방문 원하시는 페이지의 주소가 잘못 입력되었거나,
          <br /> 변경 혹은 삭제되어 요청하신 페이지를 찾을 수가 없습니다.
        </p>
      </section>
      <div>
        <embed src="../img/logo_line.svg" type="image/svg+xml" />
        <button onClick={() => navigate('/')}>홈으로 이동</button>
      </div>

    </div>
  );
};

export default NotFoundPage;
