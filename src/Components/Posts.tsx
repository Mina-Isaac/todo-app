import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../Store/store";
import { loadPostsAsync } from "../Store/Posts/posts.actions";
import ReactPaginate from "react-paginate";
import * as Shared from "./SharedComponents";
import {setPostOffset} from '../Store/Pagination/pagination.actions'

const Posts: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostsAsync.request());
  }, []);
  const numberOfposts = useSelector(
    (state: AppState) => state.posts.data.length
  );
  const perPage = 10;
  const pageCount = Math.ceil(numberOfposts / perPage);
const offset = useSelector((state: AppState)=>state.pagination.postOffset)
  const posts = useSelector((state: AppState) =>
    state.posts.data.slice(offset, offset + perPage)
  );
  const loading = useSelector((state: AppState) => state.posts.isLoadingPosts);
  const handlePageClick = function({ selected }: { selected: number }) {
    dispatch(setPostOffset(selected * perPage));
  };

  const postList = useMemo(
    () =>
      posts.map((item, i) => {
        const body =
          item.body.length >= 133 ? item.body.slice(0, 130) + "..." : item.body;
        return (
          <li key={i}>
            <h4 style={{ margin: 0, padding: 0 }}>{item.title}</h4>
            <p style={{ margin: 0, padding: 0 }}>{body}</p>
          </li>
        );
      }),
    [posts]
  );

  return (
    <Shared.Wrapper>
      <Shared.Title>Posts</Shared.Title>
      <Shared.HrFlex />
        <Shared.ListRendrer
          data={postList}
          loading={loading}
        ></Shared.ListRendrer>

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel="Next →"
        breakLabel={<span className="gap">...</span>}
        breakClassName={"break-me"}
        pageCount={pageCount}
        forcePage = {offset/ perPage}
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
export default Posts;
