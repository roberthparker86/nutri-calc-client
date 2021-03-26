import React, { useEffect, useState } from "react";
import Input from "../btn-input/Input.js";
import LgBtn from "../btn-input/LgBtn.js";
import { insertRecipe } from "../../api/index.js";
import { getIngredientTotal, getRecipeTotal } from "../../large_func/obj_calc.js";

const AddIngredient = (props) => {
  const { changeState, updateNewRecipe, newRecipe } = props;

  // New ingredient Hook
  const [newIngredient, setNewIngredient] = useState({
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
  });
  // Ingredient list hook
  const [list, setList] = useState([]);
  // Done btn click hook
  const [isClicked, setClick] = useState(false);
  const [isUpdated, setUpdate] = useState(false);

  // Update newIngredient state
  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewIngredient((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  // Update list state
  const updateList = (obj) => {
    const newObj = obj;

    setList((prev) => {
      return([...prev, newObj]);
    })
  };

  useEffect(() => {
    // Final merge of recipe obj before post
    const mergeRecipe = () => {
    const ingredientTotal = getIngredientTotal(list);
    const recipeTotal = getRecipeTotal(ingredientTotal, newRecipe.servings);

    updateNewRecipe(recipeTotal);
    setClick(false);
    setUpdate(true);
  };

    return ((isClicked === true) 
      ? mergeRecipe()
      : null);
  }, [isClicked, newRecipe, updateNewRecipe, list]);
  
  // State is updated after newRecipe. If true send POST request to add recipe to DB.
  if (isUpdated) {
    insertRecipe(newRecipe).then(result => console.log(result.data.message));
    setUpdate(false);
    changeState({ list: true });
  }
  
  return (
    <div className="window window--add">
      <div // Clost btn
        className="sm-btn sm-btn--close"
        onClick={() => changeState({ list: true })}
        type="button"
      >
        x
      </div>
      <form id="ingredienInfo">
        <div className="window__input-container">
          <h3 className="window__label--name" htmlFor="recipeName">
            {newRecipe.name}
          </h3>
        </div>

        <hr className="window__hr--add-top" />
        <div className="window__container--add">
          <div className="window__input-container">
            {/* Ingredient name input */}
            <input
              className="window__input window__input--recipe-name"
              id="ingredientName"
              name="name"
              value={newIngredient.name}
              onChange={handleChange}
              placeholder="What's the ingredient name?"
            ></input>
          </div>
          <div className="window__col window__col--centered">
            {/* Calories Field */}
            <Input
              id="calInput"
              name="calories"
              value={newIngredient.calories}
              update={handleChange}
              label="Calories:"
              spanID="calInputInline"
              unit="g"
            />

            {/* Protein Field */}
            <Input
              id="proteinInput"
              name="protein"
              value={newIngredient.protein}
              update={handleChange}
              label="Protein:"
              spanID="proteinInputInline"
              unit="g"
            />

            {/* Total Fat Field */}
            <Input
              id="totalFatInput"
              name="totFat"
              value={newIngredient.totFat}
              update={handleChange}
              label="Total Fat:"
              spanID="totalFatInputInline"
              unit="g"
            />

            {/* Sat Fat Field */}
            <Input
              id="satFatInput"
              name="satFat"
              value={newIngredient.satFat}
              update={handleChange}
              label="Saturated Fat:"
              spanID="satFatInputInline"
              unit="g"
            />

            {/* Unsat Fat Field */}
            <Input
              id="unatFatInput"
              name="unsatFat"
              value={newIngredient.unsatFat}
              update={handleChange}
              label="Unsaturated Fat:"
              spanID="unatFatInput"
              unit="g"
            />

            {/* Carbohydrates Field */}
            <Input
              id="carbInput"
              name="carbs"
              value={newIngredient.carbs}
              update={handleChange}
              label="Carbohydrates:"
              spanID="carbInputInline"
              unit="g"
            />

            
          </div>

          <div className="window__col window__col--centered">
            {/* Fiber Field */}
            <Input
              id="fiberInput"
              name="fiber"
              value={newIngredient.fiber}
              update={handleChange}
              label="Fiber:"
              spanID="fiberInputInline"
              unit="g"
            />

            {/* Sugars Field */}
            <Input
              id="sugarInput"
              name="sugar"
              value={newIngredient.sugar}
              update={handleChange}
              label="Sugar:"
              spanID="sugarInputInline"
              unit="g"
            />

            {/* Sodium Field */}
            <Input
              id="sodiumInput"
              name="sodium"
              value={newIngredient.sodium}
              update={handleChange}
              label="Sodium:"
              spanID="sodiumInputInline"
              unit="mg"
            />

            {/* Cholesterol Field */}
            <Input
              id="cholesterolInput"
              name="chol"
              value={newIngredient.chol}
              update={handleChange}
              label="Cholesterol:"
              spanID="cholesterolInputInline"
              unit="mg"
            />

            {/* Potassium Field */}
            <Input
              id="potassiumInput"
              name="potas"
              value={newIngredient.potas}
              update={handleChange}
              label="Potassium:"
              spanID="potassiumInputInline"
              unit="mg"
            />

            {/* Quantity Field */}
            <Input
              id="quantityInput"
              name="quantity"
              value={newIngredient.quantity}
              update={handleChange}
              label="Quantity:"
              spanID="quantityInputInline"
              unit=""
            />
          </div>
        </div>
        {/* Next btn */}
        <LgBtn
          type="button"
          btnClass="btn btn--next"
          click={ () => { 
            updateList(newIngredient);

            setNewIngredient({
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
            });
          }}
          text="Next"
        />

        <hr className="window__hr--add-bot" />
        {/* Done Btn */}
        <LgBtn
          btnClass="btn btn--done"
          click={ () => {
            updateList(newIngredient);

            setNewIngredient({
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
            });

            setClick(true);
          } }
          text="Done"
        />
      </form>
    </div>
  );
};

export default AddIngredient;