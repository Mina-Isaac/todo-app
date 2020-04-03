import { ActionType, getType } from "typesafe-actions";
import * as actions from "./todos.actions";
import { Todo } from "../../constatnts";

export type Action = ActionType<typeof actions>;
type LoadSuccess = ActionType<typeof actions.loadTodosAsync.success>;
type EditRequest = ActionType<typeof actions.editTodoAsync.request>;
type EditFailure = ActionType<typeof actions.editTodoAsync.failure>;

const todoReducer = (data: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case getType(actions.loadTodosAsync.success):
      return (action as LoadSuccess).payload;

    case getType(actions.loadTodosAsync.failure):
      return [];

    case getType(actions.editTodoAsync.request): {
      const { ind } = (action as EditRequest).payload;
      const { new: newTodo } = (action as EditRequest).payload;
      const copy = [...data];
      copy[ind] = { ...newTodo };
      return copy;
    }

    case getType(actions.editTodoAsync.success): {
      return data;
    }

    case getType(actions.editTodoAsync.failure): {
      const copy = [...data];
      const { ind } = (action as EditFailure).payload;
      const { old } = (action as EditFailure).payload;
      copy[ind] = { ...old };
      return copy;
    }
    default:
      return data;
  }
};
export type PostsState = ReturnType<typeof todoReducer>;
export default todoReducer;
