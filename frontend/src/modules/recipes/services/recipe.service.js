import API from "../../api";

export const getRecipes = ({ filter, search } = {}) => {
  const params = {};

  if (filter && filter !== "All Recipes") {
    params.filter = filter;
  }

  if (search) {
    params.search = search;
  }

  return API.get("/recipes", { params });
};

export const getFeaturedRecipe = () => {
  return API.get("/recipes/featured");
};

export const getRecipeById = (id) => {
  return API.get(`/recipes/${id}`);
};

export const createRecipe = (recipeData) => {
  return API.post("/recipes", recipeData);
};
