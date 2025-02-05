import { createSlice } from "@reduxjs/toolkit";

export interface IThemeState {
  color: "dark" | "light";
}

const initialState: IThemeState = {
  color: "light",
};

const userSlice = createSlice({
  name: "theme-slice",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.color = state.color === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = userSlice.actions;

export default userSlice.reducer;
