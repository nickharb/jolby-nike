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

const PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      subtitle
      portfolioName
      people{
        id
      }
    } 
  }
`;
/*    
knowledgeItems{
  id
  mediaLink
  itemType
  name
}
*/

function Project(props: MyComponentProps)  {
  const { loading, error, data } = useQuery(PROJECT,{
    variables: { id: props.match.params.id }});
  if (loading) return <p>Loading pls wait thank you...</p>;
  if (error) return <p>{error}</p>;
  console.log(data)

  // let knowledgeItems = data.person.knowledgeItems.map(({ id, mediaLink, itemType, name }) => (
  //     <>
  //     {(itemType == "file" && ( mediaLink.includes(".jpeg") || mediaLink.includes(".jpg")) ) ?
  //     (<div key={id} className="person">
  //       <h1>
  //        <a href={"/item/"+id}>{name || mediaLink}</a>
  //        <img src={mediaLink}/>
  //       </h1>
  //     </div>): ""
  //     }
  //     </>
  //   ));

    return (
     <>
     <Header></Header>
     <Nav></Nav>
     <div className="Project content-wrapper"> 
          <div class="left-panel">
            <div>{data.project.name}</div>
            <div>{data.project.portfolioName}</div>
            <div>{data.project.subtitle}</div>
            <div className="contact">
              {data.project.people.length}
            </div>
          </div>
          <div class="right-panel">
      {/*      {knowledgeItems}*/}
          </div>
      </div>
     </>
    );
}

interface MyComponentProps extends RouteComponentProps {
    myField: string;
}

export default withRouter(Project)
