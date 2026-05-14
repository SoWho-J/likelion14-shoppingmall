import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getProducts = async (type) => {
  const res = await api.get(`/${type}`);
  return res.data;
};

export const createProduct = async (type, productData) => {
  const res = await api.post(`/${type}`, productData);
  return res.data;
};

export const getProductDetail = async (type, id) => {
  const res = await api.get(`/${type}/${id}`);
  return res.data;
};

export const updateProduct = async (type, id, productData) => {
  const res = await api.patch(`/${type}/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (type, id) => {
  const res = await api.delete(`/${type}/${id}`);
  return res.data;
};
