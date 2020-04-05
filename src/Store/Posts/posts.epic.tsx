import { of, from } from "rxjs";
import { Epic } from "redux-observable";
import * as postActions from "./posts.actions";
import { Action } from "./posts.reducer";
import { catchError, map, filter, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { AppState } from "../store";
import { Services } from "../services";

export const fetchPostsFlow: Epic<Action, Action, AppState, Services> = (
  action$,
  state$,
  { getAllPosts }
) =>
  action$.pipe(
    filter(isActionOf(postActions.loadPostsAsync.request)),
    switchMap(() =>
      from(getAllPosts()).pipe(
        map((data) => postActions.loadPostsAsync.success(data)),
        catchError((error) => of(postActions.loadPostsAsync.failure(error)))
      )
    )
  );

export const addPostFlow: Epic<Action, Action, AppState, Services> = (
  action$,
  state$,
  { addPost }
) =>
  action$.pipe(
    filter(isActionOf(postActions.addPostAsync.request)),
    switchMap((action) =>
      from(addPost(action.payload)).pipe(
        map(postActions.addPostAsync.success),
        catchError((error) => of(postActions.addPostAsync.failure(error)))
      )
    )
  );
