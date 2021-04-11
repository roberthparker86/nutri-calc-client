import React, { useState } from "react";
import "./style/styles.css";
import Header from "./partials/Header.js";
import RecipeList from "./components/uis/RecipeList.js";
import Footer from "./partials/Footer.js";
import AddRecipe from "./components/uis/AddRecipe.js";
import RecipeInfo from "./components/uis/RecipeInfo.js";
import AddIngredient from "./components/uis/AddIngredient.js";
import Edit from "./components/uis/Edit.js";

export default function App() {
  ///// UI /////
  const defaultUi = {
    list: false,    // RecipeList.js
    addRec: false,  // AddRecipe.js
    addIngr: false, // AddIngredient.js
    edit: false,    // Edit.js
    info: {         // RecipeInfo.js
      show: false,
      id: ""
    }
  }; 

  const [ui, handleUI] = useState({
    ...defaultUi,
    list: true
  });

  const changeUI = (val) => {
    // Pass key:value pair to change ui to render
    handleUI({
      // apply reset - overwrite passed value w/ true
      ...defaultUi,
      ...val
    });
  };

  ///// NEW RECIPE /////
  const [newRecipe, handleNewRecipe] = useState({ });

  const updateNewRecipe = (obj) => {
    const newObj = obj;
    handleNewRecipe((prev) => {
      return({
        ...prev,
        ...newObj
      });
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="main">
        <h3>Home recipe nutrition, without the guesswork.</h3>

        {/* UI w/ true value will render */}
        {ui.info.show === true ? (
          <RecipeInfo changeState={changeUI} currentId={ui.info.id} />
        ) : ui.edit === true ? (
          <Edit changeState={changeUI} currentId={ui.info.id} />
        ) : ui.addRec === true ? ( 
          <AddRecipe changeState={changeUI} updateNewRecipe={updateNewRecipe} />
        ) : ui.addIngr === true ? (
          <AddIngredient changeState={changeUI} updateNewRecipe={updateNewRecipe} newRecipe={newRecipe} />
        ) : (
          <RecipeList changeState={changeUI} />
        )}
      </div>
      <Footer />
    </div>
  );
}