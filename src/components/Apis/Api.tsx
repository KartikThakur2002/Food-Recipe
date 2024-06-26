// src/api.ts
import axios from 'axios';

const API_URL_1 = 'https://themealdb.com/api/json/v1/1/categories.php';

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL_1);
    if (response && response.data) {
      return response.data.categories;
    }
  } catch (err) {
    console.error('Error fetching categories: ', err.message);
    throw err;
  }
};
