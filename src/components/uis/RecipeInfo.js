import React, { useState, useEffect } from "react";
import InfoField from "../btn-input/InfoField.js";
import SmBtn from "../btn-input/SmBtn.js";
import LgBtn from "../btn-input/LgBtn.js";
import { deleteRecipeById, getRecipeById } from '../../api/index.js';
import SubmitMessage from '../modal/SubmitMessage.js';

export default function RecipeInfo (props) {
	///// HOOKS /////
	const [recipe, handleRecipe] = useState({}); // Recipe to be displayed
	const [ deleteClick, setDeleteClick ] = useState(false); // Delete Btn	
	const [ open, setOpen ] = useState({
		success: false,
		error: false
	}); // Trigger ResponseAlert messages

	const [postAlert, setPostAlert ] = useState({ // Post success object
		title: "",
		body: "" 
	});

	///// DESTRUCTURING ASSIGNMENT /////
	const { name, calories, protein, totFat, satFat, unsatFat, carbs, fiber, sugar, sodium, chol, potas } = recipe;
	const { changeUI, currentId } = props;

	///// USE EFFECT /////
	// API DELETE ops
	useEffect(() => {
		return(
			(deleteClick)
				? deleteRecipeById(currentId)
					.then( res => {
						setPostAlert({
							title: "Success!",
							body: `${res.data.data.name} succesfully deleted.`
						});
						setOpen({ success: true, error: false });
					})
					.catch(err => {
						setPostAlert({
							title: "Error",
							body: `Failed to delete: ${err}`
						});
						setOpen({ success: false, error: true });
					})
				: null
		);
	}, [deleteClick, changeUI, currentId]);

	useEffect(() => {
		const fetchRecipe = async () => {
			const result = await getRecipeById(currentId)
				.catch(err => {
					setPostAlert({
						title: "Error",
						body: `Failed to get recipe: ${err}`
					});
					setOpen({ success: false, error: true });
				});

			handleRecipe(result.data.data);
		};

		fetchRecipe();
	}, [currentId]);

	return (
		<div className="window">
			<h3>{name}</h3>

			{/* Close Btn */}
			<SmBtn
				class="sm-btn sm-btn--close"
				click={() => {
					changeUI({ list: true });
				}}
				text="x"
			/>
			<hr />

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

			{/* Display recipe stats */}
			<div className="window__container window__container--recipe-info">
				<div className="window__col window__col--left">
					<InfoField name="Calories:" value={calories} unit="g" />
					<InfoField name="Protein:" value={protein} unit="g" />
					<InfoField name="Total Fat:" value={totFat} unit="g" />
					<InfoField name="Saturated Fat:" value={satFat} unit="g" />
					<InfoField name="Unsaturated Fat:" value={unsatFat} unit="g" />
					<InfoField name="Cholesterol:" value={chol} unit="mg" />
				</div>
				
				<div className="window__col">
					<InfoField name="Carbohydrates" value={carbs} unit="g" />
					<InfoField name="Fiber:" value={fiber} unit="g" />
					<InfoField name="Sugar:" value={sugar} unit="g" />
					<InfoField name="Sodium:" value={sodium} unit="mg" />
					<InfoField name="Potassium:" value={potas} unit="mg" />
				</div>
			</div>

			{/* Edit Btn */}
			<LgBtn 
				btnClass="btn btn--left" 
				click={() => {
					changeUI({
						edit: true,
						info: {
							show: false,
							id: props.currentId
						}
					});
				}} 
				text="Edit"
			/>

			{/* Delete Btn */}
			<LgBtn 
				btnClass="btn btn--right" 
				click={() => {
					setDeleteClick(true);
				}} 
				text="Delete"
			/>
		</div>
	);
};