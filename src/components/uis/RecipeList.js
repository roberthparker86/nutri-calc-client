import React, { useState, useEffect } from "react";
import ListItem from "../btn-input/ListItem.js";
import SmBtn from "../btn-input/SmBtn.js";
import { getAllRecipes } from '../../api/index.js';

export default function RecipeList(props) {
  ///// HOOK /////
  const [list, handleList ] = useState([]);

  ///// DESTRUCTURING ASSIGNMENT /////
  const { changeState } = props;

  ///// USE EFFECT /////
  useEffect(() => {
    // Get list of recipes from DB.
    const fetchList = async () => {
      const result = await getAllRecipes();

      handleList(result.data.data);
    };

    fetchList();
  }, []);
    
  return (
    <div className="window window--list">
      <h3>Recipes</h3>
      <hr />
      {/* Close Btn */}
      <SmBtn
        class="sm-btn sm-btn--add"
        click={() => changeState({ addRec: true })}
        text="+"
      />

      {/* Render list of recipes */}
      <div className="window__container">
      {list.map((recipe, index) => {
        return(
          <ListItem 
            key={recipe._id}
            id={recipe._id}
            type="button"
            changeState={changeState}
            className="window__item"
            recipeName={recipe.name}
            calCount={`${recipe.calories} Cal`}
            index={index}
            value={recipe}
          />
        );
      })}
      </div>
    </div>
  );
};