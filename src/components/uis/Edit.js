import React, { useEffect, useState } from "react";
import EditForm from "../form/EditForm.js";
import objCalc from "../../large_func/obj_calc.js";
import { updateRecipeById, getRecipeById } from "../../api/index.js";
import template from "../../obj/ingredientTemp.js";

export default function Edit(props) {
    const { changeState, currentId } = props;
    const { getIngredientTotal, getRecipeTotal } = objCalc;
    
    const [ recipe, handleRecipe ] = useState({}); // Recipe to edit
    const [ isLoaded, setLoaded ] = useState(false); // Used to determine whether Read operations have resolved
    const [ newIngrList, setNewIngrList ] = useState([]); // Array for updated ingredient data
    const [ currentIngredient, setcurrentIngredient ] = useState(template); // Current ingredient displayed/ edited
    const [ count, setCount ] = useState(0); // Counter used for indexing
    const [ isClicked, setClick ] = useState(false); // Done Btn hook
    const [ isReady, setReady ] = useState(false); // Recipe ready for put request hook

    const handleChange = (event) => {
        // Update newIngredient
        const { name, value } = event.target;
    
        setcurrentIngredient((prev) => {
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
            : (newIngrList.length !== recipe.ingredients.length) && (updateList(currentIngredient), setLoaded(true))
        );
    };
    
    const updateList = (obj) => {
        setNewIngrList(prev => [...prev, obj]);
    };

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
        // Selects an ingredient to populate form inputs and edit.
        return( isLoaded 
            ? (newIngrList.length === recipe.ingredients.length)
                ? (setcurrentIngredient(newIngrList[count]), setLoaded(false))
                : (setcurrentIngredient(recipe.ingredients[count]), setLoaded(false))
            : null)
    }, [isLoaded, count, newIngrList, recipe.ingredients]);

    useEffect(() => {
        // Prepares updated data for PUT request
        const mergeIngredients = () => {
            const ingredientTotal = getIngredientTotal(newIngrList);
            const recipeTotal = getRecipeTotal(ingredientTotal, recipe.servings); 

            handleRecipe((prev) => {
                return({
                    ...prev,
                    ...recipeTotal,
                    ingredients: newIngrList
                });
            });
        };

        return( 
            (isClicked)
            ? (mergeIngredients(), setClick(false), setReady(true))
            : null
        );
    }, [isClicked, setLoaded, newIngrList, recipe.servings, getIngredientTotal, getRecipeTotal]);

    useEffect(() => { 
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
            <div // Clost btn
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
                newIngrList={ newIngrList }
            />
            
        </div>
    );
};