import React, { useState } from "react";
import SmBtn from "../btn-input/SmBtn.js";
import LgBtn from "../btn-input/LgBtn.js";
import { inputValidate } from "../../other-func/inputValidate.js";
import GeneralMessage from "../modal/GeneralMessage.js";

export default function AddRecipe (props) {
  // changeUI for UI state, updateNewRecipe for newRecipe obj state
  const { changeUI, updateNewRecipe } = props;

  // hook for controlling storing updating input
  const [newValue, setNewValue] = useState({
    name: "",
    servings: ""
  });
  const [ open, setOpen ] = useState(false);

  const handleChange = (event) => {
    // function to update inputs
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
      <GeneralMessage // Error message
        isOpen={open}
        handleOpen={setOpen}
        modalClass="modal modal--error"
        btnClass="modal__button modal__button--error"
        title="Error"
        body="You must enter a recipe name and serving amount."
      />

      {/* Close btn */}
      <SmBtn
        class="sm-btn sm-btn--close"
        click={() => {
          changeUI({ list: true });
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
            return (
              inputValidate(newValue.name) && inputValidate(newValue.servings)
                ? ( updateNewRecipe(newValue), changeUI({ addIngr: true }) )
                : setOpen(true)
            );            
          }}
          text="Next"
        />
      </form>
    </div>
  );
};
