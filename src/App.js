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

  // New recipe state
  const [newRecipe, handleNewRecipe] = useState({});

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

        {/* Window w/ true value will render */}
        {window.info.show === true ? (
          <RecipeInfo changeState={changeWindow} curId={window.info.id} />
        ) : window.addRec === true ? (
          <AddRecipe changeState={changeWindow} createRecipe={updateNewRecipe} />
        ) : window.addIngr === true ? (
          <AddIngredient changeState={changeWindow} createRecipe={updateNewRecipe} newRecipe={newRecipe} />
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
// DONE --- Create state object for new recipe 
// DONE --- Create function to be passed to add recipe window to update new recipe state
// Create state object for new ingredient
// Create function to add new ingredient to new recipe state
// Create function to get total value of a specific property
// Create function that takes property total and updates new recipe state
// Create function for POST operations to add new recipe object to DB
// Reset newRecipe object after 
// Refactor code
