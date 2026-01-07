import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductsState, Product } from "./ProductTypes";
import {
  fetchProductsAPI,
  searchProductsAPI,
  fetchProductByIdAPI,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./productAPI";

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  total: 0,
  limit: 10,
  skip: 0,
  listLoading: false,
  detailLoading: false,
  error: null,
};

// Async Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, skip }: { limit: number; skip: number }) => {
    const response = await fetchProductsAPI(limit, skip);
    return response.data;
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query: string) => {
    const response = await searchProductsAPI(query);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number) => {
    const response = await fetchProductByIdAPI(id);
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data: Partial<Product>) => {
    const response = await addProductAPI(data);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }: { id: number; data: Partial<Product> }) => {
    const response = await updateProductAPI(id, data);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    await deleteProductAPI(id);
    return id;
  }
);

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.listLoading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.error.message || "Failed to fetch products";
      })

      // Search
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.listLoading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.skip = 0;
      })
      .addCase(searchProducts.pending, (state) => {
        state.listLoading = true;
      })

      // View Product
      .addCase(fetchProductById.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.detailLoading = false;
      })

      // Add
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
        state.total += 1;
      })
      // .addCase(addProduct.fulfilled, (state, action) => {
      //   state.products.unshift(action.payload);
      // })

      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export const { resetSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
