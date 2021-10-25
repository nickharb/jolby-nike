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
     <div className="Homepage content-wrapper">
          <div className="left-panel">
            <div>
<<<<<<< HEAD
            <h3>updates from space</h3>
            <div class='updates-carousel'>
              <div class='slide'>
                Campus will be closed from August 25th, 2021 – September 2nd, 2021 for mental health and burger week
=======
            <h3>updates from space:</h3>
            <div className='updates-carousel'>
              <div className='slide'>
                Campus will be closed
              </div>
              <div className='slide'>
                burger weeek wooohoo
>>>>>>> cf17a794db76cd75699fd8bf8f6c9a87deae4b17
              </div>
              
            </div>
            </div>
            <div class='portal-link'>
              <a href="/dashboard">Enter The Portal ></a>
            </div>
          </div>
      </div>
      </>
    );
}

export default Home
