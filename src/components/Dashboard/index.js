import React, { Component } from 'react';
import { Header, Nav } from '../';
import './style.css';
import person from './img/person.svg';
import orb1 from './img/orb1.gif';
import orb2 from './img/orb2.gif';
import orb3 from './img/orb3.gif';
import orb4 from './img/orb4.gif';
import orb5 from './img/orb5.gif';
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

    let imagePaths = [orb1,orb2,orb3,orb4,orb5];

    let teams = data.portfolios.map(({ id, name, projects }, index) => (
        <div key={id} className="panel">
            <div className="orb">
                <img src={imagePaths[index]} alt="Orb" />
            </div>
            <h1 className="panel-header">
                {name}
            </h1>

            <div>
            {projects.map(function (project) {
                return (
                    <div className="project" key={project.id}>
                        <div className="project-columns">
                            <div className="project-left">
                                <span><a href={"/project/"+id}>{project.abbreviation}</a></span>
                            </div>
                            <div className="project-right">
                                <h2><a href={"/project/"+id}>{project.name}</a></h2>
                                <h3>{project.portfolioName}</h3>
                                <div className="people-counter">
                                    <img src={person} alt="Person" /><p>{project.people.length}</p>
                                </div>
                            </div>
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
