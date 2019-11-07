import React, { useState } from 'react';
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

function NavBar(props){
  //states for what navbar button is selected
  const [selection1, setSelection1] = useState(false);
  const [selection2, setSelection2] = useState(false);
  const [selection3, setSelection3] = useState(false);

  //state becomes true if nav bar button is clicked
  const button1Selected = event => {
    setSelection1(true);
    setSelection2(false);
    setSelection3(false);
  }

  const button2Selected = event => {
    setSelection1(false);
    setSelection2(true);
    setSelection3(false);
  }

  const button3Selected = event => {
    setSelection1(false);
    setSelection2(false);
    setSelection3(true);
  }

  return(
    /*Navbar*/
    <div className="navBar">
    {/*Recipes,
    Link is given the class selected if selection state is true(if button was clicked)*/}
    <Link to ="/green" className={`navButton ${selection1 ? 'isSelected' : ''}`} onClick={button1Selected} >
      <div>
        G
      </div>
    </Link>
    {/*Quick Convert*/}
    <Link to ="/red" className={`navButton ${selection2 ? 'isSelected' : ''}`} onClick={button2Selected}>
      <div>
       R
      </div>
    </Link>
    <Link to ="/blue" className={`navButton ${selection3 ? 'isSelected' : ''}`} onClick={button3Selected}>
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
        <NavBar/>
    </Router>
  );
}

export default App;
