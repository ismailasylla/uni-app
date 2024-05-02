import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    onSearch(keyword);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchKeyword}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
