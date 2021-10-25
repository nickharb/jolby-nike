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
import {withRouter, RouteComponentProps} from "react-router";

const KNOWLEDGEITEM = gql`
  query getKnowledgeItem($id: ID!) {
    knowledgeItem(id: $id) {
      id
      name
      mediaLink
      modifiedByName
      modifiedAt
      filesize
      fileType
      owner{
        id
        name
      }
    } 
  }
`;


function Item(props: MyComponentProps)  {
  const { loading, error, data } = useQuery(KNOWLEDGEITEM,{
    variables: { id: props.match.params.id }});
  if (loading) return <p>Loading pls wait thank you...</p>;
  if (error) return <p>{error}</p>;
  /*date handling*/
  Date.prototype.today = function () { 
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return (days[this.getDay()] + " " + (months[this.getMonth()]) + " " +  this.getDate() +" " + this.getFullYear());
  }
  console.log(data.knowledgeItem)

    return (
     <>
     <Header></Header>
     <Nav></Nav>
     <div className="Person content-wrapper">
          <div class="left-panel">
            <img src={data.knowledgeItem.mediaLink}/>
            <div>{data.knowledgeItem.name || data.knowledgeItem.mediaLink}</div>
            <div>{data.knowledgeItem.filesize} | {data.knowledgeItem.fileType}</div>
            <div>Updated: {new Date(data.knowledgeItem.modifiedAt).today()} by {data.knowledgeItem.modifiedByName}</div>
            <div className="contact">
                {data.knowledgeItem.owner ? data.knowledgeItem.owner.name : ""}
            </div>
          </div>
          <div class="right-panel">
              <img src={data.knowledgeItem.mediaLink}/>
          </div>
      </div>
     </>
    );
}

interface MyComponentProps extends RouteComponentProps {
    myField: string;
}

export default withRouter(Item)
