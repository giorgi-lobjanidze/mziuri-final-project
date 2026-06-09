import axios from 'axios';

const baseUrl = 'http://localhost:3003';

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

export const forgotPasswordUser = async (data) => {
  try {
    const response = await axios.put(`${baseUrl}/api/users/forgot-password`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.err || 'Something went wrong';
    throw new Error(message);
  }
};

export const contact = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/api/users/contact`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.err || 'Something went wrong';
    throw new Error(message);
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/api/users/forgot-password`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.err || 'Something went wrong';
    throw new Error(message);
  }
};

export const resetPassword = async (data, token) => {
  try {
    const response = await axios.post(`${baseUrl}/api/users/reset-password`, data, {
      headers: { Authorization: token },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.err || 'Something went wrong';
    throw new Error(message);
  }
};