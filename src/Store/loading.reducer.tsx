import { ActionType, getType } from "typesafe-actions";
import * as postActions from "./Posts/posts.actions";
import { loadTodosAsync } from "./Todos/todos.actions";
export enum loadingFlag {
  unchanged = "unchanged",
  requested = "requested",
  succeded = "succeded",
  failed = "failed"
}
type Action = ActionType<typeof loadTodosAsync | typeof postActions>;
const initialState = {
  todoData: loadingFlag.unchanged,
  postData: loadingFlag.unchanged,
  postAdd: loadingFlag.unchanged
};

export default function(
  state = initialState,
  action: Action
): typeof initialState {
  switch (action.type) {
    case getType(loadTodosAsync.request):
      return { ...state, todoData: loadingFlag.requested };
    case getType(loadTodosAsync.success):
      return { ...state, todoData: loadingFlag.succeded };
    case getType(loadTodosAsync.failure):
      return { ...state, todoData: loadingFlag.failed };
    case getType(postActions.loadPostsAsync.request):
      return { ...state, postData: loadingFlag.requested };
    case getType(postActions.loadPostsAsync.success):
      return { ...state, postData: loadingFlag.succeded };
    case getType(postActions.loadPostsAsync.failure):
      return { ...state, postData: loadingFlag.failed };
    case getType(postActions.addPostAsync.request):
      return { ...state, postAdd: loadingFlag.requested };
    case getType(postActions.addPostAsync.success):
      return { ...state, postAdd: loadingFlag.succeded };
    case getType(postActions.addPostAsync.failure):
      return { ...state, postAdd: loadingFlag.failed };
    default:
      return state;
  }
}
