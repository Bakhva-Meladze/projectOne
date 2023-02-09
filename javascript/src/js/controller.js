import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from "./views/paginationView.js";
import {getSearchResultPage} from "./model.js";
import bookmarksView from "./views/bookmarksView.js";
import previewView from "./views/previewView";
import addRecipeView from "./views/addRecipeView.js";




/*
const recipeContainer = document.querySelector('.recipe');
*/
const controlRecipes = async function () {
    try{
        const id = window.location.hash.slice(1);
        if(!id) return;
        recipeView.renderSpinner();
        resultsView.update(model.getSearchResultPage())
        await model.loadRecipe(id);
         recipeView.render(model.state.recipe);

         bookmarksView.update(model.state.bookmarks);
        /*rendering*/

    } catch(err) {
        alert(err);
        recipeView.renderError();

    }
}
const controlSearchResults = async function () {
    try{
        const query = searchView.getQuery();
        if(!query) return
        console.log(query);

        await model.loadSearchResults(query);
        /*console.log(model.state.search.results);*/
        resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultPage());
        paginationView.render(model.state.search);

    } catch (err) {
        console.log(err);

    }
};
const controlPagination = function (goToPage) {
    console.log(goToPage);
    resultsView.render(model.getSearchResultPage(goToPage));
    paginationView.render(model.state.search);
}
const controlServings = function (newServings){
    model.updateServings(newServings);
/*
    recipeView.render(model.state.recipe);
*/
    recipeView.update(model.state.recipe);


}
const controlAddBookmarks = function () {
    if(!model.state.recipe.bookmark) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);
    console.log(model.state.recipe);
    recipeView.update(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
}
const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe =  async function (newRecipe) {
    try {
        addRecipeView.renderSpinner();
       await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);
        recipeView.render(model.state.recipe);
        addRecipeView.renderMessage();
        bookmarksView.render(model.state.bookmarks);
        window.history.pushState(null, '', `#${model.state.recipe.id}`);
        setTimeout(function(){
            addRecipeView.toggleWindow();
        },MODAL_CLOSE_SEC * 1000);

    } catch (err) {
        console.error(err);
        addRecipeView.renderError(err.message);
    }

}

const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmarks);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);

}
init();




