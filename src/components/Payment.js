import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import {
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    Elements,
    injectStripe,
    StripeProvider
} from "react-stripe-elements";
import {AppContext} from "../context/AppContext";

const Label = styled.label`
  color: #6b7c93;
  font-weight: 300;
  letter-spacing: 0.025em;
`;

const Form = styled.form`
  margin-bottom: 40px;
  width: 100%;
  //background-color: lightgrey;
  padding: 1em;
  border: 1px solid lightgrey;
  border-radius: 3px;
`;
const Button = styled.button`
  white-space: nowrap;
  border: 0;
  outline: 0;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #fff;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background-color: #6772e5;
  text-decoration: none;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
  margin-top: 10px;
  width: 100%;
  &:hover {
    color: #fff;
    cursor: pointer;
    background-color: #7795f8;
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
let id;
function Payment({stripe: {createToken, customers}}) {

    const [signOut, state2, dispatch, createUser, createBasket, createItem] = useContext(AppContext);

    useEffect(()=> {
        function setBasketID() {
            dispatch({type: "CHECKSTATE"});
            id=state2.basketId;
        }
        setBasketID();
    },[state2.basketId]);

    console.log(state2.orderDetails);
    let des = "For the purchases of: ";
    for (let i = 0; i < state2.orderDetails.length; i++) {
        if(i === state2.orderDetails.length-1) {
            des = des + "and " + state2.orderDetails[i].time + "x" + state2.orderDetails[i].name + ".";
        } else {
            des = des + state2.orderDetails[i].time + "x" + state2.orderDetails[i].name + ", ";
        }
    }
    console.log(state2);

    // creating user, basket, item in DynamoDB, sending token, amount to backend
    const submit = async ev => {
        ev.preventDefault();
        // get description of purchases

        // creating the token
        let {token} = await createToken({name: "Name"});
        // sending the data to backend
        let response = await fetch("https://wm9vjg32g3.execute-api.ap-southeast-2.amazonaws.com/dev/charge", {
            method: "POST",
            body: JSON.stringify({
                token: token.id,
                charge: {
                    amount: Number(state2.total*100).toFixed(0),
                    currency: "aud",
                    description: des
                },
                customer: {
                    name: state2.username,
                    email: state2.email,
                    phone: state2.phone
                },
            }),
        });

        if(response.ok){
            dispatch({type: "COMPLETE"}); // what to do after setting it to complete?
            console.log("Purchase Complete");
        //  after complete the pay then users will receive the report
        //  will call the method that send the report to user email address here.
        }
        // create users
        try {
            await createUser();
        } catch (e) {
            console.log(e);
        }

        try{
            await dispatch({type: "SETTOKEN", tokenId: token.id});
            await createBasket(token.id);
        } catch (e) {
            console.log(e);
        }

    };

    if(state2.complete) return <h1>Purchase Complete</h1>;
    return (
        <Div>
            <p>Would you like to complete the purchase?</p>
            <Form>
                <Label>
                    Card Number
                    <CardNumberElement/>
                </Label>
                <Label>
                    Expiration Date
                    <CardExpiryElement/>
                </Label>
                <Label>
                    CVC
                    <CardCVCElement/>
                </Label>
                <Button onClick={submit}>Submit Payment</Button>
            </Form>
        </Div>
    );
}

export default injectStripe(Payment);
