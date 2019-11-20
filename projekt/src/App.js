import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, {useState} from 'react';
import './App.css';

let a = null;
let b = null;
 
function App() {


  return (
    <div className="App">
	    <Router>
	        <Switch>
	          	<Route path="/steptwo"><NewRecipeStep2/></Route>
	          	<Route path="/stepone"><NewRecipeStep1/></Route>
	      		<Route path="/"><QuickConvert/></Route>
	        </Switch>
	    </Router>
    </div>
  );
}
const NewRecipeStep2 => {
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
const NewRecipeStep1 => {

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
    <div className="quickConvert">
      <h1 className="header">Quick Convert</h1>

      <h2>From</h2>
      <select value={convertFrom} className="selectFrom" onChange={changeConvertFrom}>
        <option value="US-Custom">US-Custom</option>
        <option value="Metric">Metric</option>
      </select>

      <h2>To</h2>
      <select value={convertTo} className="selectTo" onChange={changeConvertTo}>
        <option value="Metric">Metric</option>
        <option value="US-Custom">US-Custom</option>
      </select>

      <div>
        <input type="text" className="textInput" onChange={changeConversionAmount}></input>
        {convertFrom === "US-Custom" &&
        <select value={convertFromUnit} className="selectFromUnit" onChange={changeConvertFromUnit}>
          <option value="oz">Ounces</option>
          <option value="lb">Pounds</option>
          <option value="fl-oz">Fluid Ounces</option>
          <option value="cup">Cups</option>
          <option value="pnt">Pints</option>
          <option value="qt">Quarts</option>
          <option value="gal">Gallons</option>
        </select>}
        {convertFrom === "Metric" &&
        <select value={convertFromUnit} className="selectFromUnit" onChange={changeConvertFromUnit}>
          <option value="mg">Milligrams</option>
          <option value="g">Grams</option>
          <option value="kg">Kilograms</option>
          <option value="ml">Milliliters</option>
          <option value="dl">Deciliters</option>
          <option value="l">Liters</option>
        </select>}

        <button className="button" onClick={doConvert}>Convert!</button>

        <input type="text" className="textInput" value={conversionResult} disabled></input>
        {convertTo === "US-Custom" &&
        <select value={convertToUnit} className="selectFromUnit" onChange={changeConvertToUnit}>
          <option value="oz">Ounces</option>
          <option value="lb">Pounds</option>
          <option value="fl-oz">Fluid Ounces</option>
          <option value="cup">Cups</option>
          <option value="pnt">Pints</option>
          <option value="qt">Quarts</option>
          <option value="gal">Gallons</option>
        </select>}
        {convertTo === "Metric" &&
        <select value={convertToUnit} className="selectFromUnit" onChange={changeConvertToUnit}>
          <option value="mg">Milligrams</option>
          <option value="g">Grams</option>
          <option value="kg">Kilograms</option>
          <option value="ml">Milliliters</option>
          <option value="dl">Deciliters</option>
          <option value="l">Liters</option>
        </select>}
      </div>
      <button className="button" onClick={doSwap}>Convert!</button>
    </div>
  )
};

export default App;
