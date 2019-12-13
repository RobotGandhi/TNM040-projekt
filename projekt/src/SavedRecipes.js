import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

const ListOfRecipes = (props) => {
  let convert = require('convert-units');

  //Temporary hardcoded recipes
  let ingredient1 = {
    name: "Jeff1",
    amount: 10,
    convertFrom: "oz",
    convertTo: "mg",
    conversionResult: 28761,
    ingredientId: 1
  }
  let ingredient2 = {
    name: "Jeff2",
    amount: 20,
    convertFrom: "oz",
    convertTo: "mg",
    conversionResult: 53761,
    ingredientId: 2
  }

  let recipe1 = {
    name: "Jeff1",
    ingredients: [
      ingredient1, 
      ingredient2
    ],
    description: "1111111111111111111111111111111111111",
    id: 1
  };

  let recipe2 = {
    name: "Jeff2",
    ingredients: [
      ingredient2, 
      ingredient1
    ],
    description: "22222222222222222222222222222222222222",
    id: 2
  };

  const [localRecipeList, setLocalRecipeList] = useState([
    recipe1,
    recipe2
  ]);
  
  // Sends hardcoded data to global array through callback
  props.callback(localRecipeList);

  // Creates a temporary array that filters out the recipe you deleted and sets the recipe array to the temporary array
  function deleteRecipe(event) {
    const temp = localRecipeList.filter(r => r.id != event.target.id);
    setLocalRecipeList(temp);
  }
    
    return(
        <div>
          <h1>In progress again...</h1>
          {localRecipeList.map(recipe => 
            <div>
              <Link to={"/" + recipe.name}>
                <h1>
                  {recipe.name}
                </h1>
              </Link>
              <button id={recipe.id} onClick={deleteRecipe}>
                 Delete
              </button>
            </div>
          )}
        </div>
    );
}

    export default ListOfRecipes;