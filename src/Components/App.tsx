import React from "react";
import styled from "styled-components";
import { Route, Switch, useHistory } from "react-router-dom";
import Todos from "./Todos";
import Home from "./Home";
import Posts from "./Posts";
import { Button } from "./SharedComponents";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#5cb8f7, #357dec) fixed;
  background-attachment: fixed;
  background-size: cover;
`;

const SubWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0;
  margin-left: auto;
  width: 20%;
  height: 100%;
`;

const NavContainer = styled.div`
  align-items: center;
  width: 96vw;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 3px 2vw;
  display: flex;
  justify-content: space-between;
  margin-bottom: auto;
`;

function App() {
  const {
    push,
    location: { pathname }
  } = useHistory();
  function handleClick(route: string) {
    return () => push(`/todo-app/${route}`);
  }

  return (
    <>
      <Container>
        <NavContainer>
          <Button
            active={pathname === "/todo-app/" || pathname === "/todo-app"}
            width="10"
            onClick={handleClick("")}
          >
            Home
          </Button>
          <SubWrapper>
            <Button
              active={pathname === "/todo-app/todos"}
              width="30%"
              onClick={handleClick("todos")}
            >
              Todos
            </Button>
            <Button
              active={pathname === "/todo-app/posts"}
              width="30%"
              onClick={handleClick("posts")}
            >
              Posts
            </Button>
          </SubWrapper>
        </NavContainer>

        <Switch>
          <Route path="/todo-app/" exact component={Home} />
          <Route path="/todo-app/todos" exact component={Todos} />
          <Route path="/todo-app/posts" exact component={Posts} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
