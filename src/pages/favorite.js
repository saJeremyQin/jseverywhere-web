import React,{ useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_FAVORITES } from "../gql/query";
import NoteFeed from "../components/NoteFeed";

const Favorites = () => {
    useEffect(()=> {
        document.title = 'Notedly - Favorites'
    });

    // query hook
    const { data, loading, error } = useQuery(GET_MY_FAVORITES);

    // if the data is loading, display a loading message
    if(loading)
        return <p>loading...</p>;
    // if there is an error fetching the data, display an error message
    if(error)
        return <p>`Error!--${error.message}`</p>;
        
    // if the query is successful and there are notes, return the feed of notes
    // else if the query is successful and there aren't notes, display a message
    if(data.me.favorites.length !== 0)
        return <NoteFeed data={data.me.favorites}/>;
    else
        return <p>No favorites yet</p>;

};

export default Favorites;