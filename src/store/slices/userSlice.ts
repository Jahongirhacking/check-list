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

const initialState: IUserState = {
  first_name: "Anonim",
  last_name: "Hisob",
};

const userSlice = createSlice({
  name: "user-slice",
  initialState: getExistedOne(
    getLocalStorage(localStorageNames.user),
    initialState
  ) as IUserState,
  reducers: {
    login: (state, action: PayloadAction<IUserState>) => {
      state = { ...state, ...action.payload };
      setLocalStorage(localStorageNames.user, state);
      return state;
    },
    logout: () => {
      setLocalStorage(localStorageNames.user, initialState);
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
