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


//injecting an example subscription GraphQL query here
const PERSON_SUBSCRIPTION = gql`
subscription {
  newPerson {
    id
    name
  }
}`;

const PROJECT_SUBSCRIPTION = gql`
subscription {
  newProject {
    id
    abbreviation
    name
    portfolioName
    subtitle
    tags
    status
    people {
        id
    }
  }
}`;
  // if(typeof document != `undefined` && data){
  //   let cont = document.querySelector("#valiant-labs .people-wrapper");
  //   let newP = document.createElement("div");
  //   newP.classList.add("person");
  //   newP.innerHTML = "<a href='/person/"+data.newPerson.id+"'>"+data.newPerson.name+"</a>"
  //   cont.prependChild(newP)
  // }
//subscribe and return
function LatestPerson({ postID }) {
  const { data, loading } = useSubscription(
    PERSON_SUBSCRIPTION,
    { variables: {  } }
  );


 if(typeof document != `undefined` && data){
    let cont = document.querySelector("#valiant-labs .people-wrapper");
    let newP = document.createElement("div");
    newP.classList.add("person");
    newP.innerHTML = "<a href='/person/"+data.newPerson.id+"'>"+data.newPerson.name+"</a>"
    if(cont){
      cont.prepend(newP)
    }
  }
  return( 
    <h4>{!loading && console.log(data.newPerson)}</h4>
  );
}

function LatestProject({ postID }) {
  const { data, loading } = useSubscription(
    PROJECT_SUBSCRIPTION,
    { variables: {  } }
  );


 if(typeof document != `undefined` && data){
    let cont = document.querySelector(".Projects.content-wrapper > div > div");
    let newP = document.createElement("div");
    newP.innerHTML = '<div className="project"><div className="project-columns"><div className="project-left"><span><a href="/project/"'+data.newProject.id+'">'+data.newProject.abbreviation+'</a></span></div><div className="project-right"><h2><a href="/project/"'+data.newProject.id+'">'+data.newProject.name+'</a></h2><h3>'+data.newProject.portfolioName+'</h3><p>'+data.newProject.subtitle+'</p><div className="people-counter"><img src="/static/media/person.19383cc0.svg" alt="Person" /><p>0</p></div></div></div><div className="project-meta"><h3>Status</h3><p>'+data.newProject.status+'</p><h3>Tags</h3><p>'+data.newProject.tags+'</p></div></div>';

    if(cont){
      cont.prepend(newP)
    }
  }
  return( 
    <h4>{!loading && console.log(data.newProject)}</h4>
  );
}


/* And we wrap the app in Apolloprovider so all the components/pages have access to the api */
ReactDOM.render(
  <React.StrictMode>
	  <ApolloProvider client={client}>
      <LatestPerson />
      <LatestProject />
	    <App />
	  </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
