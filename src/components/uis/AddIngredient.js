import React, { useEffect, useState } from "react";
import { insertRecipe } from "../../api/index.js";
import { getIngredientTotal, getRecipeTotal } from "../../large_func/obj_calc.js";
import IngredientForm from "../form/IngredientForm.js";

const AddIngredient = (props) => {
  const { changeState, updateNewRecipe, newRecipe } = props;
  const template = { // Ingredient obj template
    name: "",
    calories: "",
    protein: "",
    totFat: "",
    satFat: "",
    unsatFat: "",
    carbs: "",
    fiber: "",
    sugar: "",
    sodium: "",
    chol: "",
    potas: "",
    quantity: ""
  };
  
  ///// Hooks /////
  const [newIngredient, setNewIngredient] = useState(template); // New ingredient Hook
  const [list, setList] = useState([]); // Ingredient array hook
  const [isClicked, setClick] = useState(false); // Done btn click hook
  const [isUpdated, setUpdate] = useState(false); // Upated hook
  
  ///// Hook handlers /////
  const handleChange = (event) => {
    // Update newIngredient
    const { name, value } = event.target;

    setNewIngredient((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  
  const updateList = (obj) => {
    // Update ingredient array
    setList((prev) => {
      return([...prev, obj]);
    })
  };

  ///// USE EFFECT /////
  useEffect(() => {
    // Prepare data for post
    const mergeRecipe = () => {
      const ingredientTotal = getIngredientTotal(list);
      const recipeTotal = getRecipeTotal(ingredientTotal, newRecipe.servings);
  
      updateNewRecipe({
        ...recipeTotal,
        ingredients: list
      });
      setClick(false);
      setUpdate(true);
    };

    return( (isClicked) ? mergeRecipe(): null );
  },[isClicked, newRecipe, list, updateNewRecipe]);

  useEffect(() => {
    // Post once isUpdated is true
    return((isUpdated) ? (insertRecipe(newRecipe), setUpdate(false), changeState({ list: true })): null );
  }, [ isUpdated, newRecipe, changeState ]);
  
  ///// Component Return /////
  return (
    <div className="window window--add">
      <div // Clost btn
        className="sm-btn sm-btn--close"
        onClick={() => changeState({ list: true })}
        type="button"
      >
        x
      </div>
      <IngredientForm 
        newRecipe={newRecipe}
        newIngredient={newIngredient}
        handleChange={handleChange}
        updateList={updateList}
        setNewIngredient={setNewIngredient}
        setClick={setClick}
        template={template}
      />
    </div>
  );
};

export default AddIngredient;