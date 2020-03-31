import { ActionType, getType } from "typesafe-actions";
import * as actions from "./todos.actions";
import { combineReducers } from "redux";
import { Todo } from "../../constatnts";

export type Action = ActionType<typeof actions>;
type LoadSuccess = ActionType<typeof actions.loadTodosAsync.success>;
type EditRequest = ActionType<typeof actions.editTodoAsync.request>;
type EditSuccess = ActionType<typeof actions.editTodoAsync.success>;
type EditFailure = ActionType<typeof actions.editTodoAsync.failure>;

const isLoadingTodos = (
  isLoading: boolean = false,
  action: Action
): boolean => {
  switch (action.type) {
    case getType(actions.loadTodosAsync.request):
      return true;
    case getType(actions.loadTodosAsync.success):
      return false;
    case getType(actions.loadTodosAsync.failure):
      return false;
    default:
      return false;
  }
};
const data = (data: Todo[] = [], action: Action): Todo[] => {
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
      console.log("success is fired");
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
const todoReducer = combineReducers({ isLoadingTodos, data });
export type PostsState = ReturnType<typeof todoReducer>;

export default todoReducer;
