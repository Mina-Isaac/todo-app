export const TODOS_API_URL = "https://jsonplaceholder.typicode.com/todos";
export const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts";

export type Post = {
  id?: number;
  title: string;
  body: string;
  userId: number;
};

export type Todo = {
  id?: number;
  title?: string;
  completed: boolean;
  userId?: number;
};

export const ActionTypes = {
  //Posts action types
  FETCH_POSTS: "FETCH_POSTS",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  FETCH_POSTS_FAILURE: "FETCH_POSTS_FAILURE",

  ADD_POST: "ADD_POST",
  ADD_POST_SUCCESS: "ADD_POST_SUCCESS",
  ADD_POST_FAILURE: "ADD_POST_FAILURE",

  //Todos action types
  FETCH_TODOS: "FETCH_TODOS",
  FETCH_TODOS_SUCCESS: "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_FAILURE: "FETCH_TODOS_FAILURE",

  EDIT_TODO: "EDIT_TODO",
  EDIT_TODO_SUCCESS: "EDIT_TODO_SUCCESS",
  EDIT_TODO_FAILURE: "EDIT_TODO_FAILURE",

  //Pagination action types
  SET_TODO_OFFSET: "SET_TODO_OFFSET",
  SET_POST_OFFSET: "SET_POST_OFFSET",
};
