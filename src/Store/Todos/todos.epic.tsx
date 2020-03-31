import { of, from } from "rxjs";
import { Epic } from "redux-observable";
import * as todoActions from "./todos.actions";
import { Action } from "./todos.reducer";
import {
  catchError,
  map,
  filter,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { AppState } from "../store";
import { Services } from "../services";

export const fetchTodosFlow: Epic<Action, Action, AppState, Services> = (
  action$,
  state$,
  { getAllTodos }
) =>
  action$.pipe(
    filter(isActionOf(todoActions.loadTodosAsync.request)),
    switchMap(action => from(getAllTodos())),
    map(data => todoActions.loadTodosAsync.success(data)),
    catchError(error => of(todoActions.loadTodosAsync.failure(error)))
  );

export const editTodoFlow: Epic<Action, Action, AppState, Services> = (
  action$,
  state$,
  { editTodo }
) =>
  action$.pipe(
    filter(isActionOf(todoActions.editTodoAsync.request)),
    withLatestFrom(state$),
    switchMap(actionAndState => {
      return from(editTodo(actionAndState[0].payload.new)).pipe(
        map(() => todoActions.editTodoAsync.success(actionAndState[0].payload.new)),
        catchError((err: string) => {
          const ind = actionAndState[0].payload.ind
          const old = actionAndState[0].payload.old;
          return of(todoActions.editTodoAsync.failure({ ind, old, err }));
        })
      );
    })
  );
