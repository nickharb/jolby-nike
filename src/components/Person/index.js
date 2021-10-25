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

const PERSON = gql`
  query getPerson($id: ID!) {
    person(id: $id) {
      id
      name
      title
      location {
        id
        name
      }
      projects{
        id
        name
        abbreviation
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

function Person(props: MyComponentProps)  {
  const { loading, error, data } = useQuery(PERSON,{
    variables: { id: props.match.params.id }});
  if (loading) return <p>Loading pls wait thank you...</p>;
  if (error) return <p>{error}</p>;
  console.log(data.person)
  let projects = data.person.projects.map(({ id, name, abbreviation }) => (
      <div key={id} className="person">
        <h1>
         <a href={"/project/"+id}>{abbreviation}</a>
        </h1>
      </div>
    ));
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
     <div className="Person content-wrapper">
          <div class="left-panel">
            <div>{data.person.name}</div>
            <div>{data.person.title}</div>
            <div>{data.person.location.name}</div>
            <div className="contact">
              <button>email</button>
              <button>phone</button>
              <button>slack</button>
              <button>other</button>
            </div>
            {projects}
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

export default withRouter(Person)
