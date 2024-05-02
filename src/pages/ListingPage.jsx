import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Listing from '../components/Listing';
import { useFetchData } from '../hooks/useFetchData';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import './ListingPage.css';

const ListingPage = () => {
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [apiError, setApiError] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
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
      } catch (error) {
        console.error('Failed to fetch data:', error);
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
    } else {
      const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setItems(filteredItems);
    }
  };

  const handleDelete = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.customId === itemId) {
        return { ...item, display: false };
      }
      return item;
    });
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <div className="listing-page">
      {dataFetched && items.length > 0 ? (
        <>
          <h1>Listing Page</h1>
          <div className="search-sort-container">
            <SearchBar onSearch={handleSearch} />
            <button className="sort-button" onClick={handleSort}>
              Sort Alphabetically
            </button>
          </div>
          <Listing
            items={items}
            onItemClick={handleItemClick}
            onDelete={handleDelete}
          />
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
