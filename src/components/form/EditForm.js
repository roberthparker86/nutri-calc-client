import React from "react";
import Input from "../btn-input/Input.js";
import LgBtn from "../btn-input/LgBtn.js";
import { selectText } from "../../other-func/selectText.js";

export default function EditForm (props) {
    const { recipe, ingredient, handleChange, nextBtnFunc, doneBtnFunc, newIngredientList } = props;

    return(
        <form id="ingredienInfo">
        <div className="window__input-container">
          <h3 className="window__label--name" htmlFor="recipeName">
            {recipe.name || ""}
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
              value={ingredient.name || 0}
              onChange={handleChange}
              onFocus={selectText}
              placeholder="What's the ingredient name?"
            ></input>
          </div>

          {/* FIRST COLUMN */}
          <div className="window__col window__col--centered">
            {/* Calories Field */}
            <Input
              id="calInput"
              name="calories"
              value={ingredient.calories || 0}
              update={handleChange}
              label="Calories:"
              spanID="calInputInline"
              unit="g"
            />

            {/* Protein Field */}
            <Input
              id="proteinInput"
              name="protein"
              value={ingredient.protein || 0}
              update={handleChange}
              label="Protein:"
              spanID="proteinInputInline"
              unit="g"
            />

            {/* Total Fat Field */}
            <Input
              id="totalFatInput"
              name="totFat"
              value={ingredient.totFat || 0}
              update={handleChange}
              label="Total Fat:"
              spanID="totalFatInputInline"
              unit="g"
            />

            {/* Sat Fat Field */}
            <Input
              id="satFatInput"
              name="satFat"
              value={ingredient.satFat || 0}
              update={handleChange}
              label="Saturated Fat:"
              spanID="satFatInputInline"
              unit="g"
            />

            {/* Unsat Fat Field */}
            <Input
              id="unatFatInput"
              name="unsatFat"
              value={ingredient.unsatFat || 0}
              update={handleChange}
              label="Unsaturated Fat:"
              spanID="unatFatInput"
              unit="g"
            />

            {/* Carbohydrates Field */}
            <Input
              id="carbInput"
              name="carbs"
              value={ingredient.carbs || 0}
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
              value={ingredient.fiber || 0}
              update={handleChange}
              label="Fiber:"
              spanID="fiberInputInline"
              unit="g"
            />

            {/* Sugars Field */}
            <Input
              id="sugarInput"
              name="sugar"
              value={ingredient.sugar || 0}
              update={handleChange}
              label="Sugar:"
              spanID="sugarInputInline"
              unit="g"
            />

            {/* Sodium Field */}
            <Input
              id="sodiumInput"
              name="sodium"
              value={ingredient.sodium || 0}
              update={handleChange}
              label="Sodium:"
              spanID="sodiumInputInline"
              unit="mg"
            />

            {/* Cholesterol Field */}
            <Input
              id="cholesterolInput"
              name="chol"
              value={ingredient.chol || 0}
              update={handleChange}
              label="Cholesterol:"
              spanID="cholesterolInputInline"
              unit="mg"
            />

            {/* Potassium Field */}
            <Input
              id="potassiumInput"
              name="potas"
              value={ingredient.potas || 0}
              update={handleChange}
              label="Potassium:"
              spanID="potassiumInputInline"
              unit="mg"
            />

            {/* Quantity Field */}
            <Input
              id="quantityInput"
              name="quantity"
              value={ingredient.quantity || 0}
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
          btnClass="btn btn--left"
          click={nextBtnFunc}
          text="Next"
        />

        <hr className="window__hr--add-bot" />
        {/* Done Btn */}
        { (recipe.ingredients !== undefined)
            ? (recipe.ingredients.length === newIngredientList.length)
                ? (<LgBtn
                btnClass="btn btn--right"
                click={doneBtnFunc}
                text="Done"
                />)
                : null
            : null }
        
      </form>
    );
};