import { ActionType, getType } from "typesafe-actions";
import * as actions from "./posts.actions";
import { combineReducers } from 'redux';
import { Post } from '../../constatnts'


export type Action = ActionType<typeof actions>

type LoadSuccess = ActionType<typeof actions.loadPostsAsync.success>;
type AddSuccess = ActionType<typeof actions.addPostAsync.success>;


const isLoadingPosts = (isLoading: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case getType(actions.loadPostsAsync.request): return true;
    case getType(actions.loadPostsAsync.success): return false;
    case getType(actions.loadPostsAsync.failure): return false;
    default: return false
  }
}

const data = (
  data: Post[] = [],
  action: Action
): Post[] => {
  switch (action.type) {

    case getType(actions.loadPostsAsync.success):
      return (action as LoadSuccess).payload


    case getType(actions.loadPostsAsync.failure):
      return []

    case getType(actions.addPostAsync.success):
      return [...data, (action as AddSuccess).payload]

    default:
      return data;
  }
};
 const postsReducer = combineReducers({isLoadingPosts, data});
 export default postsReducer

export type PostsState = ReturnType<typeof postsReducer>;
