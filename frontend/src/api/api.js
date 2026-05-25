import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3003/api/products');
    return response.data.products;
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3003/api/products/${id}`);
    return response.data.product;
  } catch (err) {
    console.error('Error fetching product:', err);
  }
};