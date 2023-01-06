import React from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import styled from "styled-components";
import NoteUser from "./NoteUser";

import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../gql/query";

// Keep notes from extending wider than 800px
const StyledNote = styled.article`
    max-width: 800px;
    margin: 0 auto;
`;

// Style the note metadata
const MetaData = styled.div`
    @media (min-width: 500px) {
        display: flex;
        align-items: top;
    }
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
    padding-right: 1em;
`;

// align 'UserActions' to the right on large screens
const UserActions = styled.div`
    margin-left: auto;
`;

const Note = ({note}) => {
    const {data ,loading, error} = useQuery(IS_LOGGED_IN);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;

    return (
        // <article>
        //      <img 
        //         src={note.author.avatar}
        //         alt={`${note.author.username} avatar`}
        //         height="50"
        //     />{' '}
        //     {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
        //     <ReactMarkdown source={note.content}/>
        // </article>
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img 
                        src={note.author.avatar}
                        alt={`${note.author.username} avatar`}
                        height="50"
                    />
                </MetaInfo>
                <MetaInfo>
                    <em>by</em> {note.author.username} <br/>
                    {format(note.createdAt,"MMM Do YYYY")}
                </MetaInfo>
                {data.isLoggedIn ? (
                    <UserActions>
                        <NoteUser note={note} />
                    </UserActions>
                ) : (
                    <UserActions>
                        <em>Favorites:</em> {note.favoriteCount}
                    </UserActions>
                )}  
            </MetaData>
            <ReactMarkdown source={note.content}/>
        </StyledNote>
    );
};


export default Note;