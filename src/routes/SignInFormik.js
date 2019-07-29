import React, {useContext} from 'react';
import styled from "styled-components";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AppContext} from "../context/AppContext";
import {Auth, Hub} from "aws-amplify";

const Div = styled.div`
  padding: 3em;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  align-items: center;
`;

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  width: 50%;
  min-width: 300px;
  align-items: center;
  max-height: 450px;
  min-height: 350px;
  height: 50%;
  border: solid 1px rgb(0,0,0,0.2);
  justify-content: space-between;
  border-radius: 3px;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(153, 153, 153, 1);
  -moz-box-shadow: 0px 2px 5px 0px rgba(153, 153, 153, 1);
  box-shadow: 0px 2px 5px 0px rgba(153, 153, 153, 1);
`;

const FieldStyled = styled(Field)`
  width: 80%;
  height: 2em;
  border-bottom: 1px solid #ccc;
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: #fff;
  margin-top:16px;
  margin-bottom: 8px;
  border-radius: 3px;
  font-size: 1rem;
  line-height: 2em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const Button = styled.button`
  width: 80%;
  background-color: #4dd0e1;
  border: none;
  padding: 1em 2em;
  border-radius: 3px;
  color: white;
  margin-bottom: 2em;
  font-size: 1rem;
  
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

export default function SignInFormik(props) {
    const [getUserInfo, signOut, candidateID, userHasAuthenticated, state, setState] = useContext(AppContext);

    return (
        <Div>
            <Formik
                initialValues={{username: '', password: ''}}
                validate={values => {
                    let errors = {};
                    if (!values.username) {
                        errors.username = "Username is required";
                    }
                    if (!values.password) {
                        errors.password = "Password is required";
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        Auth.signIn({
                            username: values.username,
                            password: values.password
                        }).then(() => {
                            console.log("signed in");
                            userHasAuthenticated(true);
                        }).catch(err => {
                            console.log(err);
                            alert(err.message);
                        });
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({isSubmitting}) => (
                    <FormStyled>
                        <DivH1><h1>Login</h1></DivH1>
                        <FieldStyled type="text" name="username" placeholder={"Username"}/>
                        <ErrorMessage name="username" component={Error}/>
                        <FieldStyled type="password" name="password" placeholder={"Password"}/>
                        <ErrorMessage name="password" component={Error}/>
                        <Button type="submit" disable={isSubmitting}>
                            Continue
                        </Button>
                    </FormStyled>
                )}
            </Formik>
        </Div>
    )
}

