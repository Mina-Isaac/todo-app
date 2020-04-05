import { TODOS_API_URL, POSTS_API_URL } from "../constatnts";
import axios from "axios";
import { Post, Todo } from "../constatnts";

let postsCache: Post[] | null = null,
  todosCache: Todo[] | null = null;

const appServices = {
  getAllPosts(): Promise<Post[]> {
    if (postsCache) return new Promise((resolve) => resolve(postsCache!));
    return axios.get(POSTS_API_URL).then((response) => {
      postsCache = response.data;
      return response.data;
    });
  },

  addPost(post: Post): Promise<Post> {
    return axios.post(POSTS_API_URL, post).then((response) => response.data);
  },

  getAllTodos(): Promise<Todo[]> {
    if (todosCache) return new Promise((resolve) => resolve(todosCache!));
    return axios.get(TODOS_API_URL).then((response) => {
      todosCache = response.data;
      return response.data;
    });
  },

  editTodo(item: Todo): Promise<Todo> {
    const path = `${TODOS_API_URL}/${item.id}`;
    return axios.patch(path, item).then((response) => response.data);
  },
};

export type Services = typeof appServices;

export default appServices;
