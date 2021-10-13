import React, { Component } from 'react';
import { Header, Nav } from '../';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


const TEAMS = gql`
  query getTeams {
    teams {
      id
      name
    } 
  }
`;

function Dashboard() {
  const { loading, error, data } = useQuery(TEAMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

   let teams = data.teams.map(({ id, name }) => (
      <div key={id} className="panel">
        <h1>
          {name}
        </h1>
      </div>
    ));



    return (
     <>
     <Header></Header>
     <Nav></Nav>
     <div className="Dashboard content-wrapper">
          {teams}
      </div>
     </>
    );
}

export default Dashboard
