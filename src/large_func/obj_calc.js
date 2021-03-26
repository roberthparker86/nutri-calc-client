// Multiply obj property values by quantity vlaue
const multObjValues = (obj) => {
    const { calories, protein, totFat, satFat, unsatFat, carbs, fiber, sugar, sodium, chol, potas, quantity } = obj;
    return({
      calories: (calories * quantity),
      protein: (protein * quantity),
      totFat: (totFat * quantity),
      satFat: (satFat * quantity),
      unsatFat: (unsatFat * quantity),
      carbs: (carbs * quantity),
      fiber: (fiber * quantity),
      sugar: (sugar * quantity),
      sodium: (sodium * quantity),
      chol: (chol * quantity),
      potas: (potas * quantity),
    });
  };

  // Return a sum from specified key/values from arr of obj's
  const getKeyTotal = (key, arr) => {
    const tempList = arr.map((obj) => {
      return (obj[key]);
    });
    
    return tempList.reduce((a, b) => a + b);
  };

  // Return single obj from arr of obj's with sum of values as properties
  export const getIngredientTotal = (arr) => {
    const tempList = arr.map((obj) => {
      return (multObjValues(obj));
    });
    
    return({
      calories: getKeyTotal("calories", tempList),
      protein: getKeyTotal("protein", tempList),
      totFat: getKeyTotal("totFat", tempList),
      satFat: getKeyTotal("satFat", tempList),
      unsatFat: getKeyTotal("unsatFat", tempList),
      carbs: getKeyTotal("carbs", tempList),
      fiber: getKeyTotal("fiber", tempList),
      sugar: getKeyTotal("sugar", tempList),
      sodium: getKeyTotal("sodium", tempList),
      chol: getKeyTotal("chol", tempList),
      potas: getKeyTotal("potas", tempList)
    });
  };

  export const getRecipeTotal = (obj, serv) => {
    return ({
      calories: Math.round((obj.calories / serv) * 10) / 10,
      protein: Math.round((obj.protein / serv) * 10) / 10,
      totFat: Math.round((obj.totFat / serv) * 10) / 10,
      satFat: Math.round((obj.satFat / serv) * 10) / 10,
      unsatFat: Math.round((obj.unsatFat / serv) * 10) / 10,
      carbs: Math.round((obj.carbs / serv) * 10) / 10,
      fiber: Math.round((obj.fiber / serv) * 10) / 10,
      sugar: Math.round((obj.sugar / serv) * 10) / 10,
      sodium: Math.round((obj.sodium / serv) * 10) / 10,
      chol: Math.round((obj.chol / serv) * 10) / 10,
      potas: Math.round((obj.potas / serv) * 10) / 10
    });
  };

  const objCalc = {
      getIngredientTotal,
      getRecipeTotal
  }

  export default objCalc;