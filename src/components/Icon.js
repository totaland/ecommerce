import React, {useContext, useEffect} from 'react';
import styled from 'styled-components'
import {ShoppingBasket} from "styled-icons/material/ShoppingBasket"
import {AppContext} from "../context/AppContext";




const Div = styled.div`
  background-color: white;
  width: 260px;
  height: 350px;
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
    background-color: #4dd0e1;
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

const Ul = styled.ul`
  display: flex;
  padding-left: 5%;
  padding-bottom: 2%;
  text-align: left;
`;
const Li = styled.li`
  margin-right: 5px;
`


function Icon(props) {

    const [signOut, state2, dispatch, createUser] = useContext(AppContext);

    // this might come in handy later on
    // useEffect(()=> {
    //     async function checkCart() {
    //         if(state2.orderDetails.length>0) {
    //             dispatch({type: "COMPLETE"});
    //         }
    //     }
    //     checkCart();
    // }, []);

    const total = new Intl.NumberFormat('en-AU', {style: 'currency', currency:'AUD'}).format(state2.total)
    const products = state2.orderDetails;
    // console.log(products.name);
    // console.log(products);
    return (
        <Container>
        <ICON/>
        <Span>
            {props.children}
            <Div>
                <H3>Recently added items:</H3>
                {products.map(product => (
                    <Ul key={product.id}>
                        <Li>{product.name}: </Li>
                        <Li>{product.time} X {product.price}</Li>
                    </Ul>
                ))}
                {/*<hr/>*/}
                <H3>Total: {total}</H3>
            </Div>
        </Span>

        </Container>
    );
}

export default Icon;