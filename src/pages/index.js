import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorite";
import NotePage from "./note";

// define routes
const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home}></Route>
                <Route path="/mynotes" component={MyNotes}></Route>
                <Route path="/favorites" component={Favorites}></Route>
                <Route path="/note/:id" component={NotePage}></Route>
            </Layout>
        </Router>
    );
};

export default Pages;