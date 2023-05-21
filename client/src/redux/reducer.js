import { GET_RECIPES, GET_DIETS, NEXT_PAGE, PREV_PAGE, CHANGE_PAG, SEARCH, FILTER_BY_DIETS, FILTER_SORT_NAME, CREATE_RECIPE } from "./action-types";

const initialState = { //Este es el estado global.
    recipes: [],
    diets: [],
    currentPage: 1,
    search: '',
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
            // console.log(action.payloads);
            // return state.allRecipes=action.payload;
            return { ...state, recipes: action.payload };
        
        case GET_DIETS:
            return { ...state, diets: action.payload };

        case CREATE_RECIPE:
            return { ...state};

        // case FILTER_BY_DIETS:   
        //     const allRecipes = state.recipes
        //     const recipesFilter = action.payload

        //     return {
        //         ...state,

        //     }

        case FILTER_SORT_NAME:
            const allRecipe = [...state.recipes];
            const sortName = allRecipe.sort((a, b) => {
            const firstRecipe = typeof a.name === 'string' ? a.name : '';
            const secondRecipe = typeof b.name === 'string' ? b.name : '';
            if (action.payload === 'a-z') {
            return firstRecipe.localeCompare(secondRecipe);
                } else if (action.payload === 'z-a') {
                return secondRecipe.localeCompare(firstRecipe);
                 } else {
                return 0;
         }
            });
            return {
                 ...state,
                recipes: sortName,
                currentPage: 1  
        }

        default: 
            return { ...state };
    }
};

export default rootReducer;