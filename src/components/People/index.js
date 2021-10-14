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


const PEOPLE = gql`
  query getPeople{
    people {
      id
      abbreviation
      name
    } 
  }
`;

function People() {
  const { loading, error, data } = useQuery(PEOPLE);
  if (loading) return <p>Loading pls wait thank you...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data)

   let people = data.people.map(({ id, name, abbreviation }) => (
      <div key={id} className="person">
        <h4>{abbreviation}</h4>
        <h1>
          {name}
        </h1>

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
     <div className="People content-wrapper">
          {people}
      </div>
     </>
    );
}

export default People
