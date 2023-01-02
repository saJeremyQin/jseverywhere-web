
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

// import the required libraries
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import NoteFeed from "../components/NoteFeed";
import Button from "../components/Button";

// our GraphQL query, stored as a variable
const GET_NOTES = gql`
    query noteFeed ($cursor: String) {
        noteFeed(cursor:$cursor)  {
          cursor
          hasNextPage
          notes {
              id
              content
            createdAt
            favoriteCount
            author {
              id
              username
              avatar
            }
        }
      }    
    }
`;

const Home = () => {

    const btnHandler = () => {
        fetchMore({
            variables:{
                cursor:data.noteFeed.cursor
            },
            updateQuery:(previousResult, {fetchMoreResult}) => {
                return {
                    noteFeed: {
                        cursor: fetchMoreResult.noteFeed.cursor,
                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                        // combine the new results and the old
                        notes: [
                            ...previousResult.noteFeed.notes,
                            ...fetchMoreResult.noteFeed.notes
                        ],
                        _typename:'noteFeed'
                    }
                }
            }
        });
    };

    
    // query hook
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
    // if the data is loading, display a loading message
    if(loading)
        return <p>loading...</p>;
    // if there is an error fetching the data, display an error message
    if(error)
        return <p>Error!</p>;
    // if the data is successful, display the data in our UI
    if(data) 
        return (
            <React.Fragment>
                <NoteFeed notes={data.noteFeed.notes} />
                {/* Only display the Load More button if hasNextPage is true */}
                {data.noteFeed.hasNextPage && (
                    <Button onClick={btnHandler}>Load more</Button>
                )}
            </React.Fragment>
        );
            // <div>
            //     {data.noteFeed.notes.map(note => (
            //         <article key={note.id}>
            //         <img
            //             src={note.author.avatar}
            //             alt={`${note.author.username} avatar`}
            //             height="50"
            //         />{' '}
            //         {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
            //         <ReactMarkdown source={note.content}/>
            //         </article>
            //     ))}
            // </div>                  
        //);
};

export default Home;