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
    teams {
        id
        name
    }
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
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // fade in content when loaded
    setTimeout(function() {
        document.getElementById('root').classList.add('loaded');
        document.body.classList.add('loaded');
    }, 100);
    // if(data2){
    //     for (var i = data.teams.length - 1; i >= 0; i--) {
    //         for (var x = data2?.newPerson?.teams.length - 1; x >= 0; x--) {
    //             if(data2?.newPerson?.teams[x].id == data.teams[i].id){
    //                 if(!data.teams[i].people.includes(data2.newPerson)){
    //                     data.teams[i].people.push(data2.newPerson)  
    //                 }

    //             }
    //         }
            
    //     }
    // }
   
    let teams = data.teams.map(({ id, name, people }, teamIndex) => (
        <div key={id} className="team">
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
