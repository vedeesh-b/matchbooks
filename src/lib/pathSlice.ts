import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "@/components/features/SearchBar"; // Ensure this type is exported centrally ideally

interface PathState {
  currentPath: Book[];
  generatedAt: number | null; // useful for cache invalidation if needed
}

const initialState: PathState = {
  currentPath: [],
  generatedAt: null,
};

export const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<Book[]>) => {
      state.currentPath = action.payload;
      state.generatedAt = Date.now();
    },
    clearPath: (state) => {
      state.currentPath = [];
      state.generatedAt = null;
    },
  },
});

export const { setPath, clearPath } = pathSlice.actions;
export default pathSlice.reducer;
