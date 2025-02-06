import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localStorageNames } from "../../utils/config";
import {
  getExistedOne,
  getLocalStorage,
  setLocalStorage,
} from "../../utils/storageUtils";

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
      setLocalStorage(localStorageNames.user, state);
    },
    logout: () => {
      setLocalStorage(localStorageNames.user, initialState);
      return initialState;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
