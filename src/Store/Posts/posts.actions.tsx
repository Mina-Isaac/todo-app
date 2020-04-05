import { createAsyncAction } from "typesafe-actions";
import { ActionTypes } from "../../constatnts";
import { Post } from "../../constatnts";

const loadPostsAsync = createAsyncAction(
  ActionTypes.FETCH_POSTS,
  ActionTypes.FETCH_POSTS_SUCCESS,
  ActionTypes.FETCH_POSTS_FAILURE
)<undefined, Post[], Error>();

const addPostAsync = createAsyncAction(
  ActionTypes.ADD_POST,
  ActionTypes.ADD_POST_SUCCESS,
  ActionTypes.ADD_POST_FAILURE
)<Post, Post, Error>();

export { loadPostsAsync, addPostAsync };
