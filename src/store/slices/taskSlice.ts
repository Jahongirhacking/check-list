import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGenerealTaskProps } from "../../types";
import { localStorageNames } from "../../utils/config";
import {
  getExistedOne,
  getLocalStorage,
  setLocalStorage,
} from "../../utils/storageUtils";

export interface ITaskState {
  tasks: IGenerealTaskProps[];
}

const initialState: ITaskState = {
  tasks: getExistedOne(
    getLocalStorage(localStorageNames.tasks),
    []
  ) as IGenerealTaskProps[],
};

const userSlice = createSlice({
  name: "tasks-slice",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<IGenerealTaskProps>) => {
      state.tasks = [...state.tasks, action.payload];
      setLocalStorage(localStorageNames.tasks, state.tasks);
    },
  },
});

export const { addTask } = userSlice.actions;

export default userSlice.reducer;
