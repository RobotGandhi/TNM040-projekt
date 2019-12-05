import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import Modal from 'react-modal';

let recipeList = [];

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
    <Link to ="/listOfRecipies" className={`navButton ${selection1 ? 'isSelected' : ''}`} onClick={button1Selected} >
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

function App() {
  return (
    <Router>
      <div>
        <Switch> 
          <Route path="/listOfRecipies">
            <ListOfRecipies/>
          </Route>
          <Route path="/stepone">
            <NewRecipeStep1/>
          </Route>
          <Route path="/steptwo/:from/:to/:name">
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

  let {from, to, name} = useParams();
  let convert = require('convert-units'); 

  const IngredientBlock = (props) => {
    return(
      <div>
        <input type="text" className="ingredientName" key={props.id + ".name"} onChange={changeIngredientName}>
        </input>
        <input type="text" className="ingredientAmount" key={props.id + ".amount"} onChange={changeIngredientAmount}>
        </input>
        {from === "US-Custom" &&
              <select value={convertFromUnit} className="dropdown" onChange={changeConvertFromUnit}>
                <option value="oz">Ounces</option>
                <option value="lb">Pounds</option>
                <option value="fl-oz">Fluid Ounces</option>
                <option value="cup">Cups</option>
                <option value="pnt">Pints</option>
                <option value="qt">Quarts</option>
                <option value="gal">Gallons</option>
              </select>}
              {from === "Metric" &&
              <select value={convertFromUnit} className="dropdown" onChange={changeConvertFromUnit}>
                <option value="mg">Milligrams</option>
                <option value="g">Grams</option>
                <option value="kg">Kilograms</option>
                <option value="ml">Milliliters</option>
                <option value="dl">Deciliters</option>
                <option value="l">Liters</option>
              </select>}
              
              <span> To </span>
              {to === "US-Custom" &&
              <select value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
                <option value="oz">Ounces</option>
                <option value="lb">Pounds</option>
                <option value="fl-oz">Fluid Ounces</option>
                <option value="cup">Cups</option>
                <option value="pnt">Pints</option>
                <option value="qt">Quarts</option>
                <option value="gal">Gallons</option>
              </select>}
              {to === "Metric" &&
              <select value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
                <option value="mg">Milligrams</option>
                <option value="g">Grams</option>
                <option value="kg">Kilograms</option>
                <option value="ml">Milliliters</option>
                <option value="dl">Deciliters</option>
                <option value="l">Liters</option>
              </select>}
      </div>
    );
  }  

  const [recipieName, setRecipieName] = useState(name);
  const [recipieDescription, setRecipieDescription] = useState("");
  const [recipieID, setRecipieID] = useState(1);

  const [convertFromUnit, setConvertFromUnit] = useState("oz");
  const [convertToUnit, setConvertToUnit] = useState("mg");
  const [conversionResult, setConversionResult] = useState("0");

  const [ingredientCounter, setIngredientCounter] = useState(1);
  const [ingredientBlocks, setIngredientBlocks] = useState([<IngredientBlock key={ingredientCounter} id={ingredientCounter} />]);
  const [ingredients,setListOfIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0.0);
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [ingredientID, setIngredientID] = useState(0);

  function changeIngredientName(event) {
    setIngredientName(event.target.value);
  }

  function changeIngredientAmount (event) {
    setIngredientAmount(event.target.value);
  }

  function incrementIngredientCounter () {
    setIngredientCounter(ingredientCounter + 1);
  }

  function incrementIngredientID () {
    setIngredientID(ingredientID + 1);
  }

  function changeConvertFromUnit(event) {
    setConvertFromUnit(event.target.value);
  }

  function changeConvertToUnit(event) {
    setConvertToUnit(event.target.value);
  }

  function changeIngredientName (event) {
    setIngredientName(event.target.value);
  }

  function incrementRecipieID () {
    setRecipieID(recipieID + 1);
  }
  function blocksAndIngredients () {

    incrementIngredientID();
    ingredientBlocks.push(<IngredientBlock key={"I" + ingredientCounter } id={ingredientCounter} />);
    setListOfIngredients([
      ...ingredients,
      {
        name: ingredientName,
        amount: ingredientAmount,
        unitFrom: convertFromUnit,
        unitTo: convertToUnit,
        conversionResult: convert(ingredientAmount).from(convertFromUnit).to(convertToUnit),
        id: ingredientID
      }
    ])

    incrementIngredientCounter();

  }

  function changeDescription (event) {
    setRecipieDescription(event.target.value);
  }


  function createRecipie () {
    let recipie = {
      name: recipieName,
      ingredients: ingredients,
      description: recipieDescription,
      ID: recipieID  
    }

    recipeList.push(recipie);
  }

  function addLastIngredient () {
    blocksAndIngredients();
    openModal();
  }

  
  //Modal handling
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    //References are synced and can be accesssed here.
  }
  function closeModal() {
    setIsOpen(false);
  }

  console.log(ingredients);
  console.log(conversionResult);
  
  return(
    <div>
      <input type="text" placeholder={name} onChange={changeIngredientName}>
      </input>
      <button onClick={blocksAndIngredients}>
        +
      </button>
      <div>
        {ingredientBlocks}
      </div>
        {/*<button onClick = {openModal}>Save</button>*/}
        <button onClick={addLastIngredient}>Save</button>
        <Modal className = "descriptionModal"
        isOpen = {modalIsOpen}
        onAfterOpen = {afterOpenModal}
        onRequestClose = {closeModal}
        contentLabel = "Example Modal">
          <div>
            <h3>{recipieName}</h3>
            <form>
              <textarea type="text" onChange={changeDescription} className ="descriptionField"/>
            </form>
            <div onClick = {closeModal} className = "buttonModal" >Back</div>
            <Link to={"/listOfRecipies"}>
              <button className = "buttonModal" onClick={createRecipie}>Save</button>
            </Link>
              
          </div>
        </Modal>
    </div>
  );
}

const ListOfRecipies = ({match}) => {
  let localRecipieList = []; 
  localRecipieList = recipeList;
  console.log(localRecipieList);
  return (
    <div>
      <h1>List of recipies </h1>
      {localRecipieList.map(recipie => <DisplayRecipies data={recipie} />)}
    </div>
  )
}

const DisplayRecipies = (props) => {
  console.log(props);
  return(
    <div>
      {props.data.name}
    </div>
  ) 
}

//Preliminär lösning. hade varit bättre med en modal
const NewRecipeStep3 = () => {
  return(
    <div>
      <h2>Namn på recept</h2>
      <form>
        <input></input>
      </form>
        <button>Back</button>
        <button>Save</button>
    </div>
  )
}

const NewRecipeStep1 = () => {
  let convert = require('convert-units');

  const [recipieName, setRecipieName] = useState("Recipie");
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
        
        <Link to={"/steptwo/" + convertFrom + "/" + convertTo + "/" + recipieName}>
          <div className = "button">   
            Create 
          </div>
        </Link>   
      </div>
    </div>
  )

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
  <div className="super">
    <h1 className="header">Quick Convert</h1>
    <div className="quickConvert">
      <h2>From</h2>
      <div className="daddyCool">
          <div className="daddy2">
            <div className="child1">
              <select value={convertFrom} className="dropdown" onChange={changeConvertFrom}>
                <option value="US-Custom">US-Custom</option>
                <option value="Metric">Metric</option>
              </select>
            </div>
            <div className="child2">
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
            </div>
          </div>
        <div className="daddy1">
          <input type="text" className="textInput" onChange={changeConversionAmount}></input>
        </div>
      </div>
      <div className="quickConvert">
        <h2>To</h2>
        <div className="daddyCool">
          <div className="daddy2">
            <div className="child1">
              <select value={convertTo} className="dropdown" onChange={changeConvertTo}>
                <option value="Metric">Metric</option>
                <option value="US-Custom">US-Custom</option>
              </select>
            </div>
            <div className="child2">
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
          </div>
          <div className="daddy1">
            <input type="text" className="textInputGray" value={conversionResult} disabled></input>
          </div>
        </div>
      </div>
    </div>
  </div>
      <div className="mrpoopypantsDaddy">
        <div className="mrpoopypants"><div className="button" onClick={doSwap}>Swap</div></div>
        <div className="mrpoopypants"><div className="button" onClick={doConvert}>Convert!</div></div>
      </div>
</div>
  )
};

export default App;