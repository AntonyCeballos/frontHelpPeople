import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: number;
  name: string;
  // otras propiedades de la categoría
}

interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null,
};

// Thunk para obtener las categorías desde la API
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch('http://localhost:3000/api/categories');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return (await response.json()) as Category[];
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export default categorySlice.reducer;
