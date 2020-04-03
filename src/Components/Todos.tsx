import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../Store/store";
import { loadTodosAsync, editTodoAsync } from "../Store/Todos/todos.actions";
import ReactPaginate from "react-paginate";
import * as Shared from "./SharedComponents";
import { setTodoOffset } from "../Store/Pagination/pagination.actions";
import styled from "styled-components";

const Li = styled.li<{ completed: boolean }>`
  font-size: 16;
  margin: 1.5% 0;
  font-weight: bold;
  width: fit-content;
  cursor: pointer;
  background-color: ${({ completed }) =>
    completed ? "rgba(0, 128, 0, 0.3)" : "rgba(255, 0, 0, 0.3)"};
`;

const Todos: React.FC = () => {
  const dispatch = useDispatch();
  const loadingTodos = useSelector((state: AppState)=>state.loadingState.todoData)

  useEffect(() => {
    if (loadingTodos === 'unchanged') dispatch(loadTodosAsync.request());
  }, []);
  const numberOfTodos = useSelector(
    (state: AppState) => state.todos.length
  );
  const perPage = 10;
  const pageCount = Math.ceil(numberOfTodos / perPage);
  const offset = useSelector((state: AppState) => state.pagination.todoOffset);
  const todos = useSelector((state: AppState) =>
    state.todos.slice(offset, offset + perPage)
  );
  const handlePageClick = function({ selected }: { selected: number }) {
    dispatch(setTodoOffset(selected * perPage));
  };

  const todoList = useMemo(
    () =>
      todos.map((item, i) => (
        <Li
          completed={item.completed}
          key={i}
          onClick={() => {
            dispatch(
              editTodoAsync.request({
                old: item,
                ind: i + offset,
                new: { ...item, completed: !item.completed }
              })
            );
          }}
        >
          <span
            style={{
              textDecorationLine: item.completed ? "line-through" : undefined
            }}
          >
            {item.title}
          </span>
        </Li>
      )),
    [todos, dispatch, offset]
  );

  return (
    <Shared.Wrapper>
      <Shared.Title>Todo list</Shared.Title>
      <Shared.HrFlex />
      <Shared.ListRendrer
        data={todoList}
        loading={loadingTodos === 'requested'}
      ></Shared.ListRendrer>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel={<span className="gap">...</span>}
        breakClassName="page-button"
        pageCount={pageCount}
        forcePage={offset / perPage}
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        pageClassName="page-button"
        previousLinkClassName="page-nav"
        nextLinkClassName="page-nav"
        disabledClassName="disabled"
        activeClassName="active"
      />
    </Shared.Wrapper>
  );
};
export default Todos;
