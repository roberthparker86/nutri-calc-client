export const inputValidate = (key) => {
  return !!key;
};

export const validateRequiredData = (obj) => {
  return inputValidate(obj.name) && 
    inputValidate(obj.calories) && 
    inputValidate(obj.quantity);
};

export const ingredientsAreSame = (ingredientA, ingredientB) => {
	const keysArray = Object.keys(ingredientA);
  const differences = keysArray.filter((key) => ingredientA[key] !== ingredientB[key] );
  
  return differences.length === 0;
};