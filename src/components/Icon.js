import React, {useContext, useEffect} from 'react';
import styled from 'styled-components'
import {ShoppingBasket} from "styled-icons/material/ShoppingBasket"
import {AppContext} from "../context/AppContext";
import Avatar from "./Avatar";
import { image } from "./BasketReview";




const Div = styled.div`
  background-color: white;
  width: 280px;
  height: 100%;
  max-height: 100%;
  min-height: 455px;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(119, 119, 119, 1);
  -moz-box-shadow: 0px 2px 5px 0px rgba(119, 119, 119, 1);
  box-shadow: 0px 2px 5px 0px rgba(119, 119, 119, 1);
  margin-top: 2rem;
  border-radius: 5px;
  position: absolute;
  top: 4%;
  right: 15%;
  display: none;
  color: black;
`;

const Container = styled.div`
  &:hover ${Div} {
      display: block;
  }
`;

const ICON = styled(ShoppingBasket)`
  width: 30px;
`;

const Span = styled.span`
    position: absolute;
    top: 4%;
    background-color: #6772e5;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    margin-left: 15px;
    &:hover ${Div} {
      display: block;
    };
`;

const H3 = styled.h3`
  margin: 0;
  padding: 5%;  
`;

export const Ul = styled.ul`
  display: flex;
  padding-left: 5%;
  padding-bottom: 2%;
  text-align: left;
  align-items: center;
`;
export const Li = styled.li`
  margin-right: 5px;
  margin-left: 5%;
`;

const HR = styled.hr`
    width: 90%;
    border: solid 1px lightgrey;
`;


function Icon(props) {

    const [signOut, state2, dispatch, createUser] = useContext(AppContext);

    const total = new Intl.NumberFormat('en-AU', {style: 'currency', currency:'AUD'}).format(state2.total);
    const products = state2.orderDetails;
    return (
        <Container>
        <ICON/>
        <Span>
            {props.children}
            <Div>
                <H3>Recently added items:</H3>
                <HR/>
                {products.map(product => (
                    <Ul key={product.id}>
                        <Avatar src={image(product)} size={"40px"} alt={product.name}/>
                        <Li>{product.name}: </Li>
                        <Li>{product.time} X {product.price}</Li>
                    </Ul>
                ))}
                <HR/>
                <H3>Total: {total}</H3>
            </Div>
        </Span>
        </Container>
    );
}

export default Icon;