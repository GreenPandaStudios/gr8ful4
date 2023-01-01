import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { auth } from "../../firebase-setup/firebase-config";

export type usertype = typeof auth.currentUser;

export interface UserState {}
const initialState: UserState = {};

export const userSlice = createSlice({
  name: "users",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = () => auth.currentUser;

export default userSlice.reducer;
