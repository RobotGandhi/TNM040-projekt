import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import Modal from 'react-modal';

const NewRecipeStep2 = (props) => {

  let { from, to, name } = useParams();
  let convert = require('convert-units');

  const [recipeName, setRecipeName] = useState(name.name);
  const [recipeDescription, setRecipeDescription] = useState("");
  const [convertFromUnit, setConvertFromUnit] = useState(from === "US-Custom" ? "oz" : "mg");
  const [convertToUnit, setConvertToUnit] = useState(to === "US-Custom" ? "mg" : "oz");
  const [ingredientID, setIngredientID] = useState(1);
  
  const [ingredients, setIngredients] = useState([
    {
    ingredientName: "",
    ingredientAmount: 0.0,
    ingredientConvertFrom: from === "US-Custom" ? "oz" : "mg",
    ingredientConvertTo: to === "US-Custom" ? "oz" : "mg",
    conversionResult: 0.0,
    ingredientId: 0
  }]);


  const IngredientBlock = (props) => {
	return (
      <div>
        <form name={props.componentID}>
          <input name={"ingredientName"} type="text" className="ingredientName" onChange={changeIngredient}>
          </input>
          <input name={"ingredientAmount"} type="text" className="ingredientAmount" onChange={changeIngredient}>
          </input>
          {from === "US-Custom" &&
            <select name="ingredientConvertFrom" className="dropdown" onChange={changeIngredient}>
              <option value="oz">Ounces</option>
              <option value="lb">Pounds</option>
              <option value="fl-oz">Fluid Ounces</option>
              <option value="cup">Cups</option>
              <option value="pnt">Pints</option>
              <option value="qt">Quarts</option>
              <option value="gal">Gallons</option>
            </select>}
          {from === "Metric" &&
            <select name="ingredientConvertFrom" className="dropdown" onChange={changeIngredient}>
              <option value="mg">Milligrams</option>
              <option value="g">Grams</option>
              <option value="kg">Kilograms</option>
              <option value="ml">Milliliters</option>
              <option value="dl">Deciliters</option>
              <option value="l">Liters</option>
            </select>}

          <span> To </span>
          {to === "US-Custom" &&
            <select name="ingredientConvertTo" className="dropdown" onChange={changeIngredient} key={props.componentID}>
              <option value="oz">Ounces</option>
              <option value="lb">Pounds</option><option value="fl-oz">Fluid Ounces</option>
              <option value="cup">Cups</option>
              <option value="pnt">Pints</option>
              <option value="qt">Quarts</option>
              <option value="gal">Gallons</option>
            </select>}
          {to === "Metric" &&
            <select name="ingredientConvertTo" className="dropdown" onChange={changeIngredient} key={props.componentID}>
              <option value="mg">Milligrams</option>
              <option value="g">Grams</option>
              <option value="kg">Kilograms</option><option value="ml">Milliliters</option>
              <option value="dl">Deciliters</option>
              <option value="l">Liters</option>
            </select>}
        </form>
      </div>
    );
  }

  const [ingredientBlocks, setIngredientBlocks] = useState([<IngredientBlock key={0} componentID={0}/>]);

  function changeIngredient(event) {
    event.persist();
    let parent = parseInt(event.target.parentElement.name);
    
    //add data to ingredients array
    setIngredients((prevState) => ([
      ...prevState.slice(0, parent),
      {
        ...prevState[parent],
        [event.target.name]: event.target.value,
      },
      ...prevState.slice(parent + 1)
    ]));
	
	if(event.target.name === "ingredientConvertFrom") {
		setConvertFromUnit(event.target.value);
	}
	
	console.log(ingredients);
  }

  //convert each ingredient
  useEffect(() => {
    let currentIngredient, currentBlock;
	const volume = ["fl-oz", "cup", "pnt", "qt", "gal", "ml", "dl", "l"];
	const mass = ["oz", "lb", "mg", "g", "kg"];
    ingredients.forEach(element => {
		currentIngredient = element;
		if(volume.indexOf(currentIngredient.ingredientConvertFrom) > -1 && mass.indexOf(currentIngredient.ingredientConvertTo) > -1) {
			to === "US-Custom" ? currentIngredient.ingredientConvertTo = "fl-oz" : currentIngredient.ingredientConvertTo = "ml";
		}
		else if(mass.indexOf(currentIngredient.ingredientConvertFrom) > -1 && volume.indexOf(currentIngredient.ingredientConvertTo) > -1) {
			to === "US-Custom" ? currentIngredient.ingredientConvertTo = "oz" : currentIngredient.ingredientConvertTo = "mg";
		}
		currentIngredient.conversionResult = convert(parseInt(currentIngredient.ingredientAmount)).from(currentIngredient.ingredientConvertFrom).to(currentIngredient.ingredientConvertTo).toFixed(2);
    });
  });

  function addIngredient() {
    incrementIngredientID();
    addIngredientBlock();
  }

  function addIngredientBlock() {

    setIngredients([
      ...ingredients,
      {
        ingredientName: "",
        ingredientAmount: 0.0,
		ingredientConvertFrom: from === "US-Custom" ? "oz" : "mg",
		ingredientConvertTo: to === "US-Custom" ? "oz" : "mg",
        conversionResult: 0.0,
        ingredientId: ingredientID
      }
    ]);
	
	
	setIngredientBlocks([
      ...ingredientBlocks, <IngredientBlock key={ingredientID} componentID={ingredientID}/>
    ]);

  }

  function incrementIngredientID() {
    setIngredientID( prevState => (prevState + 1));
    //++ingredientID;
  }

  function changeDescription(event) {
    setRecipeDescription(event.target.value);
  }

  function changeRecipeName(event) {
    setRecipeName(event.target.value);
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

  function saveRecipe() {
    let recipe = {
      name: recipeName,
      ingredients: ingredients,
      description: recipeDescription,
      id: props.data[3]
    };
    props.callback(recipe);
  }

  return (
    <div>
      <input type="text" placeholder={name} onChange={changeRecipeName}>
      </input>
      <button onClick={addIngredient}>
        +
        </button>
      <div>
        {ingredientBlocks}
      </div>
      <button onClick={openModal}>Save</button>
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
            <button className="buttonModal" onClick={saveRecipe}>Save</button>
          </Link>

        </div>
      </Modal>
    </div>
  );
}




export default NewRecipeStep2;