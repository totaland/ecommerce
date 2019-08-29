import React from "react";
import styled from "styled-components";
import GetCheckOutStep from "./GetCheckOutStep";

const Div = styled.div`
    margin: 2em;
    width: 30%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

function CheckOut(props) {

  return (
    <Div>
      <GetCheckOutStep/>
    </Div>
  );
}

export default CheckOut;