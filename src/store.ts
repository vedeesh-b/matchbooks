import { configureStore } from "@reduxjs/toolkit";
import { bookSearchApi } from "./services/bookSearchApi";
import pathReducer from "@/lib/pathSlice";

export const store = configureStore({
  reducer: {
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
    path: pathReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookSearchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
