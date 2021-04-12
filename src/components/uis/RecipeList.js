import React, { useState, useEffect } from "react";
import ListItem from "../btn-input/ListItem.js";
import SmBtn from "../btn-input/SmBtn.js";
import { getAllRecipes } from '../../api/index.js';
import ResponseAlert from "../ResponseAlert.js";

export default function RecipeList(props) {
  ///// HOOK /////
  const [list, handleList ] = useState([]); // List of recipes
  const [ open, setOpen ] = useState(false); // Trigger ResponseAlert opening
  const [alertMessage, setAlertMessage ] = useState({ // ResponseAlert message object
    severity: "",
    title: "",
    message: ""
  })

  ///// DESTRUCTURING ASSIGNMENT /////
  const { changeState } = props;

  // Close Alert window then change UI
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

    setOpen(false);
    changeState({ list: true });
  };

  ///// USE EFFECT /////
  useEffect(() => {
    // Get list of recipes from DB.
    const fetchList = async () => {
      const result = await getAllRecipes()
        .catch(err => {
          setAlertMessage({
            severity: "error",
            title: "Error",
            message: `Faile to get recipes: ${err}`
          });
          setOpen(true);
        });

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

      {/* API ops response message */}
      <ResponseAlert open={open} handleClose={handleClose} alert={alertMessage} />

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