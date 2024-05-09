// ListingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchBar, Listing, Button, ErrorBanner } from '../../components/';
import { useFetchData } from '../../hooks/index';
import DetailsPage from '../details/DetailsPage';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import { useLocalStorage } from '../../hooks/index';
import './ListingPage.css';
import Heading from '../../components/Heading/Heading';
import Pagination from '../../components/Pagination/Pagination';

const ListingPage = () => {
  const [items, setItems] = useLocalStorage('items', []);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [apiError, setApiError] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { fetchData, loading } = useFetchData();
  const { itemId } = useParams();

  useEffect(() => {
    async function fetchDataFromAPI() {
      try {
        const data = await fetchData();
        setItems(data);
        setDataFetched(true);
        setApiError(false);
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
  }, [fetchData, dataFetched, setItems]);

  // Calculate the range of items to display based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredItems.length > 0
      ? filteredItems.slice(indexOfFirstItem, indexOfLastItem)
      : items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemClick = (itemId) => {
    navigate(`/details/${itemId}`);
  };

  const handleSort = () => {
    const sortedFilteredItems = [...filteredItems].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const sortedAllItems = [...items].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredItems(sortedFilteredItems);
    setItems(sortedAllItems);
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
    setFilteredItems(filteredItems.filter((item) => item.customId !== itemId));
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <div className="listing-page">
      {loading ? (
        <LoadingSpinner />
      ) : apiError && !localStorage.getItem('items') ? (
        <ErrorBanner message="Error fetching data from the API. Please try again later." />
      ) : dataFetched && items.length > 0 ? (
        <>
          <Heading text="Universities" size="large" color="#333" />
          <div className="search-sort-container">
            <SearchBar onSearch={handleSearch} />
            <Button
              onClick={handleSort}
              text="Sort"
              className="sort-button"
            />{' '}
          </div>
          {searchNotFound ? (
            <ErrorBanner message="No items found matching the search." />
          ) : (
            <Listing
              items={currentItems}
              onItemClick={handleItemClick}
              onDelete={handleDelete}
            />
          )}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={
              filteredItems.length > 0 ? filteredItems.length : items.length
            }
            paginate={paginate}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
      {itemId && dataFetched && items.length > 0 && (
        <DetailsPage items={items} itemId={itemId} />
      )}
    </div>
  );
};

export default ListingPage;
