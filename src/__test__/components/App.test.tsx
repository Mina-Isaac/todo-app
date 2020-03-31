import React from "react";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { AppState } from "../../Store/store";
import App from "../../Components/App";
import renderer from "react-test-renderer";
import samplePosts from "../fixtures/samplePosts";
import sampleTodos from "../fixtures/sampleTodo";
import { BrowserRouter } from "react-router-dom";

const initialState: AppState = {
  posts: {
    isLoadingPosts: false,
    data: samplePosts
  },
  todos: {
    isLoadingTodos: false,
    data: sampleTodos
  },
  pagination: { todoOffset: 0, postOffset: 0 }
};
const mockStore = configureStore();
let store: any;

describe("Weather app should render without issues", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
