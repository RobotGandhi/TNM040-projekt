import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import Modal from 'react-modal';

let recipeMasterList = [];

function addToMasterList(recipe){
  recipeMasterList.push(recipe);
}

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

  let {from, to} = useParams();

  const ingredientBlocks = [];

  const [ingredients,setListOfIngredients] = useState([]);
  const [ingredientCounter, setIngredientCounter] = useState(0);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0.0);
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [ingredientID, setIngredientID] = useState(0);

  function addIngredientToList (event) {
    
    setListOfIngredients([
      ...ingredients,
      {
        name: ingredientName,
        amount: ingredientAmount,
        unit: ingredientUnit,
        id: ingredientID
      }
    ])
  }

  function incrementBlocks (event) {
    setIngredientCounter(ingredientCounter + 1);
    console.log(ingredients);
  };

  function changeIngredientName(event) {
    setIngredientName(event.target.value);
  }

  function blocksAndIngredients (event) {
    incrementBlocks();
    addIngredientToList();
  }

  const IngredientBlock = () => {
    return(
      <div>
        <input type="text" className="ingredientName" key={ingredientCounter} value={ingredientName} onChange={changeIngredientName}>
        </input>
        <input type="text" className="ingredientAmount">
        </input>
      </div>
    );
  }  

  for(let i = 0; i < ingredientCounter; i++ ) {
    ingredientBlocks.push(<IngredientBlock key={ingredientCounter}/>);
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

  return(
    <div>
      <button onClick={blocksAndIngredients}>
        +
      </button>
      <div>
        {ingredientBlocks}
        
      </div>
      <Link to={"/stepthree/" + from + "/" + to}>
        <button>Save</button>
      </Link>
        <button onClick = {openModal}>Save</button>
        <Modal className = "descriptionModal"
        isOpen = {modalIsOpen}
        onAfterOpen = {afterOpenModal}
        onRequestClose = {closeModal}
        contentLabel = "Example Modal">
          <div>
            <h3>Recipe name</h3>
            <form>
              <textarea className ="descriptionField"/>
            </form>
            <button onClick = {closeModal}>Back</button>
            <button>Save</button>
          </div>
        </Modal>
    </div>
  );
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