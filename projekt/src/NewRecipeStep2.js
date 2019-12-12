import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import Modal from 'react-modal';

const NewRecipeStep2 = (props) => {
  
    let { from, to, name } = useParams();
    let convert = require('convert-units');
    let recipe = {
      name: props.temporaryValues.recipeName,
      ingredients: listOfIngredients
    };
    let  ingredientName, ingredientAmount, convertFromUnit, convertToUnit, conversionResult, ingredientID;
    let ingredientCounter = 0;

    const [listOfIngredients, setListOfIngredients] = useState([]);
    const [ingredientBlocks, setIngredientBlocks] = useState([]);
  
    // Probem: Dropdown renderas inte om förräns man lägger till ett till ingrediensblock. State uppdateras dock korrekt.
    const IngredientBlock = (props) => {
      return (
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
                <select  value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
                  <option value="oz">Ounces</option>
                  <option value="lb">Pounds</option>
                  <option value="fl-oz">Fluid Ounces</option>
                  <option value="cup">Cups</option>
                  <option value="pnt">Pints</option>
                  <option value="qt">Quarts</option>
                  <option value="gal">Gallons</option>
                </select>}
                {to === "Metric" &&
                <select Id="dropdown1" value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
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

    function changeIngredientAmount(event) {
      ingredientAmount = event.target.value;
    }
  
    function incrementIngredientID() {
      ingredientID++;      
    }
  
    function changeConvertFromUnit(event) {
      convertFromUnit = event.target.value;
    }
  
    function changeConvertToUnit(event) {
      convertToUnit = event.target.value;
    }
  
    function changeIngredientName(event) {
      ingredientName = event.target.value;
    }
  
  
    function addIngredient () {
      incrementIngredientID();
      addIngredientData();
      addIngredientBlock();
    } 

    function addIngredientData() {
      let ingredient =
      {
        name: ingredientName,
        amount: ingredientAmount,
        unitFrom: convertFromUnit,
        unitTo: convertToUnit,
        conversionResult: convert(ingredientAmount).from(convertFromUnit).to(convertToUnit),
        id: ingredientID
      }
      setListOfIngredients(listOfIngredients.push(ingredient));
    }

    function addIngredientBlock() {
      setIngredientBlocks(ingredientBlocks.push(<IngredientBlock key={"K" + ingredientCounter} id={ingredientCounter} />));
    }
    return(
      <div>
        <input type="text" placeholder={name} onChange={changeIngredientName}>
        </input>
        <button onClick={addIngredient}>
          +
        </button>
        <div>
          {ingredientBlocks}
        </div>
        <button onClick={addLastIngredient}>Save</button>
        <Modal className="descriptionModal"
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal">
          <div>
            <h3>{recipeName}</h3>
            <form>
              <textarea type="text" onChange={changeDescription} className="descriptionField" />
            </form>
            <div onClick={closeModal} className="buttonModal" >Back</div>
            <Link to={"/listOfRecipes"}>
              <button className="buttonModal" onClick={createRecipe}>Save</button>
            </Link>
  
          </div>
        </Modal>
      </div>
    );
}



export default NewRecipeStep2;