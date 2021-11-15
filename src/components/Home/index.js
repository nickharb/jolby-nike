import React, { Component } from 'react';
import { Header } from '../';
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



function Home() {


        return (
            <>
                <Header></Header>
                <div className="Homepage content-wrapper home-columns">
                    <div className="left-panel">
                        <div>
                            <h3>updates from space</h3>
                            <div class='updates-carousel'>
                                <div class='slide'>
                                    Campus will be closed from August 25th, 2021 – September 2nd, 2021 for mental health and burger week
                            </div>
                            </div>
                            <div class='portal-link'>
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
