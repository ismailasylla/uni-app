import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const cachedData = localStorage.getItem('items');
        if (cachedData) {
          const items = JSON.parse(cachedData);
          const selectedItem = items.find((item) => item.customId === itemId);
          setItem(selectedItem);
        } else {
          console.error('No cached data found.');
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    }

    fetchItemDetails();
  }, [itemId]);

  if (!item) {
    throw new Error('Item not found');
  }

  return (
    <div>
      <h1>Details Page</h1>
      <h2>{item.name}</h2>
      <p>Location: {item.location}</p>
      {/* Display other item details */}
    </div>
  );
};

export default DetailsPage;
