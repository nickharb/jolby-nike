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
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let teams = data.teams.map(({ id, name, people }, teamIndex) => (
        <div className="team">
            <h3>{name}</h3>
            <div className="people-wrapper">
                {people.map(function (person, index) {
                    return (
                        <div key={person.id} className="person" style={{'--animation-order': index + (teamIndex * 25)}}>
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
