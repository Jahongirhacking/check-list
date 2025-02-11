export interface IGeneralTaskProps {
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

export interface ISportTaskProps extends IGeneralTaskProps {
  reps?: number;
  totalSets?: number;
}

export interface IDefaultTaskProps extends IGeneralTaskProps {
  partUnit?: string;
  totalPart?: number;
}
