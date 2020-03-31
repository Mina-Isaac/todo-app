import { combineEpics } from 'redux-observable';
import * as postsEpics from './Posts/posts.epic';
import * as todosEpics from './Todos/todos.epic'

export default combineEpics(...Object.values(postsEpics), ...Object.values(todosEpics))

