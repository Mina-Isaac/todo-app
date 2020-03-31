import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  z-index: 1;
  padding: 1% 2%;
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 80vw;
  height: 85vh;
  border-radius: 6px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 10px auto auto auto;
  overflow: auto;
`;

const Title = styled.h3`
  color: green;
  font-size: 12;
  font-weight: bold;
  align-self: baseline;
`;

const HrFlex = styled.hr`
  margin-left: 0;
  margin-right: 0;
`;

const Button = styled.button<{ width?: number | string; active?: boolean }>`
  background-color: ${({active})=>active?'green': 'white'};
  border: solid 2px green;
  color: ${({active})=>active?'white': 'green'};
  padding: 1% 2%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14;
  font-weight: bold;
  width: ${props => props.width};
  border-radius: 5%;
  transition-duration: 0.4s;
  cursor: pointer;
  &:hover {
    background-color: green;
    color: white;
  }
`;

type Props = {
  data: any[];
  loading: boolean;
};

const ListRendrer: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      {props.loading ? (
        <span style={{ fontSize: 16, fontWeight: "bold" }}>Loading...</span>
      ) : (
        <ul>{props.data}</ul>
      )}
    </>
  );
};
export { Wrapper, Title, Button, HrFlex, ListRendrer };
