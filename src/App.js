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
    list: true,     // Recipe list
    addRec: false,  // Add recipe
    addIngr: false, // Add ingredient
    info: {         // Recipe Info
      show: false,
      id: ""
    }
  });

  const changeWindow = (val) => {
    // Pass key:value pair to change window to render
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
    handleWindow({
      // apply reset - overwrite passed value w/ true
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
// DONE --- Refactor current code
// DONE --- Create new object in test.json when next btn clicked in AddRecipe.js
// DONE --- Set up app locally - connect to Nodejs, express, & MongoDB
// DONE --- Populate recipe list based on MongoDB entries
// DONE --- Fix data fetching so that React doesn't produce errors
// Save new object to MongoDB
// Save new ingredient data to new MongoDB object
