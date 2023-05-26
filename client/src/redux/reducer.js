import { GET_RECIPES, GET_DIETS, GET_RECIPES_BY_NAME, NEXT_PAGE, PREV_PAGE, CHANGE_PAG, SEARCH, CREATE_RECIPE, DELETE_RECIPE, FILTER_BY_DIETS, FILTER_SORT_NAME, FILTER_RECIPES_SOURCE, FILTER_HEALTHSCORE } from "./action-types";

const initialState = { //Estado global.
    recipes: [],
    recipesCopy: [],
    diets: [],
    selectedDiets: [],
    currentPage: 1,
};

const rootReducer = (state = initialState, action) => {

    switch(action.type) {

        case NEXT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1
            };

        case PREV_PAGE:
            return {
                ...state,
                currentPage: state.currentPage - 1
            };
        
        case CHANGE_PAG:
            return {
                ...state,
                currentPage: action.payload
            };

        case SEARCH:
            return {
                ...state,
                search: action.payload
            };

        case GET_RECIPES:
            return { ...state, recipes: action.payload, recipesCopy:action.payload };

        case GET_RECIPES_BY_NAME:
            return { ...state, recipes: action.payload, recipesCopy:action.payload };
        
        case GET_DIETS:
            return { ...state, diets: action.payload };

        case CREATE_RECIPE:
            return { ...state};   
            
        case DELETE_RECIPE:
            return {...state};

        case FILTER_RECIPES_SOURCE:
            
            if (action.payload === "dbRecipes") {
                return {
                    ...state,
                    recipes: state.recipesCopy.filter(recipe => recipe.id.length > 35)
                };
            }
            if (action.payload === "apiRecipes") {
                const recipeApiFiltered = state.recipesCopy.filter(recipe => typeof(recipe.id) === "number")
                return {
                    ...state,
                    recipes: [...recipeApiFiltered]
                };
            } 
            if(action.payload === 'allRecipes'){
                return {
                    ...state,
                    recipes: state.recipesCopy
                }
            }
                
            return {
                ...state,
                recipes: [...state.recipesCopy]
            } 
                    
        case FILTER_HEALTHSCORE:
            
            const payload = action.payload;

            const orderedHealthScore = state.recipes.map((recipe) => {  //Antes: [...state.recipes]
                const healthScore = typeof recipe.healthScore === "number" ? recipe.healthScore : parseInt(recipe.healthScore);
                return { ...recipe, healthScore };
            });

            orderedHealthScore.sort((a, b) => {
                if (a.healthScore < b.healthScore) return payload === "min-max" ? -1 : 1;
                if (a.healthScore > b.healthScore) return payload === "min-max" ? 1 : -1;
                return 0;
              });
            
            return { ...state, recipes: orderedHealthScore };

        
        case FILTER_SORT_NAME:
            if(action.payload === 'a-z' || action.payload === 'z-a' || action.payload === 'alphabetic'){
                const orderRecipes = [...state.recipes];
                let ordened = []

                if(action.payload === "a-z") {
                    ordened = orderRecipes.sort((a, b) => {
                        const firstRecipe = a.name.toLowerCase();
                        const secondRecipe = b.name.toLowerCase();

                        if (firstRecipe < secondRecipe) {
                            return -1;
                        }
                        if (firstRecipe > secondRecipe) {
                            return 1;
                        }
                        return 0;
                    })
                }

                if(action.payload === "z-a") {
                    ordened = orderRecipes.sort((a, b) => {
                        const firstRecipe = a.name.toLowerCase();
                        const secondRecipe = b.name.toLowerCase();

                        if (firstRecipe < secondRecipe) {
                            return 1;
                        }
                        if (firstRecipe > secondRecipe) {
                            return -1;
                        }
                        return 0;
                    })
                }
                
                if(action.payload === "alphabetic"){
                    return {
                        ...state, recipes: [...state.recipesCopy]
                    }
                }

                return {
                    ...state,
                    recipes: ordened
                };
            }       
            
            case FILTER_BY_DIETS:

                const selectedDiets = action.payload;
              
                if (selectedDiets.length === 0) {
                  return {
                    ...state,
                    recipes: [...state.recipesCopy],
                    currentPage: 1
                  };
                }
              
                const recipesByDiets = state.recipesCopy.filter((recipe) => {
                  if (recipe.diets && recipe.diets.length > 0) {
                    return selectedDiets.every((diet) => recipe.diets.includes(diet));
                  }
                  return false;
                });
                
                console.log(recipesByDiets);
                return {
                  ...state,
                  recipes: recipesByDiets,
                  currentPage: 1
                };    
            

        default: 
            return { ...state };
    }
};

export default rootReducer;