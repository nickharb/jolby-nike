import React, { Component } from 'react';
import { Header, Nav } from '../';
import './style.css';

import Sketch from 'react-p5';
import { ReactP5Wrapper } from "react-p5-wrapper";

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

    let height = 230;
    let width = 230;

    let g;
    let m;
    let t1 = 0;
    let t2 = 0;
    let c_points = [];

    let orbSize = 40;

    let color1;
    let color2;
    let color0;

    let lineCount;
    let lineSpeed;

    let startColor = 255;
    let speedAnimate = 0.005;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(width, height).parent(canvasParentRef);

        let p = p5.random(8, 20);

        for (let x = 1; x <= 360; x +=8) { // number of points projects
            c_points.push(p5.radians(x));
        }

        lineCount = 20;
        lineSpeed = 0.003;
        color0 = p5.color(0,0,0);
        color1 = p5.color(12, 55, 176); // dark blue
        color2 = p5.color(158, 243, 243, 100); // light blue
    }

    const draw = (p5) => {
        p5.blendMode(p5.BLEND);
        p5.background(0);
        p5.blendMode(p5.ADD);
        drawBg(p5);
        p5.colorMode(p5.RGB, p5.TWO_PI);
    }

    const drawBg = (p5) => {
        p5.strokeWeight(1.5);
        p5.noFill();
        t1 = 0;
        t2 = t2 + lineSpeed; //speed

        for (let f = 0; f < lineCount; f++) { //number of lines
            t1 = t1 + 0.03; //uniformity of lines
            // g = f * 0.01; //gradient radius
            g = f * 0.01; //gradient radius
            // m = g*2;
            m = g * 10;

            let c = p5.lerpColor(color1, color2, g);
            let h = p5.lerpColor(color0, c, m);

            p5.stroke(h);

            p5.beginShape();

            let r = orbSize; // size
            let a = 0;
            let n = 0;

            a = c_points[0];
            n = p5.map(p5.noise(t1, t2, a), 0, 1,1, 2); 
            const [x0, y0] = circle_point(width / 2, height / 2, n * (r + f), a);
            p5.curveVertex(x0, y0);


            a = c_points[1];
            n = p5.map(p5.noise(t1, t2, a), 0, 1, 1, 2);
            const [x1, y1] = circle_point(width / 2, height / 2, n * (r + f), a);
            p5.curveVertex(x1, y1);

            a = c_points[2];
            n = p5.map(p5.noise(t1, t2, a), 0, 1, 1, 2);
            const [x2, y2] = circle_point(width / 2, height / 2, n * (r + f), a);
            p5.curveVertex(x2, y2);

            for (let i = 0; i < c_points.length; i++) {
                if (i > 3) {
                    a = c_points[i];
                    n = p5.map(p5.noise(t1, t2, a), 0, 1, 1, 2);
                    const [x, y] = circle_point(width / 2, height / 2, n * (r + f), a);
                    p5.curveVertex(x, y);
                }
            }

            p5.curveVertex(x0, y0);
            p5.curveVertex(x1, y1);
            p5.curveVertex(x2, y2);

            p5.endShape();

        } // for loop end
      

        function circle_point(cx, cy, r, a) {
            const x = cx + r * p5.cos(a);
            const y = cy + r * p5.sin(a);
            return [x, y];
        }
    } // end drawBg




    const { loading, error, data } = useQuery(PORTFOLIOS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    let teams = data.portfolios.map(({ id, name, projects }, index) => (
        <div key={id} className="panel">
            <div className="orb">
                <Sketch setup={setup} draw={draw} />
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
} // dashboard

export default Dashboard 
     
