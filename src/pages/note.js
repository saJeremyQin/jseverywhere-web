
import React from "react";
// import GraphQL dependencies
import { useQuery, gql } from "@apollo/client";
// import the Note component
import Note from "../components/Note";

const GET_NOTE = gql`
    query note($id: ID!) {
        note(id:$id)  {
            id
            content  
            createdAt
            favoriteCount
            author {
                id
                username
                email
                avatar
            }
        }
    }
`;

const NotePage = props => {
    // store the id found in the url as a variable
    const id = props.match.params.id;
    // query hook, passing the id value as a variable
    const { data, loading, error } = useQuery(GET_NOTE, {variables:{id}});

    // if the data is loading, display a loading message
    if(loading)
        return <p>loading...</p>
    // if there is an error fetching the data, display an error message
    if(error)
        return <p>Error!</p>
    // if the data is successful, display the data in our UI
    return <Note note={data.note} />;
    // return (
    //     <div>
    //         <p>id is :{props.match.params.id}</p>
    //     </div>
    // );
};

export default NotePage;