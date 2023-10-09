import axios from 'axios';

const API_KEY: string | undefined = process.env.REACT_APP_GOOGLE_API_KEY;
const REACT_APP_GOOGLE_BASE_URL: string | undefined = process.env.REACT_APP_GOOGLE_BASE_URL;

export const searchBooksApi = async (term: string, currentPage: number, perPage: number) => {
  try {
    if (!API_KEY || !REACT_APP_GOOGLE_BASE_URL) {
      throw new Error('API_KEY or GOOGLE_BASE_URL is not defined');
    }

    const startIndex = (currentPage - 1) * perPage;
    const response = await axios.get(REACT_APP_GOOGLE_BASE_URL, {
        params: {
          q: term,
          key: API_KEY,
          startIndex, // Include startIndex
        },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchBookDetailsApi = async (bookId: string) => {
    try {
      if (!API_KEY || !REACT_APP_GOOGLE_BASE_URL) {
        throw new Error('API_KEY or GOOGLE_BASE_URL is not defined');
      }
  
      const response = await axios.get(`${REACT_APP_GOOGLE_BASE_URL}/${bookId}`, {
        params: {
          key: API_KEY,
        },
      });
  
      return response;
    } catch (error) {
      throw error;
    }
};
