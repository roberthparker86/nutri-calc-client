import React, { useState } from "react";
import SmBtn from "../btn-input/SmBtn.js";
import LgBtn from "../btn-input/LgBtn.js";

export default function AddRecipe (props) {
  // changeState for UI state, updateNewRecipe for newRecipe obj state
  const { changeState, updateNewRecipe } = props;

  // hook for controlling storing updating input
  const [newValue, setNewValue] = useState({
    name: "",
    servings: ""
  });
  // function to update inputs
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
          btnClass="btn btn--left"
          click={() => {
            updateNewRecipe(newValue);
            changeState({ addIngr: true });
          }}
          text="Next"
        />
      </form>
    </div>
  );
};
