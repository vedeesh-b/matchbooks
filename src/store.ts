import { configureStore } from "@reduxjs/toolkit";
import { bookSearchApi } from "./services/bookSearchApi";
import pathReducer from "@/lib/pathSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
    path: pathReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookSearchApi.middleware),
});

// Optional: Types for TS usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
