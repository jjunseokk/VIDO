import React, { useState } from 'react';
import styles from './SearchInput.module.scss';

const SearchInput = ({
  placeHolder = "'VIDO'검색",
  search,
  setSearch,
  onClick = () => {},
}) => {
  const handleSearch = (e) => setSearch(e.target.value);
  const PressEnter = (e) => {
    e.key === 'Enter' ? onClick() : null;
  };
  return (
    <div className={styles.searchinput}>
      <input
        placeholder={placeHolder}
        value={search}
        onChange={handleSearch}
        onKeyUp={PressEnter}
      ></input>
      <span
        style={{ cursor: search ? 'pointer' : 'default' }}
        onClick={search ? onClick : null}
      >
        <embed src="/img/search.svg" type="image/svg+xml"></embed>
      </span>
    </div>
  );
};

export default SearchInput;
