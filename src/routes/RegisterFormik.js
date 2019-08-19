import React, {useContext, useState} from "react";
import styled from "styled-components";
import {AppContext} from "../context/AppContext";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Auth} from "aws-amplify";
import * as yup from "yup";

const Div = styled.div`
  padding: 3em;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  align-items: center;
`;

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  min-width: 300px;
  width: 50%;
  align-items: center;
  max-height: 450px;
  height: 100%;
  min-height: 60%;
  border: solid 1px rgb(0, 0, 0, 0.2);
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

const schema = yup.object({
    username: yup.string().required('Please Enter a username'),
    email: yup
        .string()
        .email()
        .required('Please Enter your Email'),
    password: yup
        .string()
        .required('Please Enter your password')
        .min(8, 'At least 8 chars')
        .matches(/[a-z]/, 'At least one lowercase char')
        .matches(/[A-Z]/, 'At least one uppercase char')
        .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'At least 1 number or special char (@,!,#, etc).'),
    phone_number: yup
        .string()
        .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Must included country code'),
});

export default function RegisterForm(props) {

    const [signOut, state2, dispatch, createUser] = useContext(AppContext);

    const [initialValue, setValues] = useState({newUser: null,});
    if(initialValue.newUser === null){
        return (
            <Div>
                <Formik
                    validationSchema={schema}
                    initialValues={{username: "", email: "", password: "", phone_number: ""}}
                    validate={values => {
                        let errors = {};
                        if (!values.email) {
                            errors.email = "Email is required";
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = "Invalid email address";
                        }
                        if(!values.username) {
                            errors.username = "Username is required"
                        }
                        if (!values.password) {
                            errors.password = "Password is required";
                        }
                        if (!values.phone_number) {
                            errors.phone_number = "Phone number is required";
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
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
                    {({isSubmitting}) => (
                        <FormStyled>
                            <DivH1>
                                <h1>Register</h1>
                            </DivH1>
                            <FieldStyled type="text" name="username" placeholder={"Username"}/>
                            <ErrorMessage name="username" component={Error}/>
                            <FieldStyled type="password" name="password" placeholder={"Password"}/>
                            <ErrorMessage name="password" component={Error}/>
                            <FieldStyled
                                type="email"
                                name="email"
                                placeholder={"Email address"}
                            />
                            <ErrorMessage name="email" component={Error}/>
                            <FieldStyled
                                type="text"
                                name="phone_number"
                                placeholder={"Phone number"}
                            />
                            <ErrorMessage name="phone_number" component={Error}/>
                            <Button type="submit" disable={isSubmitting}>
                                Continue
                            </Button>
                        </FormStyled>
                    )}
                </Formik>
            </Div>
        );
    } else {
        return (
            <Div>
                <Formik
                    initialValues={{username: "", confirmation_code: ""}}
                    validate={values => {
                        let errors = {};

                        if(!values.username) {
                            errors.username = "Username is required"
                        }
                        if (!values.confirmation_code) {
                            errors.confirmation_code = "Confirmation code is required";
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            // alert(JSON.stringify(values, null, 2));
                            try {
                                Auth.confirmSignUp(values.username, values.confirmation_code.toString()).then(() => {
                                    // userHasAuthenticated(true);
                                    dispatch({type: "LOGIN"})
                                });
                            } catch (e) {
                                alert(e.message);
                            }

                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({isSubmitting}) => (
                        <FormStyled>
                            <DivH1>
                                <h1>Confirmation</h1>
                            </DivH1>
                            <FieldStyled type="text" name="username" placeholder={"Username"}/>
                            <ErrorMessage name="username" component="div"/>
                            <FieldStyled type="number" name="confirmation_code" placeholder={"Confirmation Code"}/>
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
