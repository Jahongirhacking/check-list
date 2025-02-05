import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localStorageNames } from "../../utils/config";
import { getExistedOne, getLocalStorage } from "../../utils/storageUtils";

export interface IUserState {
  id?: number;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
  username?: string;
  auth_date?: number;
  hash?: string;
}

const initialState: IUserState = getExistedOne(
  getLocalStorage(localStorageNames.user),
  {
    first_name: "Anonim",
    last_name: "Foydalanuvchi",
  }
) as IUserState;

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
