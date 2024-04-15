import React, { useState, useMemo } from 'react';
import SearchInput from './SearchInput';
import styles from './NoResult.module.scss';

const NoResult = ({ setSearch, handleSearch, id }) => {
  const [searchInput, setSearchInput] = useState(id);

  const getSearch = () => {
    setSearch(searchInput);
    handleSearch(searchInput, 1);
  };

  return (
    <div className={styles.NoResult}>
      <section>
        <h1>
          <span>'{id}'</span>에 대한 검색결과가 없습니다.
        </h1>
        <p>검색어를 다시 한번 확인해 주세요.</p>
        <SearchInput
          placeHolder="미디어아트 검색"
          search={searchInput}
          setSearch={setSearchInput}
          onClick={getSearch}
        />
      </section>
    </div>
  );
};

export default NoResult;
