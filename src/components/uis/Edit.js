import React, { useEffect, useState } from "react";
import EditForm from "../form/EditForm.js";
import { getIngredientTotal, getRecipeTotal } from "../../large_func/objCalc.js";
import { updateRecipeById, getRecipeById } from "../../api/index.js";
import template from "../../obj/ingredientTemp.js";
import ResponseAlert from "../ResponseAlert.js";

export default function Edit(props) {
    const { changeState, currentId } = props;

    ///// HOOKS /////
    const [ recipe, handleRecipe ] = useState({name: ""}); // Recipe to edit
    const [ currentIngredient, setCurrentIngredient ] = useState(template); // Current ingredient displayed/ edited
    const [ newIngredientList, setNewIngredientList ] = useState([]); // Array holds updated ingredient objs
    const [ count, setCount ] = useState(0); // Count for capping Next btn clicks and indexing
    const [ isLoaded, setLoaded ] = useState(false); // Determine if recipe promise resolved
    const [ isClicked, setClick ] = useState(false); // Done Btn click
    const [ isReady, setReady ] = useState(false); // Data ready for PUT ops
    const [ open, setOpen ] = useState(false); // Trigger ResponseAlert messages
    const [alertMessage, setAlertMessage ] = useState({ // ResponseAlert message object
        severity: "",
        title: "",
        message: "" 
    });

    const handleChange = (event) => {
        // Update newIngredient
        const { name, value } = event.target;
    
        setCurrentIngredient((prev) => {
          return {
            ...prev,
            [name]: value
          };
        });
    };

    const checkMaxCount = () => {
        const maxCount = (recipe.ingredients.length - 1);
        return count === maxCount;
    };

    const nextClick = () => {
        return( checkMaxCount() === false
            ? (updateList(currentIngredient), setCount(count + 1), setLoaded(true))
            : (newIngredientList.length !== recipe.ingredients.length) && (updateList(currentIngredient), setLoaded(true))
        );
    };
    
    const updateList = (obj) => {
        setNewIngredientList(prev => [...prev, obj]);
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
    // Fetch recipe data. Executes once when Edit.js is rendered.
    useEffect(() => {        
        const fetchRecipe = async () => {
            await getRecipeById(currentId)
                .then(res => {
                    handleRecipe(res.data.data);
                    setLoaded(true);
                })
                .catch(err => {
                    setAlertMessage({
                        severity: "error",
                        title: "Error",
                        message: `Could not fetch recipe: ${err}`
                    })
                });
        };

        fetchRecipe();
    }, [currentId]);

    // Select ingredient to populate EditForm inputs
    useEffect(() => {
        return( isLoaded 
            ? (newIngredientList.length === recipe.ingredients.length)
                // EditForm populates w/ last updated ingredient obj if true
                ? (setCurrentIngredient(newIngredientList[count]), setLoaded(false))
                // EditForm populates with next item in recipe.ingredient list if false
                : (setCurrentIngredient(recipe.ingredients[count]), setLoaded(false))
            : null)
    }, [isLoaded, count, newIngredientList, recipe.ingredients]);

    // Prepare updated data for PUT ops
    useEffect(() => {
        const mergeIngredients = () => {
            const ingredientTotal = getIngredientTotal(newIngredientList);
            const recipeTotal = getRecipeTotal(ingredientTotal, recipe.servings); 

            handleRecipe((prev) => {
                return({
                    ...prev,
                    ...recipeTotal,
                    ingredients: newIngredientList
                });
            });
        };

        return( 
            (isClicked)
            ? (mergeIngredients(), setClick(false), setReady(true))
            : null
        );
    }, [isClicked, setLoaded, newIngredientList, recipe.servings ]);

    // isReady === true, move forward with PUT ops using recipe obj
    useEffect(() => { 
        const handleResponse = (obj) => {
            setAlertMessage(obj);
            setOpen(true);
            setReady(false);
        };
        return(
            (isReady)
            ? updateRecipeById(recipe._id, recipe)
                .then( res => {
                    handleResponse({
                        severity: "success",
                        title: "Success!",
                        message: res.data.message
                    })
                })
                .catch(err => {
                    handleResponse({
                        severity: "error",
                        title: "Error",
                        message: `Failed to update: ${err}`
                    })
                })
            : null
        );
    }, [isReady, changeState, recipe]);

    return (
        <div className="window window--add">
            {/* Close btn */}
            <div 
                className="sm-btn sm-btn--close"
                onClick={() => changeState({ list: true })}
                type="button"
            > x </div>
            
            {/* API ops response message */}
            <ResponseAlert open={open} handleClose={handleClose} alert={alertMessage} />
            
            <EditForm 
                recipe={recipe}
                ingredient={currentIngredient}
                handleChange={handleChange}
                nextBtnFunc={() => {
                    nextClick();
                }}
                doneBtnFunc={() => {
                    setClick(true);
                }}
                newIngredientList={ newIngredientList }
            />
            
        </div>
    );
};