import React, { useEffect, useState } from "react";
import { getRecipeById } from "../../api";

export default function Edit (props) {
    const { changeState } = props;
    const [ recipe, handleRecipe ] = useState({});
    const { name } = recipe;

    const [curIngr, setCurIngr] = useState({});

    useEffect(() => {
        const fetchRecipe = async () => {
            const result = await getRecipeById(props.curId);

            handleRecipe(result.data.data);
        };

        fetchRecipe();
    }, [props.curId, handleRecipe]);

    useEffect(() => {
        setCurIngr(recipe.ingredients);
    }, [recipe, setCurIngr]);

    console.log(curIngr);

    return (
        <div className="window window--add">
            <div // Clost btn
                className="sm-btn sm-btn--close"
                onClick={() => changeState({ list: true })}
                type="button"
            > 
                x
            </div>
            <form id="editForm">
                <div className="window__input-container">
                    <h3 className="window__label--name" htmlFor="recipeName">
                        {name}
                    </h3>
                </div>

                <hr className="window__hr--add-top" />
                <div className="window__container--add">
                <div className="window__input-container">
                    {/* Ingredient name input */}
                    <input
                    className="window__input window__input--recipe-name"
                    id="ingredientName"
                    name="name"
                    value="0"
                    onChange={() => console.log("Placeholder")}
                    placeholder="What's the ingredient name?"
                    ></input>
                </div>
                </div>
            </form>
        </div>
    );
};