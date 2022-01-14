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
    useSubscription,
    gql
} from "@apollo/client";

// injecting an example subscription GraphQL query here
const PERSON_SUBSCRIPTION = gql`
subscription {
  newPerson {
    id
    name
  }
}`;

// subscribe and return
// function LatestPerson({ postID }) {
//   const { data, loading } = useSubscription(
//     PERSON_SUBSCRIPTION,
//     { variables: {  } }
//   );
  
//   return <h4>{!loading && console.log(data.newPerson)}</h4>;
// }
// const PEOPLE = gql`
//   query getPeople{
//     people {
//       id
//       abbreviation
//       name
//     } 
//   }
// `;

const PEOPLE = gql`
    query getTeams{
        teams {
            id
            name
            people {
                name
                id
            }
        } 
    }
`;

function People() {
    const { loading, error, data } = useQuery(PEOPLE);
    const { data2, loading2 } = useSubscription(
        PERSON_SUBSCRIPTION,
        { variables: {  } }
      );
    console.log(data2)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // add root class
    document.getElementById('root').classList.add('people-root');

    // fade in content when loaded
    setTimeout(function() {
        document.getElementById('root').classList.add('loaded');
        document.body.classList.add('loaded');
    }, 100);

    if(data2){
      data.teams[0].people.shift(data2.newPerson) 
      console.log(data.teams[0])
    }
   
    let teams = data.teams.map(({ id, name, people }, teamIndex) => (
        <div id={name.toLowerCase().split(" ").join("-")} key={id} className="team">
            <h3>{name}</h3>
            <div className="people-wrapper">
                {people.map(function (person, index) {
                    return (
                        <div key={index} className="person" style={{'--animation-order': index + (teamIndex * 25)}}>
                            <a href={"/person/"+person.id}>{person.name}</a>
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
    <div className="People content-wrapper">
    
        <div className="teams-wrapper">
            {teams}
        </div>

    </div>
    </>
    );
}

export default People
