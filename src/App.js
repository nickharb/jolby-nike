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
import {Home, Dashboard, Projects, People, Locker, Wip, Person, Project, Item} from './components'


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
                <Route exact path="/projects">
                        <Projects />
                </Route>
                <Route exact path="/people">
                        <People />
                </Route>
                <Route exact path="/locker">
                        <Locker />
                </Route>
                <Route exact path="/Wip">
                        <Wip />
                </Route>

                <Route exact path="/person/:id">
                     <Person></Person>
                </Route>
                <Route exact path="/project/:id">
                     <Project></Project>
                </Route>
                <Route exact path="/item/:id">
                     <Item></Item>
                </Route>
                <Route component={NoMatchPage} />
            </Switch>
        </div>
        </Router>
    );
}

}

export default App;
