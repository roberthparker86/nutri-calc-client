import React, { useEffect, useState } from "react";
import EditForm from "../form/EditForm.js";
import { getIngredientTotal, getRecipeTotal } from "../../large_func/obj_calc.js";
import { updateRecipeById, getRecipeById } from "../../api/index.js";
import template from "../../obj/ingredientTemp.js";

export default function Edit(props) {
    const { changeState, currentId } = props;

    ///// HOOKS /////
    const [ recipe, handleRecipe ] = useState({}); // Recipe to edit
    const [ currentIngredient, setCurrentIngredient ] = useState(template); // Current ingredient displayed/ edited
    const [ newIngredientList, setNewIngredientList ] = useState([]); // Array holds updated ingredient objs
    const [ count, setCount ] = useState(0); // Count for capping Next btn clicks and indexing
    const [ isLoaded, setLoaded ] = useState(false); // Determine if recipe promise resolved
    const [ isClicked, setClick ] = useState(false); // Done Btn click
    const [ isReady, setReady ] = useState(false); // Data ready for PUT ops

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

    ///// USE EFFECT /////
    useEffect(() => {
        // Fetch recipe data. Executes once when Edit.js is rendered.
        const fetchRecipe = async () => {
            await getRecipeById(currentId)
                .then(res => {
                    handleRecipe(res.data.data);
                    setLoaded(true);
                });
        };

        fetchRecipe();
    }, [currentId]);

    useEffect(() => {
        // Select ingredient to populate EditForm inputs
        return( isLoaded 
            ? (newIngredientList.length === recipe.ingredients.length)
                // EditForm populates w/ last updated ingredient obj if true
                ? (setCurrentIngredient(newIngredientList[count]), setLoaded(false))
                // EditForm populates with next item in recipe.ingredient list if false
                : (setCurrentIngredient(recipe.ingredients[count]), setLoaded(false))
            : null)
    }, [isLoaded, count, newIngredientList, recipe.ingredients]);

    useEffect(() => {
        // Prepare updated data for PUT ops
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
    }, [isClicked, setLoaded, newIngredientList, recipe.servings, getIngredientTotal, getRecipeTotal]);

    useEffect(() => {
        // isReady === true, move forward with PUT ops using recipe obj 
        return(
            (isReady)
            ? updateRecipeById(recipe._id, recipe)
                .then( res => {
                    console.log(res);
                    setReady(false);
                    changeState({ list: true });
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
            > 
                x
            </div>
            
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