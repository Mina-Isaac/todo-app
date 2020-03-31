import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../Store/store";
import { loadTodosAsync, editTodoAsync } from "../Store/Todos/todos.actions";
import ReactPaginate from "react-paginate";
import * as Shared from "./SharedComponents";
import { setTodoOffset } from "../Store/Pagination/pagination.actions";

const Todos: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodosAsync.request());
  }, []);
  const numberOfTodos = useSelector(
    (state: AppState) => state.todos.data.length
  );
  const perPage = 10;
  const pageCount = Math.ceil(numberOfTodos / perPage);
  const offset = useSelector((state: AppState) => state.pagination.todoOffset);
  const todos = useSelector((state: AppState) =>
    state.todos.data.slice(offset, offset + perPage)
  );
  const loading = useSelector((state: AppState) => state.todos.isLoadingTodos);
  const handlePageClick = function({ selected }: { selected: number }) {
    dispatch(setTodoOffset(selected * perPage));
  };

  const todoList = useMemo(
    () =>
      todos.map((old, i) => (
        <li
          key={i}
          onClick={() => {
            dispatch(
              editTodoAsync.request({
                old,
                ind: i + offset,
                new: { ...old, completed: !old.completed }
              })
            );
          }}
        >
          <span
            style={{
              textDecorationLine: old.completed ? "line-through" : undefined
            }}
          >
            {old.title}
          </span>
        </li>
      )),
    [todos, dispatch, offset]
  );

  return (
    <Shared.Wrapper>
      <Shared.Title>Todo list</Shared.Title>
      <Shared.HrFlex />
      <Shared.ListRendrer
        data={todoList}
        loading={loading}
      ></Shared.ListRendrer>
      <ReactPaginate
        previousLabel="← Previous"
        nextLabel="Next →"
        breakLabel={<span className="gap">...</span>}
        breakClassName="break-me"
        pageCount={pageCount}
        forcePage={offset / perPage}
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        pageClassName="page-button"
        previousLinkClassName="previous_page"
        nextLinkClassName="next_page"
        disabledClassName="disabled"
        activeClassName="active"
      />
    </Shared.Wrapper>
  );
};
export default Todos;
