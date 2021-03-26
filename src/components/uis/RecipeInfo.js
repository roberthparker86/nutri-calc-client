import React, { useState, useEffect } from "react";
import InfoField from "../btn-input/InfoField.js";
import SmBtn from "../btn-input/SmBtn.js";
import LgBtn from "../btn-input/LgBtn.js";
import { getRecipeById } from '../../api/index.js';

const RecipeInfo = (props) => {
  const { changeState } = props;

  // Active Recipe State
  const [recipe, handleRecipe] = useState({});
  const { name, calories, protein, totFat, satFat, unsatFat, carbs, fiber, sugar, sodium, chol, potas } = recipe;

  useEffect(() => {
    const fetchRecipe = async () => {
      const result = await getRecipeById(props.curId);

      handleRecipe(result.data.data);
    };

    fetchRecipe();
  }, [props.curId]);

  return (
    <div className="window">
      <h3>{name}</h3>
      {/* Close Btn */}
      <SmBtn
        class="sm-btn sm-btn--close"
        click={() => {
          changeState({ list: true });
        }}
        text="x"
      />
      <hr />
      {/* Display recipe stats */}
      <div className="window__container window__container--recipe-info">
        <div className="window__col window__col--left">
          <InfoField name="Calories:" value={calories} unit="g" />
          <InfoField name="Protein:" value={protein} unit="g" />
          <InfoField name="Total Fat:" value={totFat} unit="g" />
          <InfoField name="Saturated Fat:" value={satFat} unit="g" />
          <InfoField name="Unsaturated Fat:" value={unsatFat} unit="g" />
          <InfoField name="Cholesterol:" value={chol} unit="mg" />
        </div>
        <div className="window__col">
          <InfoField name="Carbohydrates" value={carbs} unit="g" />
          <InfoField name="Fiber:" value={fiber} unit="g" />
          <InfoField name="Sugar:" value={sugar} unit="g" />
          <InfoField name="Sodium:" value={sodium} unit="mg" />
          <InfoField name="Potassium:" value={potas} unit="mg" />
        </div>
      </div>

      {/* Edit Btn */}
      <LgBtn btnClass="btn btn--edit" click={changeState} text="Edit" />
    </div>
  );
};

export default RecipeInfo;
