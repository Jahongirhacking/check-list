import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGeneralTaskProps } from "../../types";
import { localStorageNames } from "../../utils/config";
import {
  getExistedOne,
  getLocalStorage,
  setLocalStorage,
} from "../../utils/storageUtils";

export interface ITaskState {
  tasks: IGeneralTaskProps[];
}

const initialState: ITaskState = {
  tasks: getExistedOne(
    getLocalStorage(localStorageNames.tasks),
    []
  ) as IGeneralTaskProps[],
};

const userSlice = createSlice({
  name: "tasks-slice",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<IGeneralTaskProps>) => {
      state.tasks = [...state.tasks, action.payload];
      setLocalStorage(localStorageNames.tasks, state.tasks);
    },
  },
});

export const { addTask } = userSlice.actions;

export default userSlice.reducer;
