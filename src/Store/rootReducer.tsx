import { combineReducers } from "redux";
import postsReducer from "./Posts/posts.reducer";
import todosReducer from "./Todos/todos.reducer";
import paginationReducer from "./Pagination/pagination.reducer";
import loadingStateReducer from "./loading.reducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  todos: todosReducer,
  loadingState: loadingStateReducer,
  pagination: paginationReducer,
});

export default rootReducer;
