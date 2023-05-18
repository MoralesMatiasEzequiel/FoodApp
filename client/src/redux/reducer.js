import { GET_RECIPES, NEXT_PAGE, PREV_PAGE } from "./action-types";

const initialState = { //Este es el estado global.
    currentPage: 1,
    recipes: [],
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

        case GET_RECIPES:
            // console.log(action.payloads);
            // return state.allRecipes=action.payload;
            return { ...state, recipes: action.payload };

        default: 
            return { ...state };
    }
};

export default rootReducer;