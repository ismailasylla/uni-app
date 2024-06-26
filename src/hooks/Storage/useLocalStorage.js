import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Retrieve the value from local storage or use the initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      return initialValue;
    }
  });

  // Update the value in local storage and state
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error storing data in local storage:', error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
