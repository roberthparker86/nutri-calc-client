import React, { useEffect, useState } from "react";
import { insertRecipe } from "../../api/index.js";
import { getIngredientTotal, getRecipeTotal } from "../../other-func/objCalc.js";
import IngredientForm from "../form/IngredientForm.js";
import template from "../../obj/ingredientTemp.js";
import { inputValidate } from "../../other-func/inputValidate.js";
import SubmitMessage from "../modal/SubmitMessage.js";

export default function AddIngredient (props) {
  const { changeUI, updateNewRecipe, newRecipe } = props;
  
  ///// Hooks /////
  const [newIngredient, setNewIngredient] = useState(template); // New ingredient
  const [list, setList] = useState([]); // Ingredient array
  const [isClicked, setClick] = useState(false); // Done btn click
  const [isUpdated, setUpdate] = useState(false); // Check if newRecipe updated
  const [postAlert, setPostAlert ] = useState({ // Post success object
    title: "",
    body: "" 
  });
  const [ open, setOpen ] = useState({
    success: false,
    error: false
  }); // Trigger alert
  // Update newIngredient
  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewIngredient((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  
  // Update ingredient array
  const updateList = (obj) => {
    setList((prev) => {
      return([...prev, obj]);
    })
  };

  ///// USE EFFECT /////
  // Prepare data for post
  useEffect(() => {
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

  // Post once isUpdated === true
  useEffect(() => {
    const postRecipe = async () => {
      return(
        (isUpdated)
          ? (insertRecipe(newRecipe)
              .then(result => {
                setPostAlert({
                  title: "Success!",
                  body: result.data.message
                });
                setOpen((prev) => {
                  return ({
                    ...prev,
                    success: true
                  });
                });
                setUpdate(false);
              })
              .catch(err => {
                setPostAlert({
                  title: "Error!",
                  body: `Failed to create recipe: ${err}`
                });
                setOpen((prev) => {
                  return ({
                    ...prev,
                    error: true
                  });
                });
                setUpdate(false);
              }))
          : null
      );
    };

    postRecipe();
  }, [ isUpdated, newRecipe, changeUI, setPostAlert, setOpen ]);
  
  ///// Component Return /////
  return (
    <div className="window window--add">
      {/* Pop-up Messages */}
      <SubmitMessage // Success Message
        isOpen={open.success}
        open={open}
        handleOpen={setOpen}
        changeUI={changeUI}
        modalClass="modal modal--success"
        btnClass="modal__button modal__button--success"
        title={postAlert.title}
        body={postAlert.body}
      />

      <SubmitMessage // Error message
        isOpen={open.error}
        open={open}
        handleOpen={setOpen}
        changeUI={changeUI}
        modalClass="modal modal--error"
        btnClass="modal__button modal__button--error"
        title={postAlert.title}
        body={postAlert.body}
      />
      
      {/* // Clost btn */}
      <div 
        className="sm-btn sm-btn--close"
        onClick={() => changeUI({ list: true })}
        type="button"
      >
        x
      </div>
      
      <IngredientForm 
        recipe={newRecipe}
        ingredient={newIngredient}
        handleChange={handleChange}
        nextBtnFunc={() => { 
            return (
              inputValidate(newIngredient.name) && inputValidate(newIngredient.calories) && inputValidate(newIngredient.quantity)
                ? ( updateList(newIngredient), setNewIngredient(template) ) 
                : ( setPostAlert({ title:"Error!", body: "You must enter an ingredient name, calorie count, and quantity."}),
                  setOpen((prev) => ({ ...prev, error: true })) )
            );
        }}
        doneBtnFunc={() => {
          return (
            inputValidate(newIngredient.name) && inputValidate(newIngredient.calories) && inputValidate(newIngredient.quantity)
            ? ( updateList(newIngredient), setNewIngredient(template), setClick(true) ) 
            : setClick(true)
          );
        }}
      />
    </div>
  );
};