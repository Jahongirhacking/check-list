import { createSlice } from "@reduxjs/toolkit";
import { localStorageNames } from "../../utils/config";
import {
  getExistedOne,
  getLocalStorage,
  setLocalStorage,
} from "../../utils/storageUtils";

export interface IThemeState {
  color: "dark" | "light";
}

const initialState: IThemeState = {
  color: getExistedOne(
    getLocalStorage(localStorageNames.themeColor),
    "dark"
  ) as IThemeState["color"],
};

const userSlice = createSlice({
  name: "theme-slice",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.color = state.color === "dark" ? "light" : "dark";
      setLocalStorage(localStorageNames.themeColor, state.color);
    },
  },
});

export const { toggleTheme } = userSlice.actions;

export default userSlice.reducer;
