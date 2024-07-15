import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import TeamDetails from './components/TeamDetails';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/team/:teamName" component={TeamDetails} />
            </Switch>
        </Router>
    );
}

export default App;