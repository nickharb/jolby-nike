import React, { Component } from 'react';
import { Header } from '../';
import './style.css';

import Sketch from 'react-p5';
import { ReactP5Wrapper } from "react-p5-wrapper";

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



function Home() {

    let height;
    let width = 620;
    var noiseVal = 140;
    var cellSize = 5;
    var zseed = 0;

    let color1;
    let color2;
    let color0;
 
    const setup = (p5, canvasParentRef) => {
        height = p5.windowHeight;
        p5.createCanvas(width, height).parent(canvasParentRef);
        p5.background(255);
        p5.noStroke();
        color1 = p5.color(158, 243, 243); // light blue
        color2 = p5.color(12, 55, 176);  // dark blue
        color0 = p5.color(46, 109, 218);
    }

    const draw = (p5) => {
        for (var y=0; y*cellSize < height; y++) {
            for (var x=0; x*cellSize < width; x++) {
                var fillCol = p5.noise(x/noiseVal, y/noiseVal, zseed)*1.8;
                let c = p5.lerpColor(color1, color2, fillCol);
                p5.fill(c);
                p5.rect(x*cellSize, y*cellSize, cellSize, cellSize);
            }
        }
        zseed += 0.007;
    }



    return (
        <>
            <Header></Header>
            <div className="Homepage content-wrapper home-columns">
                <div className="left-panel">
                    <div>
                        <div className="plasma-bg">
                            <Sketch setup={setup} draw={draw} />
                        </div>

                        <div className="updates">
                            <h3>updates from space</h3>

                            <div className='updates-carousel'>
                                <div className='slide'>
                                    <h1>Campus will be closed from August 25th, 2021 – September 2nd, 2021 for mental health and burger week</h1>
                                </div>
                            </div>
                        </div>

                        <div className="portal-link">
                            <a href="/dashboard">Enter The Portal ></a>
                        </div>
                    </div>
                </div>

                <div className="right-panel">
                    <div className="video-container">
                        <iframe src="https://player.vimeo.com/video/646207608?h=10f232f9fb&amp;autoplay=1&amp;loop=1;&amp;background=1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="Nike Swooshilite CloseUp"></iframe>
                    </div>

                    {/*<div className="video-container">
                        <iframe src="https://player.vimeo.com/video/646207698?h=032e1ac20b&amp;autoplay=1&amp;loop=1;&amp;background=1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="Nike Swooshilite Full"></iframe>
                    </div>*/}


                    {/*<script src="https://player.vimeo.com/api/player.js"></script>*/}
                </div>
            </div>
        </>
    );
}

export default Home
