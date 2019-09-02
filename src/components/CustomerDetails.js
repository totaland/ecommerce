import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";

const Div = styled.div`

`;
const H2 = styled.h2`
  margin: 0;
`;
const FormStyled = styled(Form)`
  width: 100%;
`;
export const FieldStyled = styled(Field)`
  padding-left: 14px;
  width: 100%;
  height: 2em;
  line-height: 2em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  display: block;
  margin: 10px 0 2em 0;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1em;
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
`;

export const Button = styled.button`
  margin-right: 1em;
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
  font-size: 1em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background-color: #2d6790;
  text-decoration: none;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
  margin-top: 10px;
  //width: 30%;
  &:hover {
    color: #fff;
    cursor: pointer;
    background-color: rgba(62,108,219,1);
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  &:active {
    transform: translateY(2px);
  }
  
`;
const DivH1 = styled.div`
  background-color: #4dd0e1;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: white;
`;

const Error = styled.div`
  color: #ee6e73;
`;

const schema = yup.object({
  first_name: yup.string().required('Please enter your first name'),
  last_name: yup.string().required('Please enter your last name'),
  // email: yup
  //   .string()
  //   .email()
  //   .required('Please enter your Email'),
  address: yup
    .string()
    .required('Please enter your address'),
  // phone_number: yup
  //   .string()
  //   .required('Please enter your phone number')
  //   .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Must included country code'),
});

function CustomerDetails(props) {

  const [
    signOut,
    state2,
    dispatch,
    createUser,
    createBasket,
    createItem
  ] = useContext(AppContext);

  let firstName;
  if(state2.firstName === "") {
    firstName = "First Name";
  } else {
    firstName = state2.firstName;
  }
  let lastName;
  if(state2.lastName === "") {
    lastName = "Last Name";
  } else {
    lastName = state2.lastName;
  }
  return (
    <>
      <H2>Your Details</H2>
      <Formik
        validationSchema={schema}
        initialValues={{first_name: state2.firstName, last_name: state2.lastName, address:state2.address}}
        onSubmit={(values, {setSubmitting, setValues}) => {
          setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              dispatch({
                type: "SETNAME",
                firstName: values.first_name,
                lastName: values.last_name,
                address: values.address
              });
              dispatch({type: "SETSTEP"});
              setSubmitting(false);
          }, 400);
        }}
      >
        {({isSubmitting}) => (
          <FormStyled>
            <FieldStyled type="text" name="first_name" placeholder={firstName} />
            <ErrorMessage name="first_name" component={Error}/>
            <FieldStyled type="text" name="last_name" placeholder={lastName} />
            <ErrorMessage name="last_name" component={Error}/>
            {/*<FieldStyled type="email" name="email" placeholder={"Email"}/>*/}
            {/*<ErrorMessage name="email" component={Error}/>*/}
            <FieldStyled type="text" name="address" placeholder={"Address"}/>
            <ErrorMessage name="address" component={Error}/>
            {/*<FieldStyled type="text" name="phone_number" placeholder={"Phone Number"}/>*/}
            {/*<ErrorMessage name="phone_number" component={Error}/>*/}
            <Button type="submit" disable={isSubmitting}>
              Continue
            </Button>
          </FormStyled>
        )}
      </Formik>
    </>
  );
}

export default CustomerDetails;