import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

const ListOfRecipes = (props) => {

  console.log(props.data);

  return (
    <div>
      <h1 className="header">Book of Recipes</h1>
      {props.data.map(recipe => 
      <div className ="recipeBlock">
        <div className = "recipeElement">
          <Link to={"/" + recipe.name}>
            <h1>{recipe.name}</h1>
          </Link>
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