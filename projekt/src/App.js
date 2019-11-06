import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


let selectedNav = "defualt";

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

function NavBar(props){
  return(
    /*Navbar*/
    <div className="navBar">
    {/*Recipes*/}
    <Link to ="/green" className={} className="navButton" activeStyle={{ color: 'red' }}>
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
        </div>
        <NavBar selection = {selectedNav}/>
    </Router>
  );
}

export default App;
