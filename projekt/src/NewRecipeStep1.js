import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";


const NewRecipeStep1 = (props) => {

  let convert = require('convert-units');

  const [recipeName, setRecipeName] = useState("Recipe");
  const [convertFrom, setConvertFrom] = useState("US-Custom");
  const [convertTo, setConvertTo] = useState("Metric");
  const [recipeID, setRecipeID] = useState(props.data.length + 1);

  function changeRecipeName(event) {
    setRecipeName(event.target.value);
  }
  function changeConvertFrom(event) {
    setConvertFrom(event.target.value);
  }
  function changeConvertTo(event) {
    setConvertTo(event.target.value);
  }

  function changeConvertTo(event) {
    setConvertTo(event.target.value);
  }

  function sendTempValues() {
    props.callback([recipeName, convertFrom, convertTo, recipeID]);
  }

  return (
    <div>
      <h1 className="header">New Recipe</h1>
      <div className="box">
        <div className="box-in-box">
          <div className="newRecipe1">
            <h2 className="newRecipeHeader">Convert:</h2>
            <input type="text" className="recipeName" placeholder="Name of recipe..." onChange={changeRecipeName}>
            </input>
            <div>
              <h2 className="fromTo">From</h2>
              <select value={convertFrom} className="dropdown2" onChange={changeConvertFrom}>
                <option value="US-Custom">US-Custom</option>
                <option value="Metric">Metric</option>
              </select>
            </div>
            <div>
              <h2 className="fromTo">To</h2>
              <select value={convertTo} className="dropdown2" onChange={changeConvertTo}>
                <option value="Metric">Metric</option>
                <option value="US-Custom">US-Custom</option>
              </select>
            </div>
          </div>
          <Link to={"/steptwo/" + convertFrom + "/" + convertTo + "/" + recipeName}>
            <div className="convertButton" onClick={sendTempValues}>Create!</div>
          </Link>
        </div>
      </div>
    </div>
  );

}



export default NewRecipeStep1;