import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data; // Array of products
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Unable to fetch products. Please try again later.');
  }
};