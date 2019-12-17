import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import Modal from 'react-modal';

const ListOfRecipes = (props) => {

  console.log(props.data);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [openID, setOpenID] = useState();
  function openModal(event) {
    setOpenID(event.target.id);
    setIsOpen(true);
  }
  function afterOpenModal() {
    //References are synced and can be accesssed here.
  }
  function closeModal() {
    setIsOpen(false);
  }
  //let oneRecipe = props.data;
  return (
    <div>
      <h1 className="header">Book of Recipes</h1>
      {props.data.map(recipe => 
      <div className ="recipeBlock">
        <div className = "recipeElement">
          <button id={recipe.id} onClick={openModal}>
            {recipe.name}
          </button>
          
            {console.log(openID)}
            {console.log(recipe.id)}
            {console.log(openID == recipe.id)}
            <div>
              {openID == recipe.id &&
              <Modal 
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              data-target={recipe.id}
              data={recipe}
              >
                  <div>
                      <h1>{recipe.name}</h1>
                      <ul>
                          {recipe.ingredients.map( ingredient =>
                              <div>
                                  <h2>Ingredients: </h2>
                                  <span>{ingredient.conversionResult} </span>
                                  <span>{ingredient.ingredientConvertTo} </span>
                                  <span>{ingredient.ingredientName} </span>
                             </div>
                         )}
                      </ul>
                      <h2>Description: </h2>
                      <div>
                        {recipe.description}
                      </div>
                </div>
              </Modal>
              }
            </div>
        </div>
          <div className = "deleteButton" id={recipe.id} onClick={deleteRecipe}>
            x
          </div>
      </div>
      )}

      {/*TEMPORARY FOR EASY STYLING*/}
        <div className = "recipeBlock">
          <div className = "recipeElement">
            <Link to="">
              <h1>Recipe name</h1>
            </Link>
          </div>
          <div className = "deleteButton">
            x
          </div>
        </div>
      {/*TEMPORARY FOR EASY STYLING*/}
    </div>
  )
  
  // Creates a temporary array that filters out the recipe you deleted and sets the recipe array to the temporary array
  function deleteRecipe(event) {
    const temp = props.data.filter(r => r.id != event.target.id);
    props.callback(temp);
  }
}

    export default ListOfRecipes;