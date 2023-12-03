import { SuccessResponse } from "./utils.types";

export type TodoType = {
  id: string;
  title: string;
  isFinished: boolean;
  level: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTodosResponse = SuccessResponse<{
  todos: TodoType[];
}>;
