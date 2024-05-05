import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import './DetailsPage.css';
import { ErrorBanner, LoadingSpinner } from '../../components';

const DetailsPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        setLoading(true);
        const cachedData = localStorage.getItem('items');
        if (cachedData) {
          const items = JSON.parse(cachedData);
          const selectedItem = items.find(
            (item) => item.customId.toString() === itemId
          );
          if (selectedItem) {
            setItem(selectedItem);
            setApiError(false);
          } else {
            setItem(null);
            setApiError(true);
          }
        } else {
          console.error('No cached data found.');
          setApiError(true);
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchItemDetails();
  }, [itemId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (apiError || !item) {
    return (
      <ErrorBanner message="Error fetching data from the API. Please try again later." />
    );
  }

  return (
    <div className="details-container">
      <h1 className="details-title">University Details</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="item-name">{item.name}</h2>
        </div>
        <div className="card-body">
          <p className="item-website">
            Website:{' '}
            <a href={item.web_pages} target="_blank" rel="noopener noreferrer">
              {item.web_pages}
            </a>
          </p>
          <div className="logo-placeholder"></div>
          <Button
            text="Back"
            onClick={() => window.history.back()}
            className="back-button"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
