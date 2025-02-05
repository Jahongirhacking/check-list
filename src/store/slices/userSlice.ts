import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  last_name: "Foydalanuvchi",
};

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserState>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
