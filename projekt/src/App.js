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

/*function Red(props) {
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
}*/

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
  
  );
  
}

let a = null;
let b = null;
 
function App() {

	/*<div className="App">
	    <Router>
	        <Switch>
	          	<Route path="/steptwo"><NewRecipeStep2/></Route>
	          	<Route path="/stepone"><NewRecipeStep1/></Route>
	      		<Route path="/"><QuickConvert/></Route>
	        </Switch>
	    </Router>
    </div>*/
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
          <Route path="/steptwo">
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
const NewRecipeStep2 = () => {
  const [howManyIngredients, setHowManyIngredients ] = useState(1);

  let ingredientsarray=[];/*
  let temp= [];
  ingredientsarray.push(" ");
 
*/
for( let i = 0; i < howManyIngredients; i++ ){

ingredientsarray.push(" ");
}
let temp = ingredientsarray.map((x,idx) => <Ingredient key = {idx}/> );
  return(
    <div className = "main">
      <Textfieldrecipe/>

      {temp}
      
    

      <div className = "knapp"> Save </div>
      <div onClick = {() => setHowManyIngredients(howManyIngredients + 1)} className = "knapp"> Add </div> 
    </div>
    );
}
const NewRecipeStep1 = () => {

  return(

    <div>
    <div className = "main">
<Textfieldrecipe/>
<p> From </p> <div className = "knapp"> System </div>
   <p> To </p> <div className = "knapp"> System </div>
   <Link to="/steptwo" ><div className = "knapp">   Create </div></Link>   </div>

</div>
    )
}



function Ingredient(){
 
  return(

  
            
    <div className="ingredientBox">
    <Textfieldingredient/>
    <div className = "knapp"> System </div>
    <div className = "knapp"> System </div>
    </div>
    )

}




function Textfieldingredient() {
if(b == null){
    b = "Name of ingredient";
}
return(
<input type="text" id="namnge" placeholder={b} onChange={changeInput2} />
)
}
function Textfieldrecipe() {
if(a == null){
    a = "Name of recipe";
}



  return(
    
   <input type="text" id="namnge" placeholder={a} onChange={changeInput} />
   
 
    )
}

function changeInput(event){
a = event.target.value;

}
function changeInput2(event){
b = event.target.value;

}



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
      <h1>Quick Convert</h1>

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
