import React from "react";
import Input from "../btn-input/Input.js";
import LgBtn from "../btn-input/LgBtn.js";

const AddIngredient = (props) => {
  const { changeState } = props;
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
            Recipe Name Here
          </h3>
        </div>

        <hr className="window__hr--add-top" />
        <div className="window__container--add">
          <div className="window__input-container">
            {/* Ingredient name input */}
            <input
              className="window__input window__input--recipe-name"
              id="recipeName"
              placeholder="What's the ingredient name?"
            ></input>
          </div>
          <div className="window__col window__col--centered">
            {/* Cal Field */}
            <Input
              id="calInput"
              label="Calories:"
              spanID="calInputInline"
              unit="g"
            />

            {/* Protein Field */}
            <Input
              id="proteinInput"
              label="Protein:"
              spanID="proteinInputInline"
              unit="g"
            />

            {/* Total Fat Field */}
            <Input
              id="totalFatInput"
              label="Total Fat:"
              spanID="totalFatInputInline"
              unit="g"
            />

            {/* Sat Fat Field */}
            <Input
              id="satFatInput"
              label="Saturated Fat:"
              spanID="satFatInputInline"
              unit="g"
            />

            {/* Unsat Fat Field */}
            <Input
              id="unatFatInput"
              label="Unsaturated Fat:"
              spanID="unatFatInput"
              unit="g"
            />

            {/* Cholesterol Field */}
            <Input
              id="cholesterolInput"
              label="Cholesterol:"
              spanID="cholesterolInputInline"
              unit="mg"
            />
          </div>

          <div className="window__col window__col--centered">
            {/* Carbohydrates Field */}
            <Input
              id="carbInput"
              label="Carbohydrates:"
              spanID="carbInputInline"
              unit="g"
            />

            {/* Fiber Field */}
            <Input
              id="fiberInput"
              label="Fiber:"
              spanID="fiberInputInline"
              unit="g"
            />

            {/* Sugars Field */}
            <Input
              id="sugarInput"
              label="Sugar:"
              spanID="sugarInputInline"
              unit="g"
            />

            {/* Sodium Field */}
            <Input
              id="sodiumInput"
              label="Sodium:"
              spanID="sodiumInputInline"
              unit="mg"
            />

            {/* Potassium Field */}
            <Input
              id="potassiumInput"
              label="Potassium:"
              spanID="potassiumInputInline"
              unit="mg"
            />

            {/* Quantity Field */}
            <Input
              id="quantityInput"
              label="Quantity:"
              spanID="quantityInputInline"
              unit=""
            />
          </div>
        </div>
        <LgBtn
          type="button"
          class="btn btn--next"
          click={() => changeState({ addIngr: true })}
          text="Next"
        />

        <hr className="window__hr--add-bot" />
        <LgBtn
          btnClass="btn btn--done"
          click={() => {
            changeState({ list: true });
          }}
          text="Done"
        />
      </form>
    </div>
  );
};

export default AddIngredient;
