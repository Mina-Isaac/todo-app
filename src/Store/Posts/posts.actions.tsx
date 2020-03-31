import { createAsyncAction } from "typesafe-actions";
import { ActionTypes } from "../../constatnts";
import { Post, Todo } from "../../constatnts";

const loadPostsAsync = createAsyncAction(
  ActionTypes.FETCH_POSTS,
  ActionTypes.FETCH_POSTS_SUCCESS,
  ActionTypes.FETCH_POSTS_FAILURE
)<undefined, Post[], string>();


const addPostAsync = createAsyncAction(
  ActionTypes.ADD_POST,
  ActionTypes.ADD_POST_SUCCESS,
  ActionTypes.ADD_POST_FAILURE
)<Post, Post, string>();


const editTodoAsync = createAsyncAction(
  ActionTypes.EDIT_TODO,
  ActionTypes.EDIT_TODO_SUCCESS,
  ActionTypes.EDIT_TODO_FAILURE
)<Todo, Todo, string>();

export {
  loadPostsAsync,
  addPostAsync,
  editTodoAsync,
};
