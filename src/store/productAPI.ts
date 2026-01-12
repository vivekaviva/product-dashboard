import axios from "axios";
import type { Product } from "./productTypes";

const BASE_URL = "https://dummyjson.com/products";

export const fetchProductsAPI = (limit: number, skip: number) =>
  axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`);

export const searchProductsAPI = (query: string) =>
  axios.get(`${BASE_URL}/search?q=${query}`);

export const fetchProductByIdAPI = (id: number) =>
  axios.get<Product>(`${BASE_URL}/${id}`);

export const addProductAPI = (data: Partial<Product>) =>
  axios.post(`${BASE_URL}/add`, data);

export const updateProductAPI = (id: number, data: Partial<Product>) =>
  axios.put(`${BASE_URL}/${id}`, data);

export const deleteProductAPI = (id: number) =>
  axios.delete(`${BASE_URL}/${id}`);
