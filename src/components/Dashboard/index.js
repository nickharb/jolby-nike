import React, { Component } from 'react';
import { Header, Nav } from '../';
import './style.css';
import person from './img/person.svg';
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


const PORTFOLIOS = gql`
    query getPortfolios {
        portfolios(limit:5) {
            id
            name
            projects {
                id
                name
                abbreviation
                portfolioName
                people {
                    id
                }
            }
        } 
    }
`;

function Dashboard() {
    const { loading, error, data } = useQuery(PORTFOLIOS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    let teams = data.portfolios.map(({ id, name, projects }) => (
        <div key={id} className="panel">
            <div className="orb"></div>
            <h1 className="panel-header">
                {name}
            </h1>

            <div >
            {projects.map(function (project) {
                return (
                    <div className="project-wrapper" key={project.id}>
                        <div className="project-left">
                            <span>{project.abbreviation}</span>
                        </div>
                        <div className="project-right">
                            <h2>{project.name}</h2>
                            <h3>{project.portfolioName}</h3>
                            <div className="people-counter">
                                <img src={person} alt="Person" /><p>{project.people.length}</p>
                            </div>
                            {/*<p>{project.people.length}</p>*/}
                        </div>
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
        <div className="Dashboard content-wrapper">
                {teams}
        </div>
         </>
    );
}

export default Dashboard
