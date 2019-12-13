import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import Modal from 'react-modal';

const NewRecipeStep2 = (props) => {

  let { from, to, name } = useParams();
  let convert = require('convert-units');

  const [recipeName, setRecipeName] = useState(props.data[0]);
  console.log(recipeName)
  const [recipeDescription, setRecipeDescription] = useState("");

  const [convertFromUnit, setConvertFromUnit] = useState("oz");
  const [convertToUnit, setConvertToUnit] = useState("mg");
  const [conversionResult, setConversionResult] = useState("0");

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0.0);
  const [ingredientID, setIngredientID] = useState(1);

  const [ingredient, setIngredient] = useState();


  const [ingredients, setIngredients] = useState([{
    ingredientName: "",
    ingredientAmount: 0.0,
    ingredientConvertFrom: "",
    ingredientConvertTo: "",
    conversionResult: 0.0,
    ingredientId: ingredientID
  }]);




  const IngredientBlock = (props) => {
    return (
      <div>
        <form name={ingredientID}>
          <input name={"ingredientName"} type="text" className="ingredientName" onChange={changeIngredient}>
          </input>
          <input name={"ingredientAmount"} type="text" className="ingredientAmount" onChange={changeIngredient}>
          </input>
          {from === "US-Custom" &&
            <select name="ingredientConvertFrom" value={convertFromUnit} className="dropdown" onChange={changeIngredient}>
              <option value="oz">Ounces</option>
              <option value="lb">Pounds</option>
              <option value="fl-oz">Fluid Ounces</option>
              <option value="cup">Cups</option>
              <option value="pnt">Pints</option>
              <option value="qt">Quarts</option>
              <option value="gal">Gallons</option>
            </select>}
          {from === "Metric" &&
            <select name="ingredientConvertFrom" value={convertFromUnit} className="dropdown" onChange={changeIngredient}>
              <option value="mg">Milligrams</option>
              <option value="g">Grams</option>
              <option value="kg">Kilograms</option>
              <option value="ml">Milliliters</option>
              <option value="dl">Deciliters</option>
              <option value="l">Liters</option>
            </select>}

          <span> To </span>
          {to === "US-Custom" &&
            <select name="ingredientConvertTo" value={convertToUnit} className="dropdown" onChange={changeIngredient}>
              <option value="oz">Ounces</option>
              <option value="lb">Pounds</option>
              <option value="fl-oz">Fluid Ounces</option>
              <option value="cup">Cups</option>
              <option value="pnt">Pints</option>
              <option value="qt">Quarts</option>
              <option value="gal">Gallons</option>
            </select>}
          {to === "Metric" &&
            <select name="ingredientConvertTo" value={convertToUnit} className="dropdown" onChange={changeIngredient}>
              <option value="mg">Milligrams</option>
              <option value="g">Grams</option>
              <option value="kg">Kilograms</option>
              <option value="ml">Milliliters</option>
              <option value="dl">Deciliters</option>
              <option value="l">Liters</option>
            </select>}
        </form>
      </div>
    );
  }

  const [ingredientBlocks, setIngredientBlocks] = useState([<IngredientBlock key={ingredientID} />]);

  function changeIngredient(event) {
    let parent = event.target.parentElement;
    //console.log

    /*ingredients.forEach(element => {
      if(event.target === element.ingredientID)
    });*/
  }

  function changeIngredientName(event) {
    setIngredientName(event.target.value);
  }

  function addIngredientBlock() {
    setIngredientID(ingredientID + 1);
    ingredientBlocks.push(<IngredientBlock key={ingredientID} />);
    setIngredientBlocks(ingredientBlocks);
  }


  /*function blocksAndIngredients() {

    incrementIngredientID();
    ingredientBlocks.push(<IngredientBlock key={ingredientID} />);
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

  }*/

  function changeDescription(event) {
    setRecipeDescription(event.target.value);
  }

  /*function addIngredient() {
    incrementIngredientID();
    addIngredientData();
    addIngredientBlock();
  }*/

  /*function addIngredientData() {
    setListOfIngredients(ingredients.push(ingredient));
    let ingredient =
    {
      name: ingredientName,
      amount: ingredientAmount,
      unitFrom: convertFromUnit,
      unitTo: convertToUnit,

      id: ingredientID
    }
    setListOfIngredients(listOfIngredients.push(ingredient));
  }*/

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

  return (
    <div>
      <input type="text" placeholder={name} onChange={changeIngredientName}>
      </input>
      <button onClick={addIngredientBlock}>
        +
        </button>
      <div>
        {ingredientBlocks}
      </div>
      <button >Save</button>
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
            <button className="buttonModal" >Save</button>
          </Link>

        </div>
      </Modal>
    </div>
  );
}




export default NewRecipeStep2;