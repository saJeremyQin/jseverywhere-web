import React from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import styled from "styled-components";

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
                <UserActions>
                    <em>Favorites:</em> {note.favoriteCount}
                </UserActions>
            </MetaData>
            <ReactMarkdown source={note.content}/>
        </StyledNote>
    );
};


export default Note;