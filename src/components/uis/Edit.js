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
    
    const [ recipe, handleRecipe ] = useState({});
    const [ isLoaded, setLoaded ] = useState(false);
    const [ newIngrList, setNewIngrList ] = useState([]);
    const [ curIngr, setCurIngr ] = useState(template);

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
            setCurIngr(recipe.ingredients[0]) 
            : null;
    }, [isLoaded]);

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
                    updateList(curIngr);
                }}
                doneBtnFunc={() => console.log("Clicked")}
            />
            
        </div>
    );
};