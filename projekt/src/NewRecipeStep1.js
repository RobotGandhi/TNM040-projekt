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
        <div className="main">
          <input type="text" className="recipeName" placeholder="Name of recipe..." onChange={changeRecipeName}>
          </input>
          <p>From</p>
          <select value={convertFrom} className="button" onChange={changeConvertFrom}>
            <option value="US-Custom">US-Custom</option>
            <option value="Metric">Metric</option>
          </select>
  
          <p>To</p>
          <select value={convertTo} className="button" onChange={changeConvertTo}>
            <option value="Metric">Metric</option>
            <option value="US-Custom">US-Custom</option>
          </select>
  
          <Link to={"/steptwo/" + convertFrom + "/" + convertTo + "/" + recipeName}>
            <div className="button" onClick={sendTempValues}>
              Create
            </div>
          </Link>
        </div>
      </div>
    );
  
}



export default NewRecipeStep1;