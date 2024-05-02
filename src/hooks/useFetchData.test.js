import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { useFetchData } from './useFetchData';

jest.mock('axios');

describe('useFetchData', () => {
  it('fetches data correctly', async () => {
    const mockData = [
      {
        name: 'Abu Dhabi University',
        web_pages: ['https://www.universitya.com'],
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => useFetchData());

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);

    expect(result.current.data).toEqual(mockData);
  });

  it('handles error correctly', async () => {
    const errorMessage = 'Failed to fetch data';

    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useFetchData());

    expect(result.current.loading).toBe(true);

    try {
      await waitForNextUpdate();
    } catch (error) {
      expect(result.current.loading).toBe(false);

      expect(error.message).toEqual(errorMessage);
    }
  });
});
