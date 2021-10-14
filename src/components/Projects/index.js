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


const PROJECTS = gql`
  query getProjects {
    projects {
      id
      abbreviation
      name
      portfolioName
      subtitle
      tags
      status
    } 
  }
`;

function Projects() {
  const { loading, error, data } = useQuery(PROJECTS);
  if (loading) return <p>Loading pls wait thank you...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data)

   let projects = data.projects.map(({ id, name, portfolioName, subtitle, tags, status, abbreviation }) => (
      <div key={id} className="project">
        <h4>{abbreviation}</h4>
        <h1>
          {name}
        </h1>
        <p>{portfolioName}</p>
        <p>{subtitle}</p>
        <p>{status}</p>
        <p>{tags}</p>

        <div>
          {/*          {projects.map(function (project) {
                  return (
                    <div key={project.id}>
                      <h4>{project.people[0].abbreviation}</h4>
                      <span>{project.name}</span>
                      <p>10</p>
                    </div>
                  );
          })}*/}
        </div>
      </div>
    ));



    return (
     <>
     <Header></Header>
     <Nav></Nav>
     <div className="Projects content-wrapper">
          {projects}
      </div>
     </>
    );
}

export default Projects
