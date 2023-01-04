import { gql } from "@apollo/client";

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


const IS_LOGGED_IN = gql`
{
    isLoggedIn @client
}`;

export { GET_NOTES, GET_NOTE, IS_LOGGED_IN };
