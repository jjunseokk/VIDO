import React, { useState, useMemo } from 'react';
import SearchInput from './SearchInput';
import styles from './NoResult.module.scss';

const NoResult = ({ handleSearch, id }) => {
  const [search, setSearch] = useState(id);

  const getSearch = () => handleSearch(search);

  return (
    // 하단 검색창 noResult
    <div className={styles.NoResult}>
      <section>
        <h1>
          <span>'{id}'</span>에 대한 검색결과가 없습니다.
        </h1>
        <p>검색어를 다시 한번 확인해 주세요.</p>
      </section>
    </div>
  );
};

export default NoResult;
