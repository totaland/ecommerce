import React, { useContext, useState } from "react";
import { Container, Hr, P } from "./SignInFormik";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Auth } from "aws-amplify";
import * as yup from "yup";
import {
    DivImage,
    Img,
    H2,
    DivH1,
    FormStyled,
    Button,
    Label,
    Div
} from "./SignInFormik";
import landingpage from "../images/landingpage.jpg";
import { NavLink } from "react-router-dom";

const FieldStyled = styled(Field)`
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

const Error = styled.div`
  color: #ee6e73;
`;

const schema = yup.object({
    username: yup.string().required("Please Enter a username"),
    email: yup
    .string()
    .email()
    .required("Please Enter your Email"),
    password: yup
    .string()
    .required("Please Enter your password")
    .min(8, "At least 8 chars")
    .matches(/[a-z]/, "At least one lowercase char")
    .matches(/[A-Z]/, "At least one uppercase char")
    .matches(
        /[a-zA-Z]+[^a-zA-Z\s]+/,
        "At least 1 number or special char (@,!,#, etc)."
    ),
    phone_number: yup
    .string()
    .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Must included country code")
});

export default function RegisterForm(props) {
    const [signOut, state2, dispatch, createUser] = useContext(AppContext);

    const [initialValue, setValues] = useState({ newUser: null });
    if (initialValue.newUser === null) {
        return (
            <Container>
                <Div>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            username: "",
                            email: "",
                            password: "",
                            phone_number: ""
                        }}
                        validate={values => {
                            let errors = {};
                            if (!values.email) {
                                errors.email = "Email is required";
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = "Invalid email address";
                            }
                            if (!values.username) {
                                errors.username = "Username is required";
                            }
                            if (!values.password) {
                                errors.password = "Password is required";
                            }
                            if (!values.phone_number) {
                                errors.phone_number = "Phone number is required";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));
                                try {
                                    const newUser = Auth.signUp({
                                        username: values.username,
                                        password: values.password,
                                        attributes: {
                                            email: values.email,
                                            phone_number: values.phone_number
                                        }
                                    })
                                    .then(() => console.log("signed up"))
                                    .catch(err => {
                                        console.log(err);
                                        alert(err.message);
                                    });
                                    setValues({
                                        newUser: newUser
                                    });
                                } catch (e) {
                                    alert(e.message);
                                }

                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <FormStyled>
                                <H2>UnderstandU</H2>
                                <DivH1>Welcome</DivH1>
                                <Label>Username</Label>
                                <FieldStyled
                                    type="text"
                                    name="username"
                                    placeholder={"Username"}
                                />
                                <ErrorMessage name="username" component={Error}/>
                                <Label>Password</Label>
                                <FieldStyled
                                    type="password"
                                    name="password"
                                    placeholder={"Password"}
                                />
                                <ErrorMessage name="password" component={Error}/>
                                <Label>Email</Label>
                                <FieldStyled
                                    type="email"
                                    name="email"
                                    placeholder={"Email address"}
                                />
                                <ErrorMessage name="email" component={Error}/>
                                <Label>Phone Number</Label>
                                <FieldStyled
                                    type="text"
                                    name="phone_number"
                                    placeholder={"Phone number"}
                                />
                                <ErrorMessage name="phone_number" component={Error}/>
                                <Button type="submit" disable={isSubmitting}>
                                    Continue
                                </Button>
                                <Hr/>
                                <P>
                                    Already have an account?{" "}
                                    <NavLink to={"/login"}>Login</NavLink>
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
    } else {
        return (
            <Div>
                <Formik
                    initialValues={{ username: "", confirmation_code: "" }}
                    validate={values => {
                        let errors = {};

                        if (!values.username) {
                            errors.username = "Username is required";
                        }
                        if (!values.confirmation_code) {
                            errors.confirmation_code = "Confirmation code is required";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            // alert(JSON.stringify(values, null, 2));
                            try {
                                Auth.confirmSignUp(
                                    values.username,
                                    values.confirmation_code.toString()
                                ).then(() => {
                                    // userHasAuthenticated(true);
                                    dispatch({ type: "LOGIN" });
                                });
                            } catch (e) {
                                alert(e.message);
                            }

                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <FormStyled>
                            <H2>Confirmation</H2>
                            <FieldStyled
                                type="text"
                                name="username"
                                placeholder={"Username"}
                            />
                            <ErrorMessage name="username" component="div"/>
                            <FieldStyled
                                type="number"
                                name="confirmation_code"
                                placeholder={"Confirmation Code"}
                            />
                            <ErrorMessage name="confirmation_code" component="div"/>
                            <Button type="submit" disable={isSubmitting}>
                                Continue
                            </Button>
                        </FormStyled>
                    )}
                </Formik>
            </Div>
        );
    }
}
