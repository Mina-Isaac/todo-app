import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../constatnts";

const setTodoOffset = createAction(
  ActionTypes.SET_TODO_OFFSET, (offset: number)=>offset
)<number>()


const setPostOffset = createAction(
  ActionTypes.SET_POST_OFFSET, (offset: number)=>offset
)<number>()

export {
  setTodoOffset ,
  setPostOffset,
};
