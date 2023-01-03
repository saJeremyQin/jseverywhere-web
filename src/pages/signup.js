
import React, { useEffect, useState } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";

import styled from "styled-components";
import Button from "../components/Button";
import UserForm from "../components/UserForm";

// define a mutation
const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }
    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;


// include the props passed to the component for later use
const SignUp = props => {
    useEffect(()=>{
        document.title = 'Sign Up - Notedly';
    });

    const client = useApolloClient();

    //add the mutation hook
    const [signUp, {loading, error}] = useMutation(SIGNUP_USER,{
        onCompleted: data => {
            // console.log the JSON Web Token when the mutation is complete
            // store the JWT in localStorage
            localStorage.setItem('token', data.signUp);

             // update the local cache
            client.writeData({ data: { isLoggedIn: true } });

            // redirect the user to home page
            props.history.push('/');
        }
    });

    return (
        <UserForm action={signUp} formType="signUp" />
        // <Wrapper>
        //     <h2>Sign Up</h2>
        //     <Form onSubmit={ event => {
        //         event.preventDefault();
        //         signUp({
        //             variables: {
        //                 ...values
        //             }
        //         });
        //     }}>
        //         <label htmlFor="username">Username:</label>
        //         <input
        //             required
        //             type="text"
        //             id="username"
        //             name="username"
        //             placeholder="username"
        //             onChange={onChange}
        //         />
        //         <br />
        //         <label htmlFor="email">Email:</label>
        //         <input
        //             required
        //             type="text"
        //             id="email"
        //             name="email"
        //             placeholder="email"
        //             onChange={onChange}
        //         />
        //         <br />
        //         <label htmlFor="password">Password:</label>
        //         <input
        //             required
        //             type="text"
        //             id="password"
        //             name="password"
        //             placeholder="password"
        //             onChange={onChange}
        //         />
        //         <br />
        //         <Button type="submit">Submit</Button>
        //     </Form>
        // </Wrapper>

    );
};

export default SignUp;