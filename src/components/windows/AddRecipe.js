import React, { useState } from "react";
import SmBtn from "../btn-input/SmBtn.js";
import LgBtn from "../btn-input/LgBtn.js";

const AddRecipe = (props) => {
  const { changeState, createRecipe } = props;

  const [rName, setRName] = useState({
    id: 0,
    name: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setRName((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  // const createRecipe = () => {
  //   setRName((prev) => {
  //     prev.id = items.length;
  //     return {
  //       ...prev
  //     };
  //   });

  //   items.push(rName);
  // };

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
            value={rName.name}
            onChange={handleChange}
            placeholder="Whats your recipe called?"
          />
          <label className="window__label--serving" htmlFor="servingCount">
            Amount Of Servings:
          </label>
          <input 
            id="servingCount"
            type="number" 
            className="window__input window__input--recipe-name" 
            name="servings"
            placeholder="How many servings are made?"
          />
        </div>

        {/* Next Btn */}
        <LgBtn
          btnClass="btn btn--next"
          click={() => {
            createRecipe();
            console.log(rName);
          }}
          text="Next"
        />
      </form>
    </div>
  );
};

export default AddRecipe;
