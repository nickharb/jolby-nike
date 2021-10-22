import React, { Component } from 'react';
import { Header, Nav } from '../';
import './style.css';
import andromeda from '../../Images/andromeda.jpeg'
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
import {withRouter, RouteComponentProps} from "react-router";

const PORTFOLIOS = gql`
  query getPortfolios($id: ID!) {
    project(id: $id) {
      id
      name
    } 
  }
`;

function Project(props: MyComponentProps)  {
  const { loading, error, data } = useQuery(PORTFOLIOS,{
    variables: { id: props.match.params.id }});
  if (loading) return <p>Loading pls wait thank you...</p>;
  if (error) return <p>{error}</p>;

    return (
     <>
     <Header></Header>
     <Nav></Nav>
     <div className="Person content-wrapper">
          <div>{data.project.name}</div>
      </div>
     </>
    );
}

interface MyComponentProps extends RouteComponentProps {
    myField: string;
}

export default withRouter(Project)
