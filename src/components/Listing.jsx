import React, { useState } from 'react';
import './Listing.css';

const Listing = ({ items, onItemClick, onDelete }) => {
  const [deletedItems, setDeletedItems] = useState([]);

  const handleDelete = (itemId) => {
    setDeletedItems([...deletedItems, itemId]);
    setTimeout(() => {
      onDelete(itemId);
      setDeletedItems(deletedItems.filter((id) => id !== itemId));
    }, 500);
  };

  return (
    <div className="listing-container">
      <table className="item-table">
        <thead>
          <tr>
            <th>University Name</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.customId}
              className={
                deletedItems.includes(item.customId) ? 'item-deleted' : ''
              }
            >
              <td
                onClick={() => onItemClick(item.customId)}
                className="clickable"
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
                  onClick={() => handleDelete(item.customId)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listing;
