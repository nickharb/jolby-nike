import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  RouteComponentProps,
  useParams
} from "react-router-dom";
import {Home, Dashboard} from './components'


const NoMatchPage = () => {
  return (
    <div>
      <h3 className='oops-message text-large'>Woops! This page does not exist. Maybe try going <a className='link' href='/'>Home</a>?</h3>
    </div>
  );
};


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
        
    };

  }

  componentDidMount() {


  }


render() {


  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">

            <Home />

        </Route>
        <Route exact path="/dashboard">

            <Dashboard />

        </Route>
        <Route exact path="/profile/:block">

           <h1>placeholder</h1>

        </Route>
        <Route component={NoMatchPage} />
      </Switch>
    </div>
    </Router>
  );
}

}

export default App;
