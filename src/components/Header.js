
import React from "react";
import logo from "../img/logo.svg";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { IS_LOGGED_IN } from "../gql/query";

// import both Link and withRouter from React Router
import { Link, withRouter } from "react-router-dom";
// import the ButtonAsLink component
import ButtonAsLink from './ButtonAsLink';


const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;


const Header = props => {
  // query hook for user logged in state
  const { data, client } = useQuery(IS_LOGGED_IN);

  const btnHandler = () => {
    // remove the token
    localStorage.removeItem('token');
    // clear the application's cache
    client.resetStore();
    // update local state
    client.writeData({data:{isLoggedIn: false}});
    // redirect the user to the home page
    props.history.push('/');
  };
  
  return (
      <HeaderBar>
          <img src={logo} alt="it is Notedly logo" height="40" />
          <LogoText>Notedly</LogoText>
          {/* If logged in display a logout link, else display sign-in options */}
          <UserState>
            {data.isLoggedIn ? (
              <ButtonAsLink onClick={ btnHandler }>
                Log Out
              </ButtonAsLink>
            ) : (
              <p>
                <Link to='/signin'>Sign In</Link> or {''}
                <Link to='/signup'>Sign Up</Link>
              </p>
            )}
          </UserState>
      </HeaderBar>
  );
};

// we wrap our component in the withRouter higher-order component
export default withRouter(Header);