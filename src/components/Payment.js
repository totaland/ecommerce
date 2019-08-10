import React from "react";
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
`
const Button = styled.button`
    white-space: nowrap;
    border: 0;
    outline: 0;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
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
    box-shadow: 0 7px 14px rgba(50, 50, 93, .10), 0 3px 6px rgba(0, 0, 0, .08);
    }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


function Payment({stripe: {createToken, customers} }) {
    const submit = async (ev) => {
        ev.preventDefault();
        let token = createToken({name: "Name"});
        console.log(token);

    };
    return (
        <Div>
            <p>Would you like to complete the purchase?</p>
            <Form>
                <Label>
                    Card Number
                    <CardNumberElement />
                </Label>
                <Label>
                    Expiration Date
                <CardExpiryElement />
                </Label>
                <Label>
                    CVC
                <CardCVCElement />
                </Label>
                <Button onClick={submit}>Submit Payment</Button>
            </Form>
        </Div>
    );
}

export default injectStripe(Payment)
