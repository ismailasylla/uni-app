import React from 'react';
import './Listing.css';

const Listing = ({ items, onItemClick, onDelete }) => {
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
            <tr key={item.customId}>
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
                  onClick={() => onDelete(item.customId)}
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
