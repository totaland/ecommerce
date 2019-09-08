import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AppContext } from "../context/AppContext";
import { Auth, Hub } from "aws-amplify";
import landingpage from "../images/landingpage.jpg";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
export const Div = styled.div`
  padding: 3em;
  display: flex;
  justify-content: center;
  width: 50%;
  max-height: 100%;
  align-items: center;
`;

export const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 60%;
  min-width: 350px;
`;

export const FieldStyled = styled(Field)`
  width: 80%;
  height: 2em;
  border-bottom: 1px solid #ccc;
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: #fff;
  margin-top: 16px;
  margin-bottom: 8px;
  border-radius: 3px;
  font-size: 1rem;
  line-height: 2em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

export const Button = styled.button`
  width: 80%;
  background-color: #00538c;
  border: none;
  padding: 1em 2em;
  border-radius: 3px;
  color: white;
  margin-bottom: 2em;
  font-size: 1rem;
  margin-top: 2em;
`;
export const DivH1 = styled.div`
  font-size: 1.5em;
  line-height: 1.4;
  font-weight: 700;
  font-style: normal;
  color: #00538c;
  width: 80%;
  text-align: center;
  margin-bottom: 1.5em;
`;
export const H2 = styled(DivH1)`
  font-size: 2em;
`;

export const Error = styled.div`
  color: #ee6e73;
`;

export const Label = styled.div`
  font-size: 1.1em;
  line-height: 1.4;
  font-weight: 600;
  font-style: normal;
  color: #065484;
  width: 80%;
`;
export const DivImage = styled.div`
  width: 50%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em;
  flex-direction: column;
`;
export const Img = styled.img`
  width: 100%;
`;
export const P = styled.p`
  color: #065484;
  & a {
    color: #fd7c77;
    text-decoration: none;
  }
`;
export const Hr = styled.hr`
  width: 80%;
  color: #065484;
`;

export default function SignInFormik(props) {
    const [signOut, state2, dispatch, createUser] = useContext(AppContext);

    return (
        <Container>
            <Div>
                <Formik
                    initialValues={{ username: "", password: "" }}
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
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            Auth.signIn({
                                username: values.username,
                                password: values.password
                            })
                            .then(() => {
                                console.log("signed in");
                                // userHasAuthenticated(true);
                                dispatch({ type: "LOGIN" });
                            })
                            .catch(err => {
                                console.log(err);
                                alert(err.message);
                            });
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <FormStyled>
                            <H2>UnderstandU</H2>
                            <DivH1>Welcome Back</DivH1>
                            <Label htmlFor="username">Username</Label>
                            <FieldStyled
                                type="text"
                                name="username"
                                placeholder={"Username"}
                            />
                            <ErrorMessage name="username" component={Error}/>
                            <Label htmlFor="password">Password</Label>
                            <FieldStyled
                                type="password"
                                name="password"
                                placeholder={"Password"}
                            />
                            <ErrorMessage name="password" component={Error}/>
                            <Button type="submit" disable={isSubmitting}>
                                NEXT
                            </Button>
                            <Hr/>
                            <P>
                                Don't have an account?{" "}
                                <NavLink to={"/register"}>Sign Up</NavLink>
                            </P>
                        </FormStyled>
                    )}
                </Formik>
            </Div>
            <DivImage>
                <Img src={landingpage} alt="landingpage"/>
            </DivImage>
        </Container>
    );
}
