import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type pages = "feed" | "settings" | "about" | "profile" | "new-post";

export interface NavState {
  page: pages;
}

const initialState: NavState = {
  page: "feed",
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPage: (state, action: PayloadAction<pages>) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = navSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPage = (state: RootState) => state.nav.page;

export default navSlice.reducer;
