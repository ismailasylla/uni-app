import React from 'react';

const Listing = ({ items, onItemClick, onDelete }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.customId}>
          <span onClick={() => onItemClick(item.customId)}>{item.name}</span>
          <button onClick={() => onDelete(item.customId)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Listing;
