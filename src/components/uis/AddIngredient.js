import React, { useEffect, useState } from "react";
import { insertRecipe } from "../../api/index.js";
import { getIngredientTotal, getRecipeTotal } from "../../large_func/objCalc.js";
import IngredientForm from "../form/IngredientForm.js";
import template from "../../obj/ingredientTemp.js";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

// CSS Styling for Alert window
const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  message: {
    fontSize: "16px"
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold"
  }
});

export default function AddIngredient (props) {
  const { changeState, updateNewRecipe, newRecipe } = props;
  const classes = useStyles();
  
  ///// Hooks /////
  const [newIngredient, setNewIngredient] = useState(template); // New ingredient
  const [list, setList] = useState([]); // Ingredient array
  const [isClicked, setClick] = useState(false); // Done btn click
  const [isUpdated, setUpdate] = useState(false); // Check if newRecipe updated
  const [postAlert, setPostAlert ] = useState({ // Post success object
    severity: "",
    title: "",
    message: "" 
  });
  const [ open, setOpen ] = useState(false); // Trigger Alert open
  
  // Update newIngredient
  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewIngredient((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  
  // Update ingredient array
  const updateList = (obj) => {
    setList((prev) => {
      return([...prev, obj]);
    })
  };

  // Close Alert window then change UI
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    changeState({ list: true });
  };

  ///// USE EFFECT /////
  // Prepare data for post
  useEffect(() => {
    const mergeRecipe = () => {
      const ingredientTotal = getIngredientTotal(list);
      const recipeTotal = getRecipeTotal(ingredientTotal, newRecipe.servings);
  
      updateNewRecipe({
        ...recipeTotal,
        ingredients: list
      });
      setClick(false);
      setUpdate(true);
    };

    return( (isClicked) ? mergeRecipe(): null );
  },[isClicked, newRecipe, list, updateNewRecipe]);

  // Post once isUpdated === true
  useEffect(() => {
    const postRecipe = async () => {
      return(
        (isUpdated)
          ? (insertRecipe(newRecipe)
              .then(result => {
                setPostAlert({
                  severity: "success",
                  title: "Success!",
                  message: result.data.message
                })
                setOpen(true);
                setUpdate(false);
              })
              .catch(err => {
                setPostAlert({
                  severity: "error",
                  title: "Error!",
                  message: `Failed to create recipe: ${err}`
                });
                setOpen(true);
                setUpdate(false);
              }))
          : null
      );
    };

    postRecipe();
  }, [ isUpdated, newRecipe, changeState, setPostAlert, setOpen ]);
  
  ///// Component Return /////
  return (
    <div className="window window--add">
      {/* Snackbar Alerts */}
      <Snackbar className={classes.root} open={open} onClose={handleClose} >
        <Alert className={classes.message} onClose={handleClose} severity={postAlert.severity} variant="filled" >
          <AlertTitle className={classes.title}>{postAlert.title}</AlertTitle>
          {postAlert.message}
        </Alert>
      </Snackbar>
      
      {/* // Clost btn */}
      <div 
        className="sm-btn sm-btn--close"
        onClick={() => changeState({ list: true })}
        type="button"
      >
        x
      </div>
      
      <IngredientForm 
        recipe={newRecipe}
        ingredient={newIngredient}
        handleChange={handleChange}
        nextBtnFunc={() => { 
            updateList(newIngredient);
            setNewIngredient(template);
        }}
        doneBtnFunc={() => {
            updateList(newIngredient);
            setNewIngredient(template);
            setClick(true);
        }}
      />
    </div>
  );
};