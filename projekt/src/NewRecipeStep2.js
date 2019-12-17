import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import Modal from 'react-modal';

const NewRecipeStep2 = (props) => {

  let { from, to, name } = useParams();
  let convert = require('convert-units');
  const volume = ["fl-oz", "cup", "pnt", "qt", "gal", "ml", "dl", "l"];
  const mass = ["oz", "lb", "mg", "g", "kg"];

  const [recipeName, setRecipeName] = useState(name);
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
    ingredientID: 0
  }]);

  const refDescription = useRef();
  

  
  const [focusedInput1, setFocusedInput1] = useState();
  const [focusedInput2, setFocusedInput2] = useState();
  const [descriptionIsFocused, setDescriptionIsFocused] = useState(false);

  const IngredientBlock = (props) => {

    const ingredientInputRef1 = useRef([]);
    const ingredientInputRef2 = useRef([]);

    function inputFocus(event){
      if(event.target.name == "ingredientName"){
        setFocusedInput1(parseInt(event.target.id)); 
        setFocusedInput2();
      }
      else if(event.target.name == "ingredientAmount"){ 
        setFocusedInput2(parseInt(event.target.id))
        setFocusedInput1();
      }
    }

    //inorder to refocus inputs when components rerender
    useEffect(() => {
      ingredientInputRef1.current = ingredientInputRef1.current.slice(0, props.data.length);
      ingredientInputRef2.current = ingredientInputRef2.current.slice(0, props.data.length);
    }, [props.data]);

    useEffect(() => {
      if(focusedInput1 != undefined){
        ingredientInputRef1.current[focusedInput1].focus();
      }
      else if(focusedInput2 != undefined){
        ingredientInputRef2.current[focusedInput2].focus();
      }
        
    });

	return (
	<div>
		{props.data.map( (ingredient, i) => (
		  <div key={ingredient.ingredientID}>
			<form name={ingredient.ingredientID}>
			  <input name={"ingredientName"} value={ingredient.ingredientName} type="text" className="ingredientName" onChange={changeIngredient} ref={el => ingredientInputRef1.current[i] = el} onFocus={inputFocus} id={i}>
			  </input>
			  <input name={"ingredientAmount"} value={ingredient.ingredientAmount} type="text" className="ingredientAmount" onChange={changeIngredient} ref={el => ingredientInputRef2.current[i] = el} onFocus={inputFocus} id={i}>
			  </input>
			  {from === "US-Custom" &&
				<select name="ingredientConvertFrom" value={ingredient.ingredientConvertFrom} className="dropdown" onChange={changeIngredient}>
				  <option value="oz">Ounces</option>
				  <option value="lb">Pounds</option>
				  <option value="fl-oz">Fluid Ounces</option>
				  <option value="cup">Cups</option>
				  <option value="pnt">Pints</option>
				  <option value="qt">Quarts</option>
				  <option value="gal">Gallons</option>
				</select>}
			  {from === "Metric" &&
				<select name="ingredientConvertFrom" value={ingredient.ingredientConvertFrom} className="dropdown" onChange={changeIngredient}>
				  <option value="mg">Milligrams</option>
				  <option value="g">Grams</option>
				  <option value="kg">Kilograms</option>
				  <option value="ml">Milliliters</option>
				  <option value="dl">Deciliters</option>
				  <option value="l">Liters</option>
			  </select>}

			  <span> To </span>
			  {to === "US-Custom" && mass.indexOf(ingredient.ingredientConvertFrom) > -1 &&
			  <select name="ingredientConvertTo" value={ingredient.ingredientConvertTo} className="dropdown" onChange={changeIngredient}>
				  <option value="oz">Ounces</option>
				  <option value="lb">Pounds</option>
				</select>}
			  {to === "US-Custom" && volume.indexOf(ingredient.ingredientConvertFrom) > -1 &&
			  <select name="ingredientConvertTo" value={ingredient.ingredientConvertTo} className="dropdown" onChange={changeIngredient}>
				  <option value="fl-oz">Fluid Ounces</option>
				  <option value="cup">Cups</option>
				  <option value="pnt">Pints</option>
				  <option value="qt">Quarts</option>
				  <option value="gal">Gallons</option>
				</select>}
			  {to === "Metric" && mass.indexOf(ingredient.ingredientConvertFrom) > -1 &&
			  <select name="ingredientConvertTo" value={ingredient.ingredientConvertTo} className="dropdown" onChange={changeIngredient}>
				  <option value="mg">Milligrams</option>
				  <option value="g">Grams</option>
				  <option value="kg">Kilograms</option>
				</select>}
			  {to === "Metric" && volume.indexOf(ingredient.ingredientConvertFrom) > -1 &&
			  <select name="ingredientConvertTo" value={ingredient.ingredientConvertTo} className="dropdown" onChange={changeIngredient}>
				  <option value="ml">Milliliters</option>
				  <option value="dl">Deciliters</option>
				  <option value="l">Liters</option>
				</select>}
				<button type="button" onClick={deleteIngredient}>Delete</button>
			</form>
		  </div>
		))}
	</div>
    );
  }

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
  }

  //convert each ingredient
  useEffect(() => {
    let currentIngredient, currentBlock;
    
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
    //focus description
    if(descriptionIsFocused){
      refDescription.current.focus();
    }

  });

  function addIngredient() {
    incrementIngredientID();
    setIngredients([
      ...ingredients,
      {
        ingredientName: "",
        ingredientAmount: 0.0,
        ingredientConvertFrom: from === "US-Custom" ? "oz" : "mg",
        ingredientConvertTo: to === "US-Custom" ? "oz" : "mg",
        conversionResult: 0.0,
        ingredientID: ingredientID
      }
    ]);
  }

  function deleteIngredient(event){
    
    let parent = event.target.parentElement.name;
    let tempData = ingredients.filter(ingredient => ingredient.ingredientID != parent);
    setIngredients(tempData);
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
    setDescriptionIsFocused(false);
  }  

  function focusDescription(){
    setDescriptionIsFocused(true);
  }


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
      <input type="text" value={recipeName} onChange={changeRecipeName}>
      </input>
      <button onClick={addIngredient}>
        +
      </button>
      <div>
        <IngredientBlock data={ingredients} />
      </div>
      <button onClick={openModal}>Save</button>
      <Modal className="descriptionModal"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Example Modal">
        <div>
          <h3>{recipeName}</h3>
          <form>
            <textarea type="text" onChange={changeDescription} className="descriptionField" onFocus={focusDescription} ref={refDescription}/>
          </form>
          <div onClick={closeModal} className="buttonModal" >Back</div>
          <Link to={"/listOfRecipes"}>
            <div className="buttonModal" onClick={saveRecipe}>Save</div>
          </Link>

        </div>
      </Modal>
    </div>
  );
}




export default NewRecipeStep2;