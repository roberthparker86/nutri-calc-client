import React, { useEffect, useState } from "react";
import EditForm from "../form/EditForm.js";
import { getIngredientTotal, getRecipeTotal } from "../../other-func/objCalc.js";
import { updateRecipeById, getRecipeById } from "../../api/index.js";
import template from "../../obj/ingredientTemp.js";
import { inputValidate } from "../../other-func/inputValidate.js";
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

				if (isClicked) {
					const instancesOfCurrentRecipe = newIngredientList.filter((ingredient) => ingredient.name === currentIngredient.name);

					if ( instancesOfCurrentRecipe.length === 0) {
						updateList(currentIngredient);
						mergeIngredients();
						setClick(false);
						setReady(true);

					} else {
						mergeIngredients();
						setClick(false);
						setReady(true);
					}
				}

				// return( 
				// 		(isClicked)
				// 		? (mergeIngredients(), setClick(false), setReady(true))
				// 		: null
				// );
		}, [ isClicked, setLoaded, currentIngredient, newIngredientList, recipe.servings ]);

		// isReady === true, move forward with PUT ops using recipe obj
		useEffect(() => {
				return(
						(isReady)
						? updateRecipeById(recipe._id, recipe)
								.then( res => {
									setPostAlert({
										title: "Success!",
										body: res.data.message
									});
									setOpen({ success: true, error: false });
									setReady(false);
								})
								.catch(err => {
									setPostAlert({
										title: "Error",
										body: `Failed to update: ${err}`
									});
									setOpen({ success: false, error: true });
									setReady(false);
								})
						: null
				);
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
						if ( inputValidate(currentIngredient.name) && 
							inputValidate(currentIngredient.calories) && 
							inputValidate(currentIngredient.quantity)) {

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

						// return(
						// 	inputValidate(currentIngredient.name) && inputValidate(currentIngredient.calories) && inputValidate(currentIngredient.quantity)
						// 		? !checkMaxCount()
						// 			? ( updateList(currentIngredient), setCount(count + 1), setLoaded(true) )
						// 			: (newIngredientList.length !== recipe.ingredients.length) && ( updateList(currentIngredient), setLoaded(true) )
						// 		: ( setPostAlert({ title: "Error!", body: "You must input an ingredient name, calorie amount, and quantity." }), 
						// 				setOpen((prev) => ({ ...prev, error: true })) )
						// );
					}}
					doneBtnFunc={() => {
						setClick(true);
					}}
					newIngredientList={ newIngredientList }
				/>
			</div>
		);
};