import React, { useState, useEffect } from 'react';
import Listing from '../components/Listing';
import SearchBar from '../components/SearchBar';
import { useFetchData } from '../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import './ListingPage.css';

const ListingPage = () => {
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [apiError, setApiError] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // Track whether data has been fetched successfully
  const navigate = useNavigate();
  const fetchData = useFetchData();

  useEffect(() => {
    async function fetchDataFromAPI() {
      try {
        const data = await fetchData();
        const itemsWithDisplayFlag = data.map((item) => ({
          ...item,
          display: true,
        }));
        setItems(itemsWithDisplayFlag);
        setDataFetched(true); // Set dataFetched to true after successful API call
        setApiError(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setApiError(true);
        const cachedData = localStorage.getItem('items');
        if (cachedData) {
          setItems(JSON.parse(cachedData));
          setDataFetched(true); // Set dataFetched to true if data is loaded from localStorage
        } else {
          console.error('No cached data found.');
        }
      }
    }

    if (!dataFetched) {
      // Fetch data only if it hasn't been fetched before
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
        return { ...item, display: false }; // Set display flag to false for deleted item
      }
      return item;
    });
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <div className="listing-page">
      <h1>Listing Page</h1>
      <button onClick={handleSort}>Sort Alphabetically</button>
      <SearchBar onSearch={handleSearch} />
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>University Name</th>
              <th>Website</th>
              <th>Action</th> {/* Add a new column for delete action */}
            </tr>
          </thead>
          <tbody>
            {apiError ? (
              <tr>
                <td colSpan="3">
                  Error fetching data from API. Loading from local storage...
                </td>
              </tr>
            ) : (
              items.map(
                (item) =>
                  item.display && ( // Only render rows with display flag set to true
                    <tr key={item.customId}>
                      <td
                        className="clickable"
                        onClick={() => handleItemClick(item.customId)}
                      >
                        {item.name}
                      </td>
                      <td>
                        <a
                          href={item.web_pages}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.web_pages}
                        </a>
                      </td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(item.customId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingPage;
