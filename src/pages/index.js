import React from "react";
// update our react-router import to include Redirect
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import Layout from "../components/Layout";

import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorite";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./signin";
import EditNote from "./edit";
// import the NewNote route component
import NewNote from "./new";
import { IS_LOGGED_IN } from "../gql/query";

// define routes
const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <PrivateRoute path='/new' component={NewNote} />
                <PrivateRoute path="/edit/:id" component={EditNote} />
                <Route path="/note/:id" component={NotePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn}/>
            </Layout>
        </Router>
    );
};

const PrivateRoute = ({component: Component, ...rest}) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;
    // if the user is logged in, route them to the requested component
    // else redirect them to the sign-in page
    return (
        <Route 
            {...rest}
            render={
                props => data.isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location}
                        }} 
                    />)
            }
        />
    );
};

export default Pages;