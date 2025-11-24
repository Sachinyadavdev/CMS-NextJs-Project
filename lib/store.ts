import { configureStore, createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Layout } from './db';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface LayoutsState {
  layouts: Layout[];
  layoutsFetched: boolean;
  lastFetched: number | null;
  isFetching: boolean;
  cacheExpiry: number | null;
  needsRefresh: boolean;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  } as AuthState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearCredentials(state) {
      state.user = null;
      state.token = null;
    },
  },
});

const CACHE_DURATION = 30 * 60 * 1000;

const layoutsSlice = createSlice({
  name: 'layouts',
  initialState: {
    layouts: [],
    layoutsFetched: false,
    lastFetched: null,
    isFetching: false,
    cacheExpiry: null,
    needsRefresh: false,
  } as LayoutsState,
  reducers: {
    setLayouts(state, action: PayloadAction<Layout[]>) {
      state.layouts = action.payload;
      state.layoutsFetched = true;
      state.lastFetched = Date.now();
      state.cacheExpiry = Date.now() + CACHE_DURATION;
      state.needsRefresh = false;
      state.isFetching = false;
    },
    updateLayout(state, action: PayloadAction<Layout>) {
      const index = state.layouts.findIndex(layout => layout.id === action.payload.id);
      if (index !== -1) {
        state.layouts[index] = action.payload;
      } else {
        state.layouts.push(action.payload);
      }
      state.lastFetched = Date.now();
      state.cacheExpiry = Date.now() + CACHE_DURATION;
    },
    clearLayouts(state) {
      state.layouts = [];
      state.layoutsFetched = false;
      state.lastFetched = null;
      state.cacheExpiry = null;
      state.isFetching = false;
      state.needsRefresh = false;
    },
    invalidateLayoutCache(state) {
      state.needsRefresh = true;
      state.cacheExpiry = null;
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLayoutsAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchLayoutsAsync.fulfilled, (state, action) => {
        state.layouts = action.payload;
        state.layoutsFetched = true;
        state.lastFetched = Date.now();
        state.cacheExpiry = Date.now() + CACHE_DURATION;
        state.isFetching = false;
        state.needsRefresh = false;
      })
      .addCase(fetchLayoutsAsync.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const { setLayouts, updateLayout, clearLayouts, invalidateLayoutCache, setIsFetching } = layoutsSlice.actions;

// Async thunks for layouts
export const fetchLayoutsAsync = createAsyncThunk(
  'layouts/fetchLayouts',
  async (token?: string) => {
    const response = await fetch('/api/layouts', {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch layouts');
    }

    const layouts: Layout[] = await response.json();
    return layouts;
  }
);

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    layouts: layoutsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { User, Layout };