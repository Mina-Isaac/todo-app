import reducer from "../../Store/rootReducer";
import {AppState} from '../../Store/store'
import * as todoActions from "../../Store/Todos/todos.actions";
import * as postActions from '../../Store/Posts/posts.actions';
import sampleTodos from '../fixtures/sampleTodo'
import samplePosts from '../fixtures/samplePosts'
import {loadingFlag} from '../../Store/loading.reducer'



const getInitialState = (initial?: Partial<AppState>) =>
  reducer(initial as AppState, {} as any);

describe("Reducer test", () => {
  it("initial state should match a snapshot", () => {
    const initialState = getInitialState();
    expect(initialState).toMatchSnapshot();
  });

  it("should put retrieved todos data in the store and set loading flag to failed", () => {
    const initialState = getInitialState();
    const state = reducer(
      initialState,
      todoActions.loadTodosAsync.success(sampleTodos)
    );
    expect(state.todos).toStrictEqual(sampleTodos);
    expect(state.loadingState.todoData).toEqual(loadingFlag.succeded);
  });

  it("should put retrieved posts data in the store and set loading flag to failed", () => {
    const initialState = getInitialState();
    const state = reducer(
      initialState,
      postActions.loadPostsAsync.success(samplePosts)
    );
    expect(state.posts).toStrictEqual(samplePosts);
    expect(state.loadingState.postData).toEqual(loadingFlag.succeded);
  });
  it("should set data to [] and set loading flag to false when an error occures", () => {
    const initialState = getInitialState();
    initialState.loadingState.postData = loadingFlag.requested;
    initialState.loadingState.todoData = loadingFlag.requested;
    const stateWithPostData = reducer(
      initialState,
      postActions.loadPostsAsync.failure(new Error("some error occurred"))
    );
    const stateWithTodoData = reducer(
      initialState,
      todoActions.loadTodosAsync.failure(new Error("some error occurred"))
    );
    expect(stateWithPostData.posts).toHaveLength(0);
    expect(stateWithPostData.loadingState.postData).toEqual(loadingFlag.failed);
    expect(stateWithTodoData.todos).toHaveLength(0);
    expect(stateWithTodoData.loadingState.todoData).toEqual(loadingFlag.failed);
  });
});
