import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import ListOfRecipes from './SavedRecipes';
import NewRecipeStep1 from './NewRecipeStep1';
import NewRecipeStep2 from './NewRecipeStep2';
import QuickConvert from './QuickConvert';
import DisplayRecipe from './DisplayRecipe';


function NavBar(props) {
  //states for what navbar button is selected
  const [selection1, setSelection1] = useState(false);
  const [selection2, setSelection2] = useState(true);
  const [selection3, setSelection3] = useState(false);

  //state becomes true if nav bar button is clicked
  const button1Selected = event => {
    setSelection1(true);
    setSelection2(false);
    setSelection3(false);
  }

  const button2Selected = event => {
    setSelection1(false);
    setSelection2(true);
    setSelection3(false);
  }

  const button3Selected = event => {
    setSelection1(false);
    setSelection2(false);
    setSelection3(true);
  }

  return (
    /*Navbar*/
    <header className="navHeader">
      <div className="navBar">
        {/*Recipes,
    Link is given the class selected if selection state is true(if button was clicked)*/}
        <Link to="/listOfRecipes" className={`navButton ${selection1 ? 'isSelected' : ''}`} onClick={button1Selected} >
          <div>
            {
              selection1 ? <img alt ="List of Recipes Selected" src = "BookOfRecipesIconSelected.svg"></img> 
              : <img alt ="List of Recipes" src = "BookOfRecipesIcon.svg"></img>
            }
      </div>
        </Link>
        {/*Quick Convert*/}
        <Link to="/" className={`navButton ${selection2 ? 'isSelected' : ''}`} onClick={button2Selected}>
          <div>
          {
              selection2 ? <img alt ="Quick Convert Selected" src = "QuickConvertIcon3Selected.svg"></img> 
              : <img alt ="Quick Convert" src = "QuickConvertIcon3.svg"></img>
            }
      </div>
        </Link>
        <Link to="/stepone" className={`navButton ${selection3 ? 'isSelected' : ''}`} onClick={button3Selected}>
          {/*New recipes*/}
          <div>
          {
              selection3 ? <img alt ="New Recipe Selected" src = "NewRecipeIconSelected.svg"></img> 
              : <img alt ="New Recipe" src = "NewRecipeIcon.svg"></img>
            }
      </div>
        </Link>
      </div>
    </header>

  );

}

function App() {

  const [recipeList, setRecipeList] = useState([]);
  const [temporaryValues, setTemporaryValues] = useState();  

  //callback functions 
  function addRecipe(newRecipe) {
    setRecipeList(recipeList.push(newRecipe));
    setRecipeList(recipeList);
    console.log(recipeList);
  }

  function storeTemporaryValues (tempArr) {
    setTemporaryValues(tempArr);
  }

  function deleteRecipe (temp) {
    setRecipeList(temp);
  }
  
 
  console.log(recipeList);
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/listOfRecipes">
            <ListOfRecipes data={recipeList} callback={deleteRecipe} />
          </Route>
          <Route path="/stepone">
            <NewRecipeStep1 data={recipeList} callback={storeTemporaryValues}/>
          </Route>
          <Route path="/steptwo/:from/:to/:name">
            <NewRecipeStep2 data={temporaryValues} callback={addRecipe}/>
          </Route>
          <Route path={"/:name"}>
            <DisplayRecipe data={recipeList} />
          </Route>
          <Route path="/">
            <QuickConvert />
          </Route>
        </Switch>
      </div>
      <NavBar/>
    </Router>
  );
}



export default App;