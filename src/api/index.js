import axios from 'axios';

const api = axios.create({
    baseURL: 'https://thawing-shore-86076.herokuapp.com/api'
});

export const insertRecipe = payload => api.post(`/recipe`, payload);
export const getAllRecipes = () => api.get(`/recipes`);
export const updateRecipeById = (id, payload) => api.put(`/recipe/${id}`, payload);
export const deleteRecipeById = id => api.delete(`/recipe/${id}`);
export const getRecipeById = id => api.get(`/recipe/${id}`);

const apis = {
    insertRecipe,
    getAllRecipes,
    updateRecipeById,
    deleteRecipeById,
    getRecipeById
};

export default apis;