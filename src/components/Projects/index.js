import React, { Component, useEffect } from 'react';
import { Header, Nav } from '../';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
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
    useSubscription,
    gql
} from "@apollo/client";

// let projectClass = {
//     "Stormtrooper Therapists"
// }

const PROJECT_SUBSCRIPTION = gql`
subscription {
  newProject {
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
}`;
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
    const { data2, loading2 } = useSubscription(
    PROJECT_SUBSCRIPTION,
            { variables: {  } }
          );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // add root class
    document.getElementById('root').classList.add('projects-root');

    // fade in content when loaded
    setTimeout(function() {
        document.getElementById('root').classList.add('loaded');
        document.body.classList.add('loaded');
    }, 50);

    let projects = data.projects.map(({ id, name, portfolioName, subtitle, tags, status, abbreviation, people }, index) => (
        

        <div className={`project ${portfolioName.replace(/\s/g , "-").replace(/'/g, '').toLowerCase()}`} style={{'--animation-order': index}} key={id}>
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
                     <Masonry columnsCount={4}>
                    {projects}
                    </Masonry>
             
            </div>
        </>
    );
}

export default Projects
