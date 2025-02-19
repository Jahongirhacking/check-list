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
  backupCompleted?: boolean;
}

const initialState: IUserState = {
  first_name: "Anonym",
  last_name: "User",
  backupCompleted: false,
};

const userSlice = createSlice({
  name: "user-slice",
  initialState: getExistedOne(
    getLocalStorage(localStorageNames.user),
    initialState
  ) as IUserState,
  reducers: {
    login: (state, action: PayloadAction<IUserState>) => {
      state = { ...state, first_name: "", last_name: "", ...action.payload };
      const { backupCompleted, hash, ...partialState } = state;
      setLocalStorage(localStorageNames.user, partialState);
      return { backupCompleted, hash, ...partialState };
    },
    logout: () => {
      setLocalStorage(localStorageNames.user, initialState);
      return initialState;
    },
    editUser: (state, action: PayloadAction<IUserState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { login, logout, editUser } = userSlice.actions;

export default userSlice.reducer;
