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
        sportTask.current += 1;
        if (sportTask.current >= sportTask.totalSets) {
          sportTask.isDone = true;
        }
      } else {
        const defaultTask = task as Required<IDefaultTaskProps>;
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
      state.tasks.forEach((task) => {
        if ((task.order ?? 0) > (state.tasks[taskIndex].order ?? 0)) {
          task.order! -= 1;
        }
      });
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
        ...action.payload,
      };
      const temp = state.tasks[taskIndex];
      if (temp.isCountable) {
        temp.isDone =
          temp.current! >=
          (temp.type === "sport"
            ? (temp as ISportTaskProps).totalSets
            : (temp as IDefaultTaskProps).totalPart)!;
      }
      setLocalStorage(localStorageNames.tasks, state.tasks);
      return state;
    },
    setTasks: (state, action: PayloadAction<IGeneralTaskProps[]>) => {
      state.tasks = action.payload;
      setLocalStorage(localStorageNames.tasks, state.tasks);
      return state;
    },
    makeUpward: (state, action: PayloadAction<IGeneralTaskProps["id"]>) => {
      const taskIndex1 = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      if (taskIndex1 === -1 || state.tasks[taskIndex1]?.order === 0)
        return state;
      const tempTask = state.tasks[taskIndex1];
      const taskIndex2 = state.tasks.findIndex(
        (task) => task.order === (tempTask?.order ?? 1) - 1
      );
      if (taskIndex2 === -1) return state;
      const tempOrder = tempTask.order;
      tempTask.order = state.tasks[taskIndex2].order;
      state.tasks[taskIndex2].order = tempOrder;
      state.tasks.sort((a, b) => a.order! - b.order!);
      setLocalStorage(localStorageNames.tasks, state.tasks);
    },
    makeDownward: (state, action: PayloadAction<IGeneralTaskProps["id"]>) => {
      const taskIndex1 = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      if (
        taskIndex1 === -1 ||
        state.tasks[taskIndex1]?.order === state.tasks.length - 1
      )
        return;
      const tempTask = state.tasks[taskIndex1];
      const taskIndex2 = state.tasks.findIndex(
        (task) => task.order === (tempTask?.order ?? state.tasks.length - 1) + 1
      );
      if (taskIndex2 === -1) return state;
      const tempOrder = tempTask.order;
      tempTask.order = state.tasks[taskIndex2].order;
      state.tasks[taskIndex2].order = tempOrder;
      state.tasks.sort((a, b) => a.order! - b.order!);
      setLocalStorage(localStorageNames.tasks, state.tasks);
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
  setTasks,
  makeDownward,
  makeUpward,
} = userSlice.actions;

export default userSlice.reducer;
