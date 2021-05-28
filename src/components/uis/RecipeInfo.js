import React, { useState, useEffect } from "react";
import InfoField from "../btn-input/InfoField.js";
import SmBtn from "../btn-input/SmBtn.js";
import LgBtn from "../btn-input/LgBtn.js";
import { deleteRecipeById, getRecipeById } from '../../api/index.js';
import ResponseAlert from "../ResponseAlert.js";

export default function RecipeInfo (props) {
  ///// HOOKS /////
  const [recipe, handleRecipe] = useState({}); // Recipe to be displayed
  const [ deleteClick, setDeleteClick ] = useState(false); // Delete Btn
  const [ open, setOpen ] = useState(false); // Trigger ResponseAlert opening
  const [alertMessage, setAlertMessage ] = useState({ // ResponseAlert message object
    severity: "",
    title: "",
    message: "" 
});

  ///// DESTRUCTURING ASSIGNMENT /////
  const { name, calories, protein, totFat, satFat, unsatFat, carbs, fiber, sugar, sodium, chol, potas } = recipe;
  const { changeUI, currentId } = props;

  // Close Alert window then change UI
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

    setOpen(false);
    changeUI({ list: true });
  };

  ///// USE EFFECT /////
  // API DELETE ops
  useEffect(() => {
    const handleResponse = (obj) => {
      setAlertMessage(obj);
      setOpen(true);
    };
    return(
      (deleteClick)
        ? deleteRecipeById(currentId)
          .then( res => {
            handleResponse({
              severity: "success",
              title: "Success!",
              message: `${res.data.data.name} succesfully deleted.`
            });
          })
          .catch(err => {
            handleResponse({
              severity: "error",
              title: "Error",
              message: `Failed to delete: ${err}`
            });
          })
        : null
    );
  }, [deleteClick, changeUI, currentId]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const result = await getRecipeById(currentId)
        .catch(err => {
          setAlertMessage({
            severity: "error",
            title: "Error",
            message: `Failed to get recipe: ${err}`
          });
          setOpen(true);
        });

      handleRecipe(result.data.data);
    };

    fetchRecipe();
  }, [currentId]);

  return (
    <div className="window">
      <h3>{name}</h3>

      {/* Close Btn */}
      <SmBtn
        class="sm-btn sm-btn--close"
        click={() => {
          changeUI({ list: true });
        }}
        text="x"
      />
      <hr />

      {/* API ops response message */}
      <ResponseAlert open={open} handleClose={handleClose} alert={alertMessage} />

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
      <LgBtn 
        btnClass="btn btn--left" 
        click={() => {
          changeUI({
            edit: true,
            info: {
              show: false,
              id: props.currentId
            }
          });
        }} 
        text="Edit"
      />

      {/* Delete Btn */}
      <LgBtn 
        btnClass="btn btn--right" 
        click={() => {
          setDeleteClick(true);
        }} 
        text="Delete"
      />
    </div>
  );
};