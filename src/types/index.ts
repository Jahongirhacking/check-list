export interface IGenerealTaskProps {
  id?: string;
  type?: "sport" | "science" | "daily" | "other";
  isDone?: boolean;
  isCountable?: boolean;
  createdAt?: number;
  order?: number;
  img?: string;
  name?: string;
  current?: number;
}

export interface ISportTaskProps extends IGenerealTaskProps {
  reps?: number;
  totalSets?: number;
}

export interface IDefaultTaskProps extends IGenerealTaskProps {
  partUnit?: string;
  totalPart?: number;
}
