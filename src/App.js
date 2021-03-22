import React, { useState } from "react";
import "./style/styles.css";
import Header from "./components/Header.js";
import RecipeList from "./components/windows/RecipeList.js";
import Footer from "./components/Footer.js";
import AddRecipe from "./components/windows/AddRecipe.js";
import RecipeInfo from "./components/windows/RecipeInfo.js";
import AddIngredient from "./components/windows/AddIngredient.js";

export default function App() {
  // Window State
  const [window, handleWindow] = useState({
    list: true, // Recipe list
    addRec: false, // Add recipe
    addIngr: false, // Add ingredient
    info: {
      show: false,
      id: ""
    }
  });

  

  const changeWindow = (val) => {
    // Changes window state - pass key: value for desired window to render
    const reset = {
      // Temp object used to reset state values to false
      list: false,
      addRec: false,
      addIngr: false,
      info: {
        show: false,
        id: ""
      }
    };
    handleWindow({
      // apply window state reset - overwrite passed value w/ true
      ...reset,
      ...val
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="main">
        <h3>Home recipe nutrition, without the guesswork.</h3>

        {/* Window w/ true value will render */}
        {window.info.show === true ? (
          <RecipeInfo changeState={changeWindow} curId={window.info.id} />
        ) : window.addRec === true ? (
          <AddRecipe changeState={changeWindow} />
        ) : window.addIngr === true ? (
          <AddIngredient changeState={changeWindow} />
        ) : (
          <RecipeList changeState={changeWindow} />
        )}
      </div>
      <Footer />
    </div>
  );
}

///// CURRENT TASKS /////
// 1) DONE --- Refactor current code
// 2) DONE --- Create new object in test.json when next btn clicked in AddRecipe.js
// 3) Set up app locally - connect to Nodejs, express, & MongoDB
// 4) Populate recipe list based on MongoDB entries
// 5) Save new object to MongoDB
// 6) Save new ingredient data to new MongoDB object
