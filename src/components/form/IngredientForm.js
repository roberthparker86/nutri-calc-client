import React from "react";
import Input from "../btn-input/Input.js";
import LgBtn from "../btn-input/LgBtn.js";

const IngredientForm = (props) => {
    const { newRecipe, newIngredient, handleChange, updateList, setNewIngredient, setClick, template } = props;

    return(
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

          {/* FIRST COLUMN */}
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

          {/* SECOND COLUMN */}
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
            setNewIngredient(template);
          }}
          text="Next"
        />

        <hr className="window__hr--add-bot" />
        {/* Done Btn */}
        <LgBtn
          btnClass="btn btn--done"
          click={ () => {
            updateList(newIngredient);
            setNewIngredient(template);
            setClick(true);
          } }
          text="Done"
        />
      </form>
    );
};

export default IngredientForm;