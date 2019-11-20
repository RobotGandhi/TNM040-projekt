import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';

let a = null;
let b = null;
 
function App() {


  return (
    <div className="App">
      <Router>
        <Switch>
          {/**/}
          <Route path="/steptwo"><NewRecipeStep2/> </Route>
          <Route path="/"><NewRecipeStep1/>
          </Route>
        </Switch>
      </Router>

    </div>

  );
}
function NewRecipeStep2(){
  console.log("hejsansasan");
  const [howManyIngredients, setHowManyIngredients ] = useState(1);

  let ingredientsarray=[];/*
  let temp= [];
  ingredientsarray.push(" ");
 
*/
for( let i = 0; i < howManyIngredients; i++ ){

ingredientsarray.push(" ");
}
let temp = ingredientsarray.map((x,idx) => <Ingredient key = {idx}/> );

 
   
  return(
    <div className = "main">
      <Textfieldrecipe/>

      {temp}
      
    

      <div className = "knapp"> Save </div>
      <div onClick = {() => setHowManyIngredients(howManyIngredients + 1)} className = "knapp"> Add </div> 
    </div>
    );
}
function NewRecipeStep1(){

  return(

    <div>
    <div className = "main">
<Textfieldrecipe/>
<p> From </p> <div className = "knapp"> System </div>
   <p> To </p> <div className = "knapp"> System </div>
   <Link to="/steptwo" ><div className = "knapp">   Create </div></Link>   </div>

</div>
    )
}



function Ingredient(){
 
  return(

  
            
    <div className="ingredientBox">
    <Textfieldingredient/>
    <div className = "knapp"> System </div>
    <div className = "knapp"> System </div>
    </div>
    )

}




function Textfieldingredient() {
if(b == null){
    b = "Name of ingredient";
}
return(
<input type="text" id="namnge" placeholder={b} onChange={changeInput2} />
)
}
function Textfieldrecipe() {
if(a == null){
    a = "Name of recipe";
}



  return(
    
   <input type="text" id="namnge" placeholder={a} onChange={changeInput} />
   
 
    )
}

function changeInput(event){
a = event.target.value;

}
function changeInput2(event){
b = event.target.value;

}

export default App;
