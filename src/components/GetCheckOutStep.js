import React, { useContext } from "react";
import styled from "styled-components";
import BasketReview from "./BasketReview";
import CustomerDetails from "./CustomerDetails";
import Payment from "./Payment";
import { AppContext } from "../context/AppContext";

function GetCheckOutStep(props) {
  const [
    signOut,
    state2,
    dispatch,
    createUser,
    createBasket,
    createItem
  ] = useContext(AppContext);
  const step = state2.step;
  switch (step) {
    case 0:
      return <CustomerDetails/>;
    case 1:
      return <BasketReview/>;
    case 2:
      return <Payment/>;
    default:
      throw new Error("Unknown step");
  }
}

export default GetCheckOutStep;
