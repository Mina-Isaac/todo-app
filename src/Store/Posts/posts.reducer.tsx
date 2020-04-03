import { ActionType, getType } from "typesafe-actions";
import * as actions from "./posts.actions";
import { Post } from "../../constatnts";
export type Action = ActionType<typeof actions>;

type LoadSuccess = ActionType<typeof actions.loadPostsAsync.success>;
type AddSuccess = ActionType<typeof actions.addPostAsync.success>;

const postReducer = (data: Post[] = [], action: Action): Post[] => {
  switch (action.type) {
    case getType(actions.loadPostsAsync.success):
      return (action as LoadSuccess).payload;

    case getType(actions.loadPostsAsync.failure):
      return [];

    case getType(actions.addPostAsync.success):
      return [...data, (action as AddSuccess).payload];

    default:
      return data;
  }
};
export default postReducer;

export type PostsState = ReturnType<typeof postReducer>;
