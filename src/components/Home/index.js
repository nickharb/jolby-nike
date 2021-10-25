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


const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function Home() {
   const { loading, error, data } = useQuery(EXCHANGE_RATES);
    return (
     <>
     <Header></Header>
     <div className="Homepage content-wrapper">
          <div class="left-panel">
            <div>
            <h3>updates from space</h3>
            <div class='updates-carousel'>
              <div class='slide'>
                Campus will be closed from August 25th, 2021 – September 2nd, 2021 for mental health and burger week
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
