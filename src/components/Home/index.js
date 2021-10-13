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
            <h3>updates from space:</h3>
            <div class='updates-carousel'>
              <div class='slide'>
                Campus will be closed
              </div>
              <div class='slide'>
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
