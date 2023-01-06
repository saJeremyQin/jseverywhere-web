
import React from "react";
// import GraphQL dependencies
import { useQuery, useMutation } from "@apollo/client";
// import the NoteForm component
import NoteForm from "../components/NoteForm";
import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from "../gql/mutation";


const EditNote = props => {
    // store the id found in the url as a variable
    const id = props.match.params.id;

    // query hook, passing the id value as a variable
    const currentNote = useQuery(GET_NOTE, {variables:{id}});

    // fetch the current user's data
    const currentUser = useQuery(GET_ME);

    // define our mutation
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });

    if(currentUser.loading)
        return <p>loading...</p>;
    if(currentNote.loading)
        return <p>loading Note...</p>;

    if(currentUser.error)
        return <p>Error--user query</p>;
    if(currentNote.error)
        return <p>Error--note query</p>;

    // if the current user and the author of the note do not match
    if(currentUser.data.me.id !== currentNote.data.note.author.id)
        return <p>You do not have access to edit this note</p>;
    
        // pass the data and mutation to the form component
    return <NoteForm content={currentNote.data.note.content} action={editNote}/>;
};

export default EditNote;