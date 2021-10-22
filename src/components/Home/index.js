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
            <h3>updates from space:</h3>
            <div className='updates-carousel'>
              <div className='slide'>
                Campus will be closed
              </div>
              <div className='slide'>
                burger weeek wooohoo
              </div>
            </div>
            </div>
            <a href="/dashboard">Enter The Portal ></a>
          </div>
      </div>
      </>
    );
}

export default Home
