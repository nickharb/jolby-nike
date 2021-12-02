import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// include the actioncable javascript libraries
import ActionCable from 'actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useSubscription,
  gql
} from "@apollo/client";
import { HttpLink } from '@apollo/client';
import { split } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// ActionCable requests have a standard protocol.  
// All apollo requests need to be wrapped in the correct messaging 
// format in order to be processed correctly.

const createActionCableLink = () => {
  const cable = ActionCable.createConsumer(`wss://webapp-tn6y.onrender.com/cable`);
  return new ActionCableLink({ cable });
};

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
  createActionCableLink(), // if the operation type is subscription, use the actioncable endpoint
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


// injecting an example subscription GraphQL query here
const PERSON_SUBSCRIPTION = gql`
subscription {
  newPerson {
    id
    name
  }
}`;

// subscribe and return
function LatestPerson({ postID }) {
  const { data, loading } = useSubscription(
    PERSON_SUBSCRIPTION,
    { variables: {  } }
  );
  
  return <h4>{!loading && console.log(data.newPerson)}</h4>;
}


/* And we wrap the app in Apolloprovider so all the components/pages have access to the api */
ReactDOM.render(
  <React.StrictMode>
	  <ApolloProvider client={client}>
	    <App />
      <LatestPerson />
	  </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
