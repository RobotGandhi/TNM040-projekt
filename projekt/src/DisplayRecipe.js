import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

const DisplayRecipe = (props) => {
    let name = useParams();
    let recipe = props.data.filter(r => r.name === name.name);
    console.log(recipe);
    return (
        <div>
            {recipe.map(recipe =>
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
            )}
        </div>
    );
}

export default DisplayRecipe;