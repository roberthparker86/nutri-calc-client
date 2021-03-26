import React, { useState } from "react";
import "./style/styles.css";
import Header from "./components/Header.js";
import RecipeList from "./components/uis/RecipeList.js";
import Footer from "./components/Footer.js";
import AddRecipe from "./components/uis/AddRecipe.js";
import RecipeInfo from "./components/uis/RecipeInfo.js";
import AddIngredient from "./components/uis/AddIngredient.js";

export default function App() {
  // UI Hook
  const [ui, handleUI] = useState({
    list: true,     // Recipe list
    addRec: false,  // Add recipe
    addIngr: false, // Add ingredient
    info: {         // Recipe Info
      show: false,
      id: ""
    }
  });

  const changeUI = (val) => {
    // Pass key:value pair to change ui to render
    const reset = {
      // Temp object used to reset values
      list: false,
      addRec: false,
      addIngr: false,
      info: {
        show: false,
        id: ""
      }
    };
    handleUI({
      // apply reset - overwrite passed value w/ true
      ...reset,
      ...val
    });
  };

  // New recipe Hook
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
          <RecipeInfo changeState={changeUI} curId={ui.info.id} />
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

///// CURRENT TASKS /////
// Refactor code
