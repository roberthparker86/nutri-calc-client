import React, { useState } from "react";
import SmBtn from "../btn-input/SmBtn.js";
import LgBtn from "../btn-input/LgBtn.js";

const AddRecipe = (props) => {
  const { changeState, createRecipe } = props;

  const [newValue, setNewValue] = useState({
    name: "",
    servings: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewValue((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  return (
    <div className="window window--add">
      {/* Close btn */}
      <SmBtn
        class="sm-btn sm-btn--close"
        click={() => {
          changeState({ list: true });
        }}
        text="x"
      />

      <form>
        <div className="window__input-container">
          <label className="window__label--name" htmlFor="recipeName">
            Recipe Name:
          </label>
          <input
            id="recipeName"
            className="window__input window__input--recipe-name"
            name="name"
            value={newValue.name}
            onChange={handleChange}
            placeholder="Whats your recipe called?"
          />
          <label className="window__label--serving" htmlFor="servingCount">
            # Of Servings:
          </label>
          <input 
            id="servingCount"
            type="number" 
            className="window__input window__input--recipe-serving" 
            name="servings"
            value={newValue.servings}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        {/* Next Btn */}
        <LgBtn
          btnClass="btn btn--next"
          click={() => {
            createRecipe(newValue);
            changeState({ addIngr: true });
          }}
          text="Next"
        />
      </form>
    </div>
  );
};

export default AddRecipe;
