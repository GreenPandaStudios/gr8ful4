import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { auth } from "../../firebase-setup/firebase-config";

export type usertype = {
  uid: string;
  displayName: string;
  email: string;
} | null;

export interface UserState {
  currentUser: usertype;
}
const initialState: UserState = { currentUser: null };

export const userSlice = createSlice({
  name: "users",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action: PayloadAction<usertype>) => {
      state.currentUser = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          displayName: action.payload,
        };
      }
    },
  },
});
export const { setUser, setDisplayName } = userSlice.actions;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.users.currentUser;

export default userSlice.reducer;
