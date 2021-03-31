import React, { useEffect, useState } from "react";
import { getRecipeById } from "../../api";
import Input from "../btn-input/Input";

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

    const [curIngr, setCurIngr] = useState(template);
    const {name, calories, protein, totFat, satFat, unsatFat, carbs, fiber, sugar, sodium, chol, potas, quantity} = curIngr;

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
                        {recipe.name}
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
                        value={name}
                        onChange={handleChange}
                        ></input>
                    </div>

                    {/* FIRST COLUMN */}
                    <div className="window__col window__col--centered">
                        <Input 
                            id="calInput"
                            name="calories"
                            value={calories}
                            update={handleChange}
                            label="Calories:"
                            spanID="calInputInline"
                            unit="g"
                        />
                        {/* Protein Field */}
                        <Input
                            id="proteinInput"
                            name="protein"
                            value={protein}
                            update={handleChange}
                            label="Protein:"
                            spanID="proteinInputInline"
                            unit="g"
                        />

                        {/* Total Fat Field */}
                        <Input
                            id="totalFatInput"
                            name="totFat"
                            value={totFat}
                            update={handleChange}
                            label="Total Fat:"
                            spanID="totalFatInputInline"
                            unit="g"
                        />

                        {/* Sat Fat Field */}
                        <Input
                            id="satFatInput"
                            name="satFat"
                            value={satFat}
                            update={handleChange}
                            label="Saturated Fat:"
                            spanID="satFatInputInline"
                            unit="g"
                        />

                        {/* Unsat Fat Field */}
                        <Input
                            id="unatFatInput"
                            name="unsatFat"
                            value={unsatFat}
                            update={handleChange}
                            label="Unsaturated Fat:"
                            spanID="unatFatInput"
                            unit="g"
                        />

                        {/* Carbohydrates Field */}
                        <Input
                            id="carbInput"
                            name="carbs"
                            value={carbs}
                            update={handleChange}
                            label="Carbohydrates:"
                            spanID="carbInputInline"
                            unit="g"
                        />
                    </div>

                    {/* SECOND COLUMN */}
                    <div className="window__col window__col--centered">
                        {/* Fiber Field */}
                        <Input
                        id="fiberInput"
                        name="fiber"
                        value={fiber}
                        update={handleChange}
                        label="Fiber:"
                        spanID="fiberInputInline"
                        unit="g"
                        />

                        {/* Sugars Field */}
                        <Input
                        id="sugarInput"
                        name="sugar"
                        value={sugar}
                        update={handleChange}
                        label="Sugar:"
                        spanID="sugarInputInline"
                        unit="g"
                        />

                        {/* Sodium Field */}
                        <Input
                        id="sodiumInput"
                        name="sodium"
                        value={sodium}
                        update={handleChange}
                        label="Sodium:"
                        spanID="sodiumInputInline"
                        unit="mg"
                        />

                        {/* Cholesterol Field */}
                        <Input
                        id="cholesterolInput"
                        name="chol"
                        value={chol}
                        update={handleChange}
                        label="Cholesterol:"
                        spanID="cholesterolInputInline"
                        unit="mg"
                        />

                        {/* Potassium Field */}
                        <Input
                        id="potassiumInput"
                        name="potas"
                        value={potas}
                        update={handleChange}
                        label="Potassium:"
                        spanID="potassiumInputInline"
                        unit="mg"
                        />

                        {/* Quantity Field */}
                        <Input
                        id="quantityInput"
                        name="quantity"
                        value={quantity}
                        update={handleChange}
                        label="Quantity:"
                        spanID="quantityInputInline"
                        unit=""
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};