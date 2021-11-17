import React, { Component } from 'react';
import { Header, Nav, ItemGrid } from '../';
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

// let projectClass = {
//     "Stormtrooper Therapists"
// }


const PROJECTS = gql`
    query getProjects {
        projects {
            id
            abbreviation
            name
            portfolioName
            subtitle
            tags
            status
            people {
                id
            }
        } 
    }
`;

function Projects() {
    const { loading, error, data } = useQuery(PROJECTS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    let projects = data.projects.map(({ id, name, portfolioName, subtitle, tags, status, abbreviation, people }) => (

        

        <div className={`project ${portfolioName.replace(/\s/g , "-").replace(/'/g, '').toLowerCase()}`} key={id}>
            <div className="project-columns">
                <div className="project-left">
                    <span><a href={"/project/"+id}>{abbreviation}</a></span>
                </div>
                <div className="project-right">
                    <h2><a href={"/project/"+id}>{name}</a></h2>
                    <h3>{portfolioName}</h3>
                    <p>{subtitle}</p>
                    <div className="people-counter">
                        <img src={person} alt="Person" /><p>{people.length}</p>
                    </div>
                </div>
            </div>
            <div className="project-meta">
                <h3>Status</h3>
                <p>{status}</p>
                <h3>Tags</h3>
                <p>{tags}</p>
            </div>
        </div>
    ));



    return (
        <>
            <Header></Header>
            <Nav></Nav>
                

            <div className="Projects content-wrapper">
                <ItemGrid>
                    {projects}
                </ItemGrid>
            </div>
        </>
    );
}

export default Projects
