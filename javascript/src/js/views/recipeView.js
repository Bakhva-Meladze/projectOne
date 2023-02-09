import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from "./View.js";

class RecipeView extends View{
    _parentElement = document.querySelector('.recipe');
    _data;
    _errorMessage = 'We could not find this recipe, Please try another one';
    _message = '';
    render(data){
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    _clear () {
        this._parentElement.innerHTML = '';

    }
    renderSpinner = function () {
        const markup = `
            <div class ="spinner">
             <svg>
                   <use href="${icons}#icon-loader"></use>
              </svg>
             </div>`;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);

    };
    renderError(message = this._errorMessage){
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderMessage(message = this._message){
        const markup = `
         <div class="message">
               <div>
                  <svg>
                      <use href="src/img/icons.svg#icon-smile"></use>
                   </svg>
                  </div>
                  <p>
                    ${message}
                  </p>
         </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    addHandlerRender(handler) {
        /*['hashchange','load'].forEach( ev => window.addEventListener(ev,showRecipe));*/
        window.addEventListener('hashchange', handler);
        window.addEventListener('load', handler);
    }
    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--update-servings');
            if (!btn) return;
            const { updateTo } = btn.dataset;
            if (+updateTo > 0) handler(+updateTo);
        });

    }
    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--bookmark');
            if(!btn) return;
            handler();

        });
    }
    _generateMarkup() {
        return` <li class="preview">
              <a class="preview__link preview__link--active" href="#23456">
                <figure class="preview__fig">
                  <img src="${this._data.image}" alt="${this._data.title}" />
                    <h1 class="recipe_title">
                    <span>${this._data.title}</span>
                    </h1>
                </figure>
                
                <div class="preview__data">
                  <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
                  <p class="preview__publisher">The Pioneer Woman</p>
                  <div class="preview__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>                     
                    </svg>
                  </div>
                </div>
              </a>
            </li>
        </ul>

        <div class="pagination">
             <button class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page 1</span>
            </button>
            <button class="btn--inline pagination__btn--next">
              <span>Page 3</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button> 
        </div>

        <p class="copyright">
            &copy; Copyright by
            <a
                    class="twitter-link"
                    target="_blank"
                    href="https://twitter.com/jonasschmedtman"
            >Jonas Schmedtmann</a
            >. Use for learning or your portfolio. Don't use to teach. Don't claim
            as your own.
        </p>
    </div>

    <div class="recipe">
        <div class="message">
            <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                
            </div>
            <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>

         <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> -->

        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
          </div> 
        <figure class="recipe__fig">
          <img src="src/img/test-1.jpg" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>Pasta with tomato cream sauce</span>
          </h1>
        </figure>
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>
            <div class="recipe__info-buttons">
               <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings - 1
        }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
               <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings + 1
        }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
            </div>
          </div>
          <div class="recipe__user-generated ${this._data.key? '': 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${this._data.bookmark ? '-fill': '' }"></use>
            </svg>
          </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </div>
        
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `

    }

    _generateMarkupIngredient(ing) {
        return `
                <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity ?
            new Fraction(ing.quantity).toString() : ''
        }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
              
                `

    }

}
export default new RecipeView();