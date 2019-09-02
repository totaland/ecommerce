import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import { Button } from "./CustomerDetails";
import tallyUp from "../images/TallyUp.JPG";
import gridLock from "../images/GridLock.JPG";
import matchingFaces from "../images/MatchingFaces.JPG";
import numbbles from "../images/Numbbles.JPG";
import resemble from "../images/Resemble1.JPG";
import shortCuts from "../images/shortCuts.JPG";
import emotionalTies from "../images/EmotionalTies.JPG";
import Avatar from "./Avatar";

const Div = styled.div`
    border: .5px solid lightgrey;
    padding: 2em;
    -webkit-box-shadow: 0px  5px 5px -5px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 5px 5px -5px rgba(0,0,0,0.25);
    box-shadow: 0px  5px 5px -5px rgba(0,0,0,0.25);
`;
const H2 = styled.h2`
  margin: 0;
`;
const P = styled.p`
  text-align: right;
`;
const H3 = styled.h3`
  text-align: right;
`;
const Ul = styled.ul`
  display: flex;
  padding: 0;
  //justify-content: center;
  align-items: center;
`;
const Li = styled.li`
  margin-right: 2%;
  margin-left: 5%;
`;
export const image = (product) => {
  switch (product.name) {
    case "Tally Up":
      return tallyUp;
    case "Grid Lock":
      return gridLock;
    case "Matching Faces":
      return matchingFaces;
    case "Numbblers":
      return numbbles;
    case "Resemble":
      return resemble;
    case "Short Cuts":
      return shortCuts;
    case "Emotional Ties":
      return emotionalTies;
    default:
      return null;
  }
};

function BasketReview(props) {
  const [
    signOut,
    state2,
    dispatch,
    createUser,
    createBasket,
    createItem
  ] = useContext(AppContext);
  const basket = state2.orderDetails;
  const total = new Intl.NumberFormat('en-AU', {style: 'currency', currency:'AUD'}).format(state2.total);
  const tax = new Intl.NumberFormat('en-AU', {style: 'currency', currency:'AUD'}).format(state2.total/11);
  console.log(tax);

  const handleContinue = () => {
    dispatch({type: "SETSTEP"});
  };
  const handleBack = () => {
    dispatch({type: "BACK"});
  };




  return (
    <Div>
      <div>
        <H2>Order Review</H2>
        <hr/>
        {basket.map(product => (
          <Ul key={product.id}>
            <Avatar src={image(product)} size={"50px"} alt={product.name}/>
            <Li>{product.name}: </Li>
            <li>{product.time} X {product.price}</li>
          </Ul>
        ))}
        <hr/>
        <P>Subtotal: AU{total}</P>
        <P>Tax: AU{tax}</P>
        <hr/>
        <H3>Order Total (AUD): AU{total}</H3>
      </div>
      <div>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </Div>
  );
}

export default BasketReview;