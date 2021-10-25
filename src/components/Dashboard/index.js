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


const PORTFOLIOS = gql`
  query getPortfolios {
    portfolios(limit:5) {
      id
      name
      projects {
        id
        name
        people{
          id
        }
      }
    } 
  }
`;

function Dashboard() {
  const { loading, error, data } = useQuery(PORTFOLIOS);
  if (loading) return <p>Loading pls wait thank you...</p>;
  if (error) return <p>{error}</p>;
  console.log(data)

   let teams = data.portfolios.map(({ id, name, projects }) => (
      <div key={id} className="panel">
        <h1>
          {name}
        </h1>
        <div>
          {projects.map(function (project) {
                  return (
                    <div key={project.id}>
                      <h4></h4>
                      <span>{project.name}</span>
                      <p>{project.people.length}</p>
                    </div>
                  );
          })}
        </div>
      </div>
    ));
    console.log(teams)



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
