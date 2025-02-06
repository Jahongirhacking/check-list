export interface IGenerealTaskProps {
  id?: string;
  type: "sport" | "science" | "daily" | "other";
  isDone?: boolean;
  isCountable?: boolean;
  createdAt?: number;
  order?: number;
  img?: string;
  name?: string;
}

export interface ISportTaskProps extends IGenerealTaskProps {
  reps?: number;
  totalSets?: number;
  currentSets?: number;
}

export interface IDefaultTaskProps extends IGenerealTaskProps {
  partUnit?: string;
  totalPart?: number;
  currentPart?: number;
}
