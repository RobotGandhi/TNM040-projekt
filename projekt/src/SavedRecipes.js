import React, { useState } from 'react';

const ListOfRecipes = () => {
    
    return(
        <div>
          
        </div>
    );
    
   
    
    
    
    
    
    
    
    
    
    
    
    /*const [localRecipeList, setLocalRecipeList] = useState(recipeList);
    console.log(localRecipeList);
  
    function deleteRecipe(event) {
      console.log(event.target.id);
      let id = event.target.id;
      const temp = localRecipeList.filter(r => r.recipeID != event.target.id);
      console.log(temp);
      setLocalRecipeList(temp);
      recipeList = localRecipeList;
    }
    
    return (
      <div>
        <h1>List of Recipes </h1>
        {localRecipeList.map(recipe => 
          <div id={recipe.recipeID}>  
            <h1>{recipe.name}</h1>
            <span>Ingredients:</span>
            {recipe.ingredients.map(ingredient => 
            <ul>
              <span>{ingredient.conversionResult} </span>
              <span>{ingredient.unitTo} </span>
              <span>{ingredient.name}</span>
            </ul>
            )}
            <h2>Description: </h2>
            <span>{recipe.description}</span>
            <button id={recipe.recipeID} onClick={deleteRecipe}>Delete </button>
          </div>
        )}
      </div>
    )*/
}

    export default ListOfRecipes;