import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

const ListOfRecipes = (props) => {

  console.log(props.data);

  return (
    <div>
      {props.data.map(recipe => 
        <div>
          <Link to={"/" + recipe.name}>
            <h1>{recipe.name}</h1>
          </Link>
          <button id={recipe.id} onClick={deleteRecipe}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
  
  // Creates a temporary array that filters out the recipe you deleted and sets the recipe array to the temporary array
  function deleteRecipe(event) {
    const temp = props.data.filter(r => r.id != event.target.id);
    props.callback(temp);
  }
}

    export default ListOfRecipes;