import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function Green(props) {
  return(
    <div className ="green">
    G
    </div>
  );
}

function Red(props) {
  return(
    <div className ="red">
    R
    </div>
  );
}

function Blue(props) {
  return(
    <div className ="blue">
    B
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Switch> 
          <Route path="/green">
            <Green/>
          </Route>
          <Route path="/red">
            <Red/>
          </Route>
          <Route path="/blue">
            <Blue/>
          </Route>
          <Route path="/">
            <div className ="content"></div>
          </Route>
        </Switch>

        {/*Navbar*/}
        <div className="navBar">

          {/*Recipes*/}
          <Link to ="/green" className="navButton">
            <div>
              G
            </div>
          </Link>
          {/*Quick Convert*/}

          <Link to ="/red" className="navButton">
            <div>
              R
            </div>
          </Link>

          <Link to ="/blue" className="navButton">
          {/*New recipes*/}
            <div>
              B
            </div>
          </Link>
        </div>
      </div>  
    </Router>
  );
}

export default App;
