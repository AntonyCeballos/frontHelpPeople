import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
}

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
};

// Thunk para obtener los productos desde la API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('http://localhost:3000/api/products');
  if (!response.ok) {
    throw new Error('La respuesta no fue exitosa');
  }
  return (await response.json()) as Product[];
});

// Thunk para obtener un solo producto desde la API
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!response.ok) {
    throw new Error('La respuesta no fue exitosa');
  }
  return (await response.json()) as Product;
});

// Thunk para actualizar un producto
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, product }: { id: number; product: Partial<Product> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/products/${id}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para eliminar un producto
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Thunk para crear un producto
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: { name: string; description: string; price: number;  category_id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/products', product);
      return response.data;
      console.log(response)
    } catch (error) {
      return rejectWithValue(error.response.data);
      console.log(error)
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      })
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create product';
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update product';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete product';
      });
  },
});

export default productSlice.reducer;
