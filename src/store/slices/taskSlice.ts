import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IDefaultTaskProps,
  IGeneralTaskProps,
  ISportTaskProps,
} from "../../types";
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
    incrementTask: (state, action: PayloadAction<IGeneralTaskProps["id"]>) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload
      ) as Required<IGeneralTaskProps>;
      if (task?.type === "sport") {
        const sportTask = task as Required<ISportTaskProps>;
        if (sportTask.current >= sportTask.totalSets) return state;
        sportTask.current += 1;
        if (sportTask.current >= sportTask.totalSets) {
          sportTask.isDone = true;
        }
      } else {
        const defaultTask = task as Required<IDefaultTaskProps>;
        if (defaultTask.current >= defaultTask.totalPart) return state;
        defaultTask.current += 1;
        if (defaultTask.current >= defaultTask.totalPart) {
          defaultTask.isDone = true;
        }
      }
      setLocalStorage(localStorageNames.tasks, state.tasks);
      return state;
    },
    decrementTask: (state, action: PayloadAction<IGeneralTaskProps["id"]>) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload
      ) as Required<IGeneralTaskProps>;
      if (task?.type === "sport") {
        const sportTask = task as Required<ISportTaskProps>;
        if (sportTask.current <= 0) return state;
        sportTask.current -= 1;
        if (sportTask.current < sportTask.totalSets) {
          sportTask.isDone = false;
        }
      } else {
        const defaultTask = task as Required<IDefaultTaskProps>;
        if (defaultTask.current <= 0) return state;
        defaultTask.current -= 1;
        if (defaultTask.current < defaultTask.totalPart) {
          defaultTask.isDone = false;
        }
      }
      setLocalStorage(localStorageNames.tasks, state.tasks);
      return state;
    },
    deleteTask: (state, action: PayloadAction<IGeneralTaskProps["id"]>) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      if (taskIndex === -1) return;
      state.tasks.splice(taskIndex, 1);
      setLocalStorage(localStorageNames.tasks, state.tasks);
    },
    deleteAllTask: (state) => {
      state.tasks.splice(0, state.tasks.length);
      setLocalStorage(localStorageNames.tasks, state.tasks);
    },
    resetTask: (state, action: PayloadAction<IGeneralTaskProps["id"]>) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload
      ) as Required<IGeneralTaskProps>;
      task.current = 0;
      task.isDone = false;
      setLocalStorage(localStorageNames.tasks, state.tasks);
    },
    resetAllTask: (state) => {
      state.tasks.forEach((task) => {
        task.current = 0;
        task.isDone = false;
      });
      setLocalStorage(localStorageNames.tasks, state.tasks);
    },
    editTask: (
      state,
      action: PayloadAction<IDefaultTaskProps | ISportTaskProps>
    ) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (taskIndex === -1) return;
      state.tasks[taskIndex] = {
        ...state.tasks[taskIndex],
        name: action.payload.name,
        ...(state.tasks[taskIndex].type === "sport"
          ? ({
              totalSets: (action.payload as ISportTaskProps).totalSets,
              reps: (action.payload as ISportTaskProps).reps,
            } as ISportTaskProps)
          : ({
              totalPart: (action.payload as IDefaultTaskProps).totalPart,
              partUnit: (action.payload as IDefaultTaskProps).partUnit,
            } as IDefaultTaskProps)),
      };
      setLocalStorage(localStorageNames.tasks, state.tasks);
      return state;
    },
  },
});

export const {
  addTask,
  incrementTask,
  decrementTask,
  deleteTask,
  deleteAllTask,
  resetTask,
  resetAllTask,
  editTask,
} = userSlice.actions;

export default userSlice.reducer;
