import React, { useState, useEffect } from "react";
import ListItem from "../btn-input/ListItem.js";
import SmBtn from "../btn-input/SmBtn.js";
import { getAllRecipes } from '../../api/index.js';

const RecipeList = (props) => {
  const { changeState } = props;
  const [list, handleList ] = useState([]);

  useEffect(() => {
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
      <SmBtn
        class="sm-btn sm-btn--add"
        click={() => changeState({ addRec: true })}
        text="+"
      />
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

export default RecipeList;