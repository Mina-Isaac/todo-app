import { applyMiddleware, compose, createStore, Middleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { StateType, ActionType } from "typesafe-actions";
import appServices from "./services";
import rootReducer from "./rootReducer";
import rootAction from "./rootActions";
import rootEpic from "./rootEpic";
import {Services} from './services'

export type Action = ActionType<typeof rootAction>;
export type AppState = StateType<typeof rootReducer>;
const epicMiddleware = createEpicMiddleware<Action, Action, AppState, Services>({
  dependencies: appServices
});
//const middleware: Middleware = epicMiddleware;

const enhancer = compose(applyMiddleware(epicMiddleware));
const store = createStore(rootReducer, enhancer);
epicMiddleware.run(rootEpic);

export default store;
