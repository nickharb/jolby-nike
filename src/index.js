import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

/* Here is where we initially connect to the api via apollo client */
const client = new ApolloClient({
  uri: 'https://webapp-tn6y.onrender.com/api/graphql',
  cache: new InMemoryCache()
});

/* And we wrap the app in Apolloprovider so all the components/pages have access to the api */
ReactDOM.render(
  <React.StrictMode>
	  <ApolloProvider client={client}>
	    <App />
	  </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
