import { useState } from 'react';
import axios from 'axios';

export function useFetchData() {
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://universities.hipolabs.com/search?country=United%20Arab%20Emirates'
      );
      const data = response.data.map((item, index) => ({
        ...item,
        customId: index + 1,
      }));
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return fetchData;
}
