import React, { useEffect, useState } from "react";
import { getRecipeById } from "../../api";
import IngredientForm from "../form/IngredientForm";
import objCalc from "../../large_func/obj_calc.js";
import { updateRecipeById } from "../../api/index.js";

export default function Edit (props) {
    const { changeState } = props;
    const { getIngredientTotal, getRecipeTotal } = objCalc;
    const template = { // Ingredient obj template
        name: "",
        calories: "",
        protein: "",
        totFat: "",
        satFat: "",
        unsatFat: "",
        carbs: "",
        fiber: "",
        sugar: "",
        sodium: "",
        chol: "",
        potas: "",
        quantity: ""
      };
    
    const [ recipe, handleRecipe ] = useState({}); // Recipe to edit
    const [ isLoaded, setLoaded ] = useState(false); // Used to determine whether Read operations have resolved
    const [ newIngrList, setNewIngrList ] = useState([]); // Array for updated ingredient data
    const [ curIngr, setCurIngr ] = useState(template); // Current ingredient displayed/ edited
    const [ count, setCount ] = useState(0); // Counter used for indexing
    const [ isClicked, setClick ] = useState(false); // Done Btn hook
    const [ isReady, setReady ] = useState(false); // Recipe ready for put request hook

    const handleChange = (event) => {
        // Update newIngredient
        const { name, value } = event.target;
    
        setCurIngr((prev) => {
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
            ? (updateList(curIngr), setCount(count + 1), setLoaded(true))
            : (newIngrList.length !== recipe.ingredients.length) && (updateList(curIngr), setLoaded(true))
        );
    };

    const updateList = (obj) => {
        setNewIngrList(prev => [...prev, obj]);
    };

    useEffect(() => {
        // Fetch recipe data. Executes once when Edit.js is rendered.
        const fetchRecipe = async () => {
            await getRecipeById(props.curId)
                .then(res => {
                    handleRecipe(res.data.data);
                    setLoaded(true);
                });
        };

        fetchRecipe();
    }, []);

    useEffect(() => {
        // Selects an ingredient to populate form inputs and edit.
        return isLoaded ? 
            (setCurIngr(recipe.ingredients[count]),
            setLoaded(false))
            : null;
    }, [isLoaded]);

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
    }, [isClicked, setLoaded, updateList]);

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
    }, [isReady]);

    return (
        <div className="window window--add">
            <div // Clost btn
                className="sm-btn sm-btn--close"
                onClick={() => changeState({ list: true })}
                type="button"
            > 
                x
            </div>
            <IngredientForm 
                recipe={recipe}
                ingredient={curIngr}
                handleChange={handleChange}
                nextBtnFunc={() => {
                    nextClick();
                    console.log(newIngrList);
                }}
                doneBtnFunc={() => {
                    return(
                        (newIngrList.length !== recipe.ingredients.length)
                        ? (updateList(curIngr), setLoaded(true))
                        : setClick(true)
                    );
                } }
            />
            
        </div>
    );
};