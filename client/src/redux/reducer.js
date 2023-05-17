import { GET_RECIPES } from "./action-types";

const initialState = { //Este es el estado global.
    recipes: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_RECIPES:
            // console.log(action.payloads);
            // return state.recipes=action.payload;
            return { ...state, recipes: action.payload };

        default: 
            return { ...state };
    }
};

export default rootReducer;