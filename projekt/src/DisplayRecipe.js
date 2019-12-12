import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

const DisplayRecipe = (props) => {
    let recipe = props.data.filter(r => r.name === props.clickedName);
    return (
        <div>
            <h1>{recipe.name}</h1>
        </div>
    );
}

export default DisplayRecipe;