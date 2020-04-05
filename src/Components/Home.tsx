import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../Store/store";
import { loadPostsAsync, addPostAsync } from "../Store/Posts/posts.actions";
import styled from "styled-components";
import * as Shared from "./SharedComponents";

const Wrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 1% 2%;
  background: #fff;
  width: 40vw;
  height: 48vh;
  border-radius: 6px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 0.2% auto;
  overflow: auto;
  @media (max-width: 420px) {
    width: 90vw;
    margin: auto;
  }
`;

const Form = styled.div`
  z-index: 1;
  padding: 1% 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: #fff;
  width: 40vw;
  height: 35vh;
  border-radius: 6px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 0.3% auto;
  overflow: hidden;
  @media (max-width: 420px) {
    width: 90vw;
    margin: auto;
  }
`;

const Input = styled.input`
  width: 90%;
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
  border: solid 2px green;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 90%;
  font-family: inherit;
  font-size: 14px;
  font-family: "Times New Roman", Times, serif;
  border: solid 2px green;
`;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const loadingPosts = useSelector(
    (state: AppState) => state.loadingState.postData
  );
  const addingPost = useSelector(
    (state: AppState) => state.loadingState.postAdd
  );
  const latetsPosts = useSelector((state: AppState) => state.posts.slice(-3));
  useEffect(() => {
    if (loadingPosts === "unchanged") dispatch(loadPostsAsync.request());
    return;
  }, []);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const handleChange = function (type: "t" | "b") {
    return (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { value } = event.target;
      type === "t" ? setPostTitle(value) : setPostBody(value);
    };
  };
  const handleSubmit = function (event: React.MouseEvent) {
    if (postTitle === "" || postBody === "") return;
    const post = {
      userId: 1,
      title: postTitle,
      body: postBody,
    };
    dispatch(addPostAsync.request(post));
    setPostTitle("");
    setPostBody("");
  };

  const listItems = useMemo(
    () =>
      latetsPosts.map((item, i) => {
        const body =
          item.body.length >= 130 ? `${item.body.slice(0, 127)}...` : item.body;
        return (
          <li key={i}>
            <h4 style={{ margin: 0, padding: 0 }}>{item.title}</h4>
            <p style={{ margin: 0, padding: 0 }}>{body}</p>
          </li>
        );
      }),
    [latetsPosts]
  );

  return (
    <>
      <Wrapper>
        <Shared.Title>Latest Posts</Shared.Title>
        <Shared.HrFlex />
        <Shared.ListRendrer
          data={listItems}
          loading={loadingPosts === "requested" || loadingPosts === "unchanged"}
        ></Shared.ListRendrer>
      </Wrapper>
      <Form>
        <Shared.Title>Add a new post</Shared.Title>
        <Input
          placeholder="Please enter a title for your post"
          required
          disabled={loadingPosts === "requested" || addingPost === "requested"}
          type="text"
          onChange={handleChange("t")}
          value={postTitle}
        />
        <br />
        <TextArea
          placeholder="Please enter your post here"
          required
          disabled={loadingPosts === "requested" || addingPost === "requested"}
          rows={4}
          onChange={handleChange("b")}
          value={postBody}
        />
        <br />
        <Shared.Button width="30%" onClick={handleSubmit}>
          Add post
        </Shared.Button>
      </Form>
    </>
  );
};
export default Home;
