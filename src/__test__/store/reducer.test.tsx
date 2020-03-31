import reducer from "../../Store/rootReducer";
import {AppState} from '../../Store/store'
import * as todoActions from "../../Store/Todos/todos.actions";
import * as postActions from '../../Store/Posts/posts.actions';
import * as paginationActions from '../../Store/Pagination/pagination.actions'
import { Todo, Post } from "../../constatnts";
import sampleTodos from '../fixtures/sampleTodo'
import samplePosts from '../fixtures/samplePosts'



const getInitialState = (initial?: Partial<AppState>) =>
  reducer(initial as AppState, {} as any);

describe("Reducer test", () => {
  it("initial state should match a snapshot", () => {
    const initialState = getInitialState();
    expect(initialState).toMatchSnapshot();
  });

  it("should put retrieved todos data in the store and set loading flag to false", () => {
    const initialState = getInitialState();
    const state = reducer(
      initialState,
      todoActions.loadTodosAsync.success(sampleTodos)
    );
    expect(state.todos.data).toStrictEqual(sampleTodos);
    expect(state.todos.isLoadingTodos).toEqual(false);
  });

  it("should put retrieved posts data in the store and set loading flag to false", () => {
    const initialState = getInitialState();
    const state = reducer(
      initialState,
      postActions.loadPostsAsync.success(samplePosts)
    );
    expect(state.posts.data).toStrictEqual(samplePosts);
    expect(state.posts.isLoadingPosts).toEqual(false);
  });
  it("should set data to [] and set loading flag to false with when an error occures", () => {
    const initialState = getInitialState();
    initialState.posts.isLoadingPosts = true;
    initialState.todos.isLoadingTodos = true;
    const stateWithPostData = reducer(
      initialState,
      postActions.loadPostsAsync.failure(new Error("some error occurred"))
    );
    const stateWithTodoData = reducer(
      initialState,
      todoActions.loadTodosAsync.failure(new Error("some error occurred"))
    );
    expect(stateWithPostData.posts.data).toHaveLength(0);
    expect(stateWithPostData.posts.isLoadingPosts).toBeFalsy();
    expect(stateWithTodoData.todos.data).toHaveLength(0);
    expect(stateWithPostData.todos.isLoadingTodos).toBeFalsy();
  });
});
