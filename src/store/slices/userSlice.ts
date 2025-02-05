import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localStorageNames } from "../../utils/config";

export interface IUserState {
  id?: number;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
  username?: string;
  auth_date?: number;
  hash?: string;
}

const initialState: IUserState = (JSON.parse(
  localStorage.getItem(localStorageNames.user) ?? ""
) as IUserState | "") || {
  first_name: "Anonim",
  last_name: "Foydalanuvchi",
};

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserState>) => {
      state = { ...state, ...action.payload };
      localStorage.setItem(localStorageNames.user, JSON.stringify(state));
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
