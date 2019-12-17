import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import Modal from 'react-modal';

const ListOfRecipes = (props) => {

  console.log(props.data);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [openID, setOpenID] = useState();
  function openModal(event) {
    setOpenID(event.target.id);
    setIsOpen(true);
  }
  function afterOpenModal() {
    //References are synced and can be accesssed here.
  }
  function closeModal() {
  }

  return (
    <div>
      <h1 className="header">Book of Recipes</h1>
      {props.data.map(recipe =>
        <div className="recipeBlock">
          <div className="recipeElement" onClick={openModal}>
            <h1 id={recipe.id}>{recipe.name}</h1>
            <div>
              {openID == recipe.id &&
                <Modal className="descriptionModal"
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  data-target={recipe.id}
                  data={recipe}>
                  <div>
                    <h2 className="recipeTitle">{recipe.name}</h2>
                    <div className="bookOfRecipesDescription">
                      <h2>Ingredients: </h2>
                      {recipe.ingredients.map(ingredient =>
                        <div>
                          {ingredient.conversionResult}
                          {ingredient.ingredientConvertTo + " "} 
                          {ingredient.ingredientName}
                        </div>
                      )}
                      <h2 className ="descriptionHeader">Description:</h2>
                      <div>
                        <br/>
                        {recipe.description}
                      </div>
                    </div>
                  <div className="button" onClick={closeModal}>Back</div>
                  </div>
                </Modal>
              }
            </div>
          </div>
          <div className="deleteButton" id={recipe.id} onClick={deleteRecipe}>
            x
          </div>
        </div>
      )}

      {/*TEMPORARY FOR EASY STYLING*/}
      {/* 
      <div className="recipeBlock">
        <div className="recipeElement" onClick={openModal}>
          <h1>Recipe name</h1>
        </div>
        <div className="deleteButton">
          x
          </div>
        <Modal className="descriptionModal"
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          ariaHideApp={false}
          contentLabel="Example Modal">
          <div>
            <h3>NAME</h3>
            <div className = "bookOfRecipesDescription">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate libero sit amet elit vestibulum ultricies. Nunc congue commodo ante, a porta tortor rhoncus vel. Ut tellus justo, sagittis in varius eu, aliquam quis urna. Nulla ornare lorem quis urna ullamcorper, vitae dapibus tortor ultrices. Nulla non ex vitae mi tristique ornare. Integer nec tempus urna. Aliquam ut lacinia nisi. Proin at blandit dolor, sit amet faucibus quam. Praesent aliquam libero eu maximus dapibus. Etiam eleifend enim ut efficitur imperdiet.

Maecenas dapibus id enim at tristique. Vestibulum pharetra tellus non semper iaculis. Morbi mattis urna sit amet ultrices ullamcorper. Curabitur commodo urna quam, non molestie lectus finibus vitae. Pellentesque eleifend massa eget sapien tincidunt, in dictum augue ultrices. Sed gravida purus elit. Aliquam ornare nisi odio, id vehicula nulla euismod eu. Nulla malesuada magna vitae convallis dapibus. In erat libero, faucibus id pretium ut, ultrices rhoncus tellus. Integer mauris justo, elementum quis efficitur nec, interdum sed augue.

Donec iaculis diam libero, nec tempus felis lacinia et. Donec id justo eget nunc elementum dignissim. In id luctus mi, non vulputate urna. Sed et mi ac magna rutrum laoreet. Nullam sit amet orci magna. Aenean vel aliquet massa. Ut nec congue sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Donec blandit erat et tortor volutpat, vel blandit massa auctor. Aenean lacus mi, elementum vitae felis at, lobortis rutrum risus. Curabitur imperdiet libero purus, ac egestas tortor posuere quis. Mauris luctus, urna non aliquam gravida, nulla ipsum pretium erat, id rhoncus augue orci sit amet mi. Morbi quis elementum dui, a feugiat nunc. Etiam nec malesuada turpis. Curabitur scelerisque dui quis facilisis semper. Aliquam interdum congue egestas. Proin maximus felis vehicula, dignissim leo ac, lobortis mauris. Nulla placerat pulvinar ex, ut sagittis arcu venenatis vel. Quisque lobortis et ipsum non imperdiet. Quisque at lacus sed mauris pharetra pellentesque. Donec quis justo vehicula urna sagittis tincidunt. Phasellus facilisis tellus at ipsum placerat placerat.

Vestibulum eu est purus. Nullam condimentum dui scelerisque lacus congue, et malesuada odio fringilla. Donec suscipit magna ac ligula pulvinar, ut commodo tortor rhoncus. Duis dictum malesuada quam, eget lacinia ligula lacinia ullamcorper. Sed consectetur leo urna, vitae ullamcorper ante rutrum venenatis. In eu nibh molestie, pretium tortor eu, eleifend purus. Phasellus at blandit dolor. Maecenas auctor nisi id aliquam bibendum.
            </div>
            <div onClick={closeModal} className="button" >Back</div>
          </div>
        </Modal>
      </div>
        */}
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