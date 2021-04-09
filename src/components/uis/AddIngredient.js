import React, { useEffect, useState } from "react";
import { insertRecipe } from "../../api/index.js";
import { getIngredientTotal, getRecipeTotal } from "../../large_func/obj_calc.js";
import IngredientForm from "../form/IngredientForm.js";
import template from "../../obj/ingredientTemp.js";

export default function AddIngredient (props) {
  const { changeState, updateNewRecipe, newRecipe } = props;
  
  ///// Hooks /////
  const [newIngredient, setNewIngredient] = useState(template); // New ingredient
  const [list, setList] = useState([]); // Ingredient array
  const [isClicked, setClick] = useState(false); // Done btn click
  const [isUpdated, setUpdate] = useState(false); // Check if newRecipe updated
  
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
    // Post once isUpdated === true
    const postRecipe = async () => {
      return(
        (isUpdated)
          ? (insertRecipe(newRecipe)
              .then(result => {
                console.log(result);
                setUpdate(false);
                changeState({ list: true });
              }))
          : null
      );
    };

    postRecipe();
  }, [ isUpdated, newRecipe, changeState ]);
  
  ///// Component Return /////
  return (
    <div className="window window--add">
      {/* // Clost btn */}
      <div 
        className="sm-btn sm-btn--close"
        onClick={() => changeState({ list: true })}
        type="button"
      >
        x
      </div>
      
      <IngredientForm 
        recipe={newRecipe}
        ingredient={newIngredient}
        handleChange={handleChange}
        nextBtnFunc={() => { 
            updateList(newIngredient);
            setNewIngredient(template);
          }}
        doneBtnFunc={() => {
            updateList(newIngredient);
            setNewIngredient(template);
            setClick(true);
          }}
      />
    </div>
  );
};