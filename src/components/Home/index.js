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

    // fade in content when loaded
    setTimeout(function() {
        document.getElementById('root').classList.add('loaded');
        document.body.classList.add('loaded');
    }, 3000);

    function hideLogin() {
        document.getElementById('login').classList.add('hidden');
    }

    document.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            hideLogin();
        }
    });

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

                <div className="right-panel">
                    <div className="video-container">
                        <iframe src="https://player.vimeo.com/video/646207608?h=10f232f9fb&amp;autoplay=1&amp;loop=1;&amp;background=1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    </div>
                </div>

                <div className="left-panel">
                    <div>
                        <div className="plasma-bg">
                            <Sketch setup={setup} draw={draw} />
                        </div>

                        <div className="updates">
                            <h3>updates from space</h3>

                            <div className='updates-carousel'>
                                <div className='slide'>
                                    <h1>Welcome to Genesis — A new space for us to discover, make connections, and stay up to date on the work we make together</h1>
                                </div>
                            </div>
                        </div>

                        <div className="portal-link">
                            <a href="/dashboard">Enter The Portal ></a>
                        </div>
                    </div>
                </div>

                

                <div className="login-screen" id="login">

                    <div className="video-container">
                        <iframe src="https://player.vimeo.com/video/646207698?h=032e1ac20b&amp;autoplay=1&amp;loop=1;&amp;background=1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    </div>

                    <div className="input-background">
                        <div className="input-wrapper">
                            <h3>Username</h3>
                            <div class="login-input">
                                <input type="username"></input>
                            </div>
                            <h3>Password</h3>
                            <div class="login-input">
                                <input type="password"></input>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        </>
    );
}

export default Home
