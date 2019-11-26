import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const Green = (props) => {
  return(
    <div className ="green">
    G
    </div>
  );
}

function NavBar(props){
  //states for what navbar button is selected
  const [selection1, setSelection1] = useState(false);
  const [selection2, setSelection2] = useState(true);
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
    <header className="navHeader">
    <div className="navBar">
    {/*Recipes,
    Link is given the class selected if selection state is true(if button was clicked)*/}
    <Link to ="/green" className={`navButton ${selection1 ? 'isSelected' : ''}`} onClick={button1Selected} >
      <div>
        G
      </div>
    </Link>
    {/*Quick Convert*/}
    <Link to ="/" className={`navButton ${selection2 ? 'isSelected' : ''}`} onClick={button2Selected}>
      <div>
       R
      </div>
    </Link>
    <Link to ="/stepone" className={`navButton ${selection3 ? 'isSelected' : ''}`} onClick={button3Selected}>
     {/*New recipes*/}
      <div>
        B
      </div>
    </Link>
  </div>
  </header>
  
  );
  
}

let a = null;
let b = null;
 
function App() {
  return (
    <Router>
      <div>
        <Switch> 
          <Route path="/green">
            <Green/>
          </Route>
          <Route path="/stepone">
            <NewRecipeStep1/>
          </Route>
          <Route path="/steptwo/:from/:to">
            <NewRecipeStep2/>
          </Route>
          <Route path="/">
            <QuickConvert/>
          </Route>
        </Switch>
        </div>
        <NavBar/>
    </Router>
  );
}

const NewRecipeStep2 = ({match}) => {
  
  const [howManyIngredients, setHowManyIngredients] = useState(0);

  let ingredientsArray=[];

  return(<h2>In progress...</h2>);
}



const NewRecipeStep1 = () => {
  let convert = require('convert-units');

  const [recipieName, setRecipieName] = useState("");
  const [convertFrom, setConvertFrom] = useState("US-Custom");
  const [convertTo, setConvertTo] = useState("Metric");

  function changeRecipieName(event) {
    setRecipieName(event.target.value);
  }
  function changeConvertFrom(event) {
    setConvertFrom(event.target.value);
  }
  function changeConvertTo(event) {
    setConvertTo(event.target.value);
  }
  return(

    <div>
      <div className = "main">
        <input type="text" className="recipieName" placeholder="Name of recipie..." onChange={changeRecipieName}>
        </input>
        <p>From</p>
        <select value={convertFrom} className="button" onChange={changeConvertFrom}>
          <option value="US-Custom">US-Custom</option>
          <option value="Metric">Metric</option>
        </select>

        <p>To</p>
        <select value={convertTo} className="button" onChange={changeConvertTo}>
          <option value="Metric">Metric</option>
          <option value="US-Custom">US-Custom</option>
        </select>
        
        <Link to={"/steptwo/" + convertFrom + "/" + convertTo}>
          <div className = "button">   
            Create 
          </div>
        </Link>   
      </div>
    </div>
  )

}

const Ingredient = props => {
  const ingredientName = props.recipieName;
  const ingredientAmount = props.ingredientAmount;
  const ingredientUnit = props.ingredientUnit;


}


/*function Ingredient(){
  return(       
    <div className="ingredientBox">
      <div className = "button"> System </div>
      <div className = "button"> System </div>
    </div>
  )
}
return(
<input type="text" id="namnge" placeholder={b} onChange={changeInput2} />
)
}*/


const QuickConvert = props => {
  let convert = require('convert-units');

  const [convertFrom, setConvertFrom] = useState("US-Custom");
  const [convertTo, setConvertTo] = useState("Metric");
  const [convertFromUnit, setConvertFromUnit] = useState("oz");
  const [convertToUnit, setConvertToUnit] = useState("mg");
  const [conversionAmount, setConversionAmount] = useState("0");
  const [conversionResult, setConversionResult] = useState("0");

  function changeConvertFrom(event) {
    setConvertFrom(event.target.value);
  }
  function changeConvertTo(event) {
    setConvertTo(event.target.value);
  }
  function changeConvertFromUnit(event) {
    setConvertFromUnit(event.target.value);
  }
  function changeConvertToUnit(event) {
    setConvertToUnit(event.target.value);
  }
  function changeConversionAmount(event) {
    setConversionAmount(event.target.value);
  }
  function doConvert() {
    setConversionResult(convert(conversionAmount).from(convertFromUnit).to(convertToUnit));
  }
  function doSwap() {
    setConvertTo(convertFrom);
    setConvertFrom(convertTo);
    setConvertToUnit(convertFromUnit);
    setConvertFromUnit(convertToUnit);
  }

  return(
    <div className="green">

      <h1 className="header">Quick Convert</h1>

      <h2>From</h2>
      <select value={convertFrom} className="dropdown" onChange={changeConvertFrom}>
        <option value="US-Custom">US-Custom</option>
        <option value="Metric">Metric</option>
      </select>

      <h2>To</h2>
      <select value={convertTo} className="dropdown" onChange={changeConvertTo}>
        <option value="Metric">Metric</option>
        <option value="US-Custom">US-Custom</option>
      </select>

      <div className="quickConvert">
        <input type="text" className="textInput" onChange={changeConversionAmount}></input>
        {convertFrom === "US-Custom" &&
        <select value={convertFromUnit} className="dropdown" onChange={changeConvertFromUnit}>
          <option value="oz">Ounces</option>
          <option value="lb">Pounds</option>
          <option value="fl-oz">Fluid Ounces</option>
          <option value="cup">Cups</option>
          <option value="pnt">Pints</option>
          <option value="qt">Quarts</option>
          <option value="gal">Gallons</option>
        </select>}
        {convertFrom === "Metric" &&
        <select value={convertFromUnit} className="dropdown" onChange={changeConvertFromUnit}>
          <option value="mg">Milligrams</option>
          <option value="g">Grams</option>
          <option value="kg">Kilograms</option>
          <option value="ml">Milliliters</option>
          <option value="dl">Deciliters</option>
          <option value="l">Liters</option>
        </select>}

        <div className="knapp" onClick={doConvert}>Convert!</div>

        <input type="text" className="textInput" value={conversionResult} disabled></input>
        {convertTo === "US-Custom" &&
        <select value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
          <option value="oz">Ounces</option>
          <option value="lb">Pounds</option>
          <option value="fl-oz">Fluid Ounces</option>
          <option value="cup">Cups</option>
          <option value="pnt">Pints</option>
          <option value="qt">Quarts</option>
          <option value="gal">Gallons</option>
        </select>}
        {convertTo === "Metric" &&
        <select value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
          <option value="mg">Milligrams</option>
          <option value="g">Grams</option>
          <option value="kg">Kilograms</option>
          <option value="ml">Milliliters</option>
          <option value="dl">Deciliters</option>
          <option value="l">Liters</option>
        </select>}
      </div>
      <div className="knapp" onClick={doSwap}>Swap</div>
    </div>
  )
};

export default App;
