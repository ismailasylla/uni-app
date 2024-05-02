import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Listing from '../components/Listing';
import { useFetchData } from '../hooks/useFetchData';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import './ListingPage.css';

const ListingPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [apiError, setApiError] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const navigate = useNavigate();
  const fetchData = useFetchData();
  const { itemId } = useParams();

  useEffect(() => {
    async function fetchDataFromAPI() {
      try {
        const data = await fetchData();
        setItems(data);
        setDataFetched(true);
        setApiError(false);
        localStorage.setItem('items', JSON.stringify(data)); // Cache data in local storage
      } catch (error) {
        console.error('Failed to fetch data from API:', error);
        setApiError(true);
        const cachedData = localStorage.getItem('items');
        if (cachedData) {
          setItems(JSON.parse(cachedData));
          setDataFetched(true);
        } else {
          console.error('No cached data found.');
        }
      }
    }

    if (!dataFetched) {
      fetchDataFromAPI();
    }
  }, [fetchData, dataFetched]);

  const handleItemClick = (itemId) => {
    navigate(`/details/${itemId}`);
  };

  const handleSort = () => {
    const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
    setItems(sortedItems);
    setFilteredItems([]);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    if (!keyword) {
      const cachedData = localStorage.getItem('items');
      if (cachedData) {
        setItems(JSON.parse(cachedData));
      } else {
        console.error('No cached data found.');
      }
      setFilteredItems([]);
    } else {
      const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredItems(filteredItems);
      setSearchNotFound(filteredItems.length === 0);
    }
  };

  const handleDelete = (itemId) => {
    const updatedItems = items.filter((item) => item.customId !== itemId);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <div className="listing-page">
      {apiError && !localStorage.getItem('items') ? (
        <p>Error fetching data from the API. Please try again later.</p>
      ) : dataFetched && items.length > 0 ? (
        <>
          <h1>Listing Page</h1>
          <div className="search-sort-container">
            <SearchBar onSearch={handleSearch} />
            <p>Current search: {searchKeyword}</p>{' '}
            <button className="sort-button" onClick={handleSort}>
              Sort Alphabetically
            </button>
          </div>
          {searchNotFound ? (
            <p>No items found matching the search.</p>
          ) : (
            <Listing
              items={filteredItems.length > 0 ? filteredItems : items}
              onItemClick={handleItemClick}
              onDelete={handleDelete}
            />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
      {itemId && dataFetched && items.length > 0 && (
        <DetailsPage items={items} itemId={itemId} />
      )}
    </div>
  );
};

export default ListingPage;
