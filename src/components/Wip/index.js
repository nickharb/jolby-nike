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


const WIP = gql`
  query getWip{
    knowledgeItems {
      id
      mediaLink
      itemType
    }
  }
`;

function Wip() {
  const { loading, error, data } = useQuery(WIP);
  if (loading) return <p>Loading pls wait thank you...</p>;
  if (error) return <p>Error :(</p>;


  let wips = data.knowledgeItems.map(({ id, mediaLink, itemType }) => (
    <>
    {(itemType == "file" && ( mediaLink.includes(".jpeg") || mediaLink.includes(".jpg")) ) ?
      (
        <div key={id} className="wip-item">
           <a href={"/item/"+id}><img src={mediaLink}/></a>
        </div>
        )
     : ""
    }
    </>
  ));



  return (
   <>
   <Header></Header>
   <Nav></Nav>
   <div className="Wip content-wrapper">
        {wips}
    </div>
   </>
  );
}

export default Wip
