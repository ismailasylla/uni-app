import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchKeyword}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
