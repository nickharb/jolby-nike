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
      projects{
        id
        name
        people {
          id
          abbreviation
        }
      }
    } 
  }
`;

function Dashboard() {
  const { loading, error, data } = useQuery(TEAMS);
  if (loading) return <p>Loading pls wait thank you...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data)

   let teams = data.teams.map(({ id, name,projects }) => (
      <div key={id} className="panel">
        <h1>
          {name}
        </h1>
        <div>
          {projects.map(function (project) {
                  return (
                    <div key={project.id}>
                      <h4>{project.people[0].abbreviation}</h4>
                      <span>{project.name}</span>
                      <p>10</p>
                    </div>
                  );
          })}
        </div>
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
