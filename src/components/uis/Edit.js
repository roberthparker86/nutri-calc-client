import React, { useEffect, useState } from "react";
import { getRecipeById } from "../../api";
import Input from "../btn-input/Input";
import IngredientForm from "../form/IngredientForm";

export default function Edit (props) {
    const { changeState } = props;
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
    const [count, setCount ] = useState(0); // Counter used for indexing

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

    useEffect(() => {
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
        return isLoaded ? 
            (setCurIngr(recipe.ingredients[count]),
            setLoaded(false))
            : null;
    }, [isLoaded]);

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
                doneBtnFunc={() => console.log("Clicked")}
            />
            
        </div>
    );
};