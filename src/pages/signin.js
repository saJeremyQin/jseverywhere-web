import React, {useEffect} from "react";
import UserForm from "../components/UserForm";
import { useMutation, ApolloClient, gql, useApolloClient} from "@apollo/client";

// define a mutation
const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signUp(email: $email, password: $password)
    }
`;

const SignIn = () => {
    useEffect(() => {
        // update the document title
        document.title = 'Sign In - Notedly'
    });

    const client = useApolloClient();
    //add the mutation hook
    const [signIn, {loading, error}] = useMutation(SIGNIN_USER,{
        onCompleted: data => {
            // console.log the JSON Web Token when the mutation is complete
            // store the JWT in localStorage
            localStorage.setItem('token', data.signIn);

            // update the local cache
            client.writeData({ data:{ isLoggedIn: true }});

            // redirect the user to home page
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {/* if the data is loading, display a loading message*/}
            {loading && <p>Loading...</p>}
            {error && <p>Error signing in!</p>}
        </React.Fragment>
    );
};

export default SignIn;