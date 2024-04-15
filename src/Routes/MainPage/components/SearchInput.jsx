import React, { useState } from 'react';
import styles from './SearchInput.module.scss';

const SearchInput = ({ search, setSearch, onClick = () => {} }) => {
  const handleSearch = (e) => setSearch(e.target.value);
  const PressEnter = (e) => {
    e.key === 'Enter' ? onClick() : null;
  };
  return (
    <div className={styles.searchinput}>
      <input
        placeholder="'VIDO'검색"
        value={search}
        onChange={handleSearch}
        onKeyUp={PressEnter}
      ></input>
      <span onClick={onClick}>
        <embed src="/img/search.svg" type="image/svg+xml"></embed>
      </span>
    </div>
  );
};

export default SearchInput;
