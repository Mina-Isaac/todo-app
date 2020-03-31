import { ActionType, getType } from "typesafe-actions";
import * as actions from "./pagination.actions";

type Action = ActionType<typeof actions>;
type PaginationSettings = {
  todoOffset: number;
  postOffset: number;
};

const paginationReducer = (
  state: PaginationSettings = { todoOffset: 0, postOffset: 0 },
  action: Action
): PaginationSettings => {
  switch (action.type) {
    case getType(actions.setTodoOffset):
      return { ...state, todoOffset: action.payload };
    case getType(actions.setPostOffset):
      return { ...state, postOffset: action.payload };
    default:
      return state;
  }
};

export default paginationReducer;
