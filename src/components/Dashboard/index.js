import React, { Component } from 'react';
import { Header, Nav } from '../';
import './style.css';
import sketch from'./p5/sketch1.js'
import sketch2 from'./p5/sketch2.js'
import sketch3 from'./p5/sketch3.js'
import sketch4 from'./p5/sketch4.js'
import sketch5 from'./p5/sketch5.js'
import Sketch from 'react-p5';
import { ReactP5Wrapper } from "react-p5-wrapper";

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
    gql,
    useSubscription
} from "@apollo/client";

const PORTFOLIO_SUBSCRIPTION = gql`
subscription {
  newPortfolio {
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
}`;

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
    const { data2, loading2 } = useSubscription(
    PORTFOLIO_SUBSCRIPTION,
            { variables: {  } }
          );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // add root class
    document.getElementById('root').classList.add('dashboard-root');

    // fade in content when loaded
    setTimeout(function() {
        document.getElementById('root').classList.add('loaded');
        document.body.classList.add('loaded');
    }, 1000);

    let teams = data.portfolios.map(({ id, name, projects }, index) => (
        <div key={id} className="panel">
            <div className="panel-background"></div>
            <div className="panel-scroll">
                <div className="orb">
                 {index == 0 &&
                    <ReactP5Wrapper sketch={sketch} />
                 }
                 {index == 1 &&
                    <ReactP5Wrapper sketch={sketch2} />
                 }
                 {index == 2 &&
                    <ReactP5Wrapper sketch={sketch3} />
                 }
                 {index == 3 &&
                    <ReactP5Wrapper sketch={sketch4} />
                 }
                 {index == 4 &&
                    <ReactP5Wrapper sketch={sketch5} />
                 }
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
        </div>
    ));

    return (
        <>
            <Header></Header>
            <Nav></Nav>

            <div className="Dashboard content-wrapper">
                <div className="ticker-wrapper">
                    <div className="ticker-header"><h3>Updates from Space</h3></div>
                    <div class="ticker-wrap">
                        <div className="ticker">
                            <div class="ticker-item">Welcome to Genesis — A new space for us to discover, make connections, and stay up to date on the work we make together</div>
                        </div>
                    </div>
                </div>
                {teams}
            </div>
        </>
    );
} // dashboard

export default Dashboard 
     
