import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailsPage.css'; // Import CSS for styling

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
    return <div>Loading...</div>;
  }

  if (apiError || !item) {
    return <div>Error: Item not found</div>;
  }

  return (
    <div className="details-container">
      <h1 className="details-title">Details Page</h1>
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
          {/* Placeholder for university logo */}
          <div className="logo-placeholder"></div>
          {/* Use Link for navigation */}
          <Link to="/" className="back-link">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
