import { createAsyncAction } from "typesafe-actions";
import { ActionTypes } from "../../constatnts";
import { Todo } from "../../constatnts";

const loadTodosAsync = createAsyncAction(
  ActionTypes.FETCH_TODOS,
  ActionTypes.FETCH_TODOS_SUCCESS,
  ActionTypes.FETCH_TODOS_FAILURE
)<undefined, Todo[], Error>();


const editTodoAsync = createAsyncAction(
  ActionTypes.EDIT_TODO,
  ActionTypes.EDIT_TODO_SUCCESS,
  ActionTypes.EDIT_TODO_FAILURE
)<{ind: number, old:Todo, new: Todo}, Todo, {ind: number, old: Todo, err: Error}>();


export {
  loadTodosAsync,
  editTodoAsync,
};
