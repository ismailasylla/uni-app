import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailsPage.css';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the LoadingSpinner component

const DetailsPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const [fadeIn, setFadeIn] = useState(false); // State to manage fade-in animation

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const cachedData = localStorage.getItem('items');
        if (cachedData) {
          const items = JSON.parse(cachedData);
          const selectedItem = items.find(
            (item) => item.customId.toString() === itemId
          );
          if (selectedItem) {
            setItem(selectedItem);
          } else {
            setItem(null);
          }
        } else {
          console.error('No cached data found.');
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false); // Set loading state to false when data fetching completes
      }
    }
    fetchItemDetails();
  }, [itemId]);

  useEffect(() => {
    // Trigger fade-in animation when component mounts
    setFadeIn(true);
  }, []);

  return (
    <div className={`details-container ${fadeIn ? 'fade-in' : ''}`}>
      <h1 className="details-title">University Details</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="item-name">{item ? item.name : 'Loading...'}</h2>
        </div>
        <div className="card-body">
          {loading ? ( // Render the LoadingSpinner component while loading
            <LoadingSpinner />
          ) : item ? (
            <>
              <p className="item-website">
                Website:{' '}
                <a
                  href={item.web_pages}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.web_pages}
                </a>
              </p>
              <div className="logo-placeholder"></div>
              <Link to="/" className="back-link">
                Back
              </Link>
            </>
          ) : (
            <p>Error: Item not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
