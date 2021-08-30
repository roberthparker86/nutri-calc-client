import React, { useEffect, useState } from "react";
import EditForm from "../form/EditForm.js";
import { getIngredientTotal, getRecipeTotal } from "../../other-func/objCalc.js";
import { updateRecipeById, getRecipeById } from "../../api/index.js";
import template from "../../obj/ingredientTemp.js";
import { validateRequiredData, ingredientsAreSame } from "../../other-func/inputValidate.js";
import SubmitMessage from "../modal/SubmitMessage.js";

export default function Edit(props) {
		const { changeUI, currentId } = props;

		/// HOOKS ///
		const [ recipe, handleRecipe ] = useState({name: ""}); // Recipe to edit
		const [ currentIngredient, setCurrentIngredient ] = useState(template); // Current ingredient displayed/ edited
		const [ newIngredientList, setNewIngredientList ] = useState([]); // Array holds updated ingredient objs
		const [ count, setCount ] = useState(0); // Count for capping Next btn clicks and indexing
		const [ isLoaded, setLoaded ] = useState(false); // Determine if recipe promise resolved
		const [ isClicked, setClick ] = useState(false); // Done Btn click
		const [ isReady, setReady ] = useState(false); // Data ready for PUT ops

		const [ open, setOpen ] = useState({
			success: false,
			error: false
		}); // Trigger ResponseAlert messages

		const [postAlert, setPostAlert ] = useState({ // Post success object
			title: "",
			body: "" 
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

		const updateList = (obj) => {
				setNewIngredientList(prev => [...prev, obj]);
		};

		/// USE EFFECT ///   
		// Fetch recipe data. Executes once when Edit.js is rendered.
		useEffect(() => {        
			const fetchRecipe = async () => {
				await getRecipeById(currentId)
					.then(res => {
						handleRecipe(res.data.data);
						setLoaded(true);
					})
					.catch(err => {
						setPostAlert((prev) => ({
							...prev,
							title: "Error!",
							body: `Could not fetch recipe ${err}`
						}))
						setOpen((prev) => ({ ...prev, error: true }));
					});
			};

			fetchRecipe();
		}, [currentId]);

		// Select ingredient to populate EditForm inputs
		useEffect(() => {
				if (isLoaded) {

					if (newIngredientList.length === recipe.ingredients.length) {
						setCurrentIngredient(newIngredientList[count]);
						setLoaded(false);

					} else {
						setCurrentIngredient(recipe.ingredients[count]);
						setLoaded(false);
					}

				}
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

				if (isClicked) {
					mergeIngredients();
					setClick(false);
					setReady(true);
				}

		}, [ isClicked, setLoaded, currentIngredient, newIngredientList, recipe.servings ]);

		// isReady === true, move forward with PUT ops using recipe obj
		useEffect(() => {

				if (isReady) {
					updateRecipeById(recipe._id, recipe)
						.then(res => {
							setPostAlert({
								title: "Success!",
								body: res.data.message
							});
							setOpen({ success: true, error: false });
							setReady(false);
						})
						.catch(error => {
							setPostAlert({
								title: "Error",
								body: `Failed to update: ${error}`
							});
							setOpen({ success: false, error: true });
							setReady(false);
						});
				}

		}, [isReady, changeUI, recipe]);

		return (
			<div className="window window--add">
				{/* Close btn */}
				<div 
					className="sm-btn sm-btn--close"
					onClick={() => changeUI({ list: true })}
					type="button"
				> 
					x 
				</div>
				
				{/* Pop-up Messages */}
				<SubmitMessage // Success Message
					isOpen={open.success}
					open={open}
					handleOpen={setOpen}
					changeUI={changeUI}
					modalClass="modal modal--success"
					btnClass="modal__button modal__button--success"
					title={postAlert.title}
					body={postAlert.body}
				/>

				<SubmitMessage // Error message
					isOpen={open.error}
					open={open}
					handleOpen={setOpen}
					changeUI={changeUI}
					modalClass="modal modal--error"
					btnClass="modal__button modal__button--error"
					title={postAlert.title}
					body={postAlert.body}
				/>
				
				<EditForm 
					recipe={recipe}
					ingredient={currentIngredient}
					handleChange={handleChange}
					nextBtnFunc={() => {
						if ( validateRequiredData(currentIngredient) ) {

								if (!checkMaxCount()) {
									updateList(currentIngredient);
									setCount(count + 1);
									setLoaded(true);

								} else if (newIngredientList.length !== recipe.ingredients.length) {
									updateList(currentIngredient);
									setCurrentIngredient(template);

								} else {
									const instancesOfCurrentRecipe = newIngredientList.filter((ingredient) => ingredient.name === currentIngredient.name);
									
									if (instancesOfCurrentRecipe.length === 0) {
										updateList(currentIngredient);
										setCurrentIngredient(template);

									} else {
										setCurrentIngredient(template);
									}
								}
						}
					}}

					doneBtnFunc={() => {
						const instancesOfCurrentRecipe = newIngredientList.filter((ingredient) => ingredient.name === currentIngredient.name);
						const originalIngredientsArray = recipe.ingredients;

						if (newIngredientList.length !== originalIngredientsArray.length) {
							const missingIngredients = originalIngredientsArray.filter((ingredient, index) => {
								return (!newIngredientList[index])
									? null
									: (ingredient.name !== newIngredientList[index].name)
									? ingredient
									: null;
							});

							missingIngredients.forEach((ingredient) => {
								return updateList(ingredient);
							});
						};

						if ( instancesOfCurrentRecipe.length === 0 || !ingredientsAreSame(currentIngredient, recipe.ingredients[count]) ) {
							if ( validateRequiredData(currentIngredient) ) {
								updateList(currentIngredient); 
								setClick(true);
							};

						} else {
							setClick(true);
						}
					}}

					newIngredientList={ newIngredientList }
				/>
			</div>
		);
};