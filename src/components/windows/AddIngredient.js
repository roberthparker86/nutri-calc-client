import React, { useEffect, useState } from "react";
import Input from "../btn-input/Input.js";
import LgBtn from "../btn-input/LgBtn.js";
import { insertRecipe } from "../../api/index.js";

const AddIngredient = (props) => {
  const { changeState, createRecipe, newRecipe } = props;

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

  // Multiply obj property values by quantity vlaue
  const multObjValues = (obj) => {
    const { calories, protein, totFat, satFat, unsatFat, carbs, fiber, sugar, sodium, chol, potas, quantity } = obj;
    return({
      calories: (calories * quantity),
      protein: (protein * quantity),
      totFat: (totFat * quantity),
      satFat: (satFat * quantity),
      unsatFat: (unsatFat * quantity),
      carbs: (carbs * quantity),
      fiber: (fiber * quantity),
      sugar: (sugar * quantity),
      sodium: (sodium * quantity),
      chol: (chol * quantity),
      potas: (potas * quantity),
    });
  };

  // Return a sum from specified key/values from arr of obj's
  const getKeyTotal = (key, arr) => {
    const tempList = arr.map((obj) => {
      return (obj[key]);
    });
    
    return tempList.reduce((a, b) => a + b);
  };

  // Return single obj from arr of obj's with sum of values as properties
  const getIngredientTotal = (arr) => {
    const tempList = arr.map((obj) => {
      return (multObjValues(obj));
    });
    
    return({
      calories: getKeyTotal("calories", tempList),
      protein: getKeyTotal("protein", tempList),
      totFat: getKeyTotal("totFat", tempList),
      satFat: getKeyTotal("satFat", tempList),
      unsatFat: getKeyTotal("unsatFat", tempList),
      carbs: getKeyTotal("carbs", tempList),
      fiber: getKeyTotal("fiber", tempList),
      sugar: getKeyTotal("sugar", tempList),
      sodium: getKeyTotal("sodium", tempList),
      chol: getKeyTotal("chol", tempList),
      potas: getKeyTotal("potas", tempList)
    });
  };

  const getRecipeTotal = (obj, serv) => {
    return ({
      calories: Math.round((obj.calories / serv) * 10) / 10,
      protein: Math.round((obj.protein / serv) * 10) / 10,
      totFat: Math.round((obj.totFat / serv) * 10) / 10,
      satFat: Math.round((obj.satFat / serv) * 10) / 10,
      unsatFat: Math.round((obj.unsatFat / serv) * 10) / 10,
      carbs: Math.round((obj.carbs / serv) * 10) / 10,
      fiber: Math.round((obj.fiber / serv) * 10) / 10,
      sugar: Math.round((obj.sugar / serv) * 10) / 10,
      sodium: Math.round((obj.sodium / serv) * 10) / 10,
      chol: Math.round((obj.chol / serv) * 10) / 10,
      potas: Math.round((obj.potas / serv) * 10) / 10
    });
  };

  useEffect(() => {
    return ((isClicked === true) 
      ? console.log(getRecipeTotal(getIngredientTotal(list), newRecipe.servings))
      : null);
  }, [isClicked]);

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
