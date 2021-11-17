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
import { HttpLink } from '@apollo/client';
import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';


const wsLink = new WebSocketLink({
  uri: 'ws://webapp-tn6y.onrender.com/api/graphql',
  options: {
    reconnect: true,
  }
});
const httpLink = new HttpLink({
  uri: 'https://webapp-tn6y.onrender.com/api/graphql',
  options: {
    reconnect: true,
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
// /* Here is where we initially connect to the api via apollo client */
// const client = new ApolloClient({
//   uri: 'https://webapp-tn6y.onrender.com/api/graphql',
//   cache: new InMemoryCache()
// });

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
