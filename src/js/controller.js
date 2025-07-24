

import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import searchView from './views/SearchView.js';
import resultsView from './views/ResultsView.js';
import paginationView from './views/PaginationView.js';


const controlRecipes = async function () {
  try {
    console.log("controlRecipes");
    const id = window.location.hash.slice(1);
    if (!id) return;

    console.log(id)
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    console.log('Receta cargada:', model.state.recipe);
    recipeView.render(model.state.recipe);
   
  } catch (err) {
    console.error('Error en controlRecipes:', err);
    recipeView.renderError();
  }
};

// const controlSearchResults = async function () {
//   try {
//     const query = searchView.getQuery();
//     if (!query) return;

//     resultsView.renderSpinner();

//     await model.loadSearchResults(query);
    
//     resultsView.render(model.state.search.results);
//   } catch (err) {
//     resultsView.renderError();
//   }
// };
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    await model.loadSearchResults(query);
    
    resultsView.render(model.getSearchResultsPage(1));
    
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const init = function () {
  console.log("Starting ");
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
