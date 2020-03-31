import { combineReducers } from "redux";
import postsReducer from "./Posts/posts.reducer";
import todosReducer from './Todos/todos.reducer';
import paginationReducer from './Pagination/pagination.reducer'

const rootReducer = combineReducers({
    posts: postsReducer,
    todos: todosReducer,
    pagination: paginationReducer,
  });

  export default rootReducer