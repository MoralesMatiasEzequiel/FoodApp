import axios from "axios";
import { GET_RECIPES, GET_DIETS , GET_RECIPES_BY_NAME, NEXT_PAGE, PREV_PAGE, SEARCH, CHANGE_PAG, FILTER_BY_DIETS, FILTER_SORT_NAME, FILTER_RECIPES_SOURCE, FILTER_HEALTHSCORE, DELETE_RECIPE} from "./action-types";

export const nextPage = () => {
    return {
        type: NEXT_PAGE
    }
}
export const prevPage = () => {
    return {
        type: PREV_PAGE
    }
}

export const changePag = (pagenumber) => {
    return {
        type: CHANGE_PAG,
        payload: pagenumber++
    }
};

export const setSearch = (payload) => {  //Qué onda esto?
    return { 
        type: SEARCH,
        payload,
    }
};

export const getRecipes = () => {

    return async (dispatch) => {
        try {
            const { data } = await axios.get('/recipes')
            if(!data.length) throw new Error('No recipes');

            return dispatch({
                type: GET_RECIPES,
                payload: data
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getRecipesByName = (title) => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`/recipes?title=${title}`);
            // console.log(response);
            const { data } = response;

            return dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: data,
            });
            
        } catch (error) {
            alert(`There is no recipe named ${title}`);
        }
    }
}

export const getDiets = () => {

    return async (dispatch) => {

            const { data } = await axios.get(`/diets`);

            return dispatch({ 
                type: GET_DIETS, 
                payload: data
            });       
    };
  };

export const createRecipe = (form) => {
    form.steps = form.steps.split('.').map(step => step.trim());
    // console.log(form);

    return async (dispatch) => {
        const post = await axios.post(`/recipes`, form);
        // console.log(post);

        return post;                 
    };
};

export const deletedRecipe = (payload) => {

    return async (dispatch) => {
        const deleted = await axios.delete(`/recipes/${payload}`);

        return deleted;                 
    };
};

export const filterSortName = (payload) => {
    
    return { type: FILTER_SORT_NAME, payload
    }
};

export const filterRecipes = (source) => {

    return { type: FILTER_RECIPES_SOURCE, payload: source }

};

export const filterByDiets = (payload) => {
    // console.log(payload);
    return {type: FILTER_BY_DIETS, payload };       
};

export const filterHealthScore = (payload) => {

    return { type: FILTER_HEALTHSCORE, payload: payload }
};












// export const getRecipes = () => {
//     return async function (dispatch){
//         const apiData = (await axios.get('http://localhost:3001/recipes'))
//         // .data.results 
        
//         // const recipeApi = apiData.map(elem => {

//         //     //  return{  //No mostrar todos los datos, dejar esto para el Detail.
//         //     //     name: elem.title,
//         //     //     image: elem.image,
//         //     //     healthScore: elem.healthScore,
//         //     //     diets: elem.diets,  
//         //     // }

//         //     return{
//         //         id: elem.id,
//         //         name: elem.title,
//         //         image: elem.image,
//         //         summary: elem.summary,
//         //         healthScore: elem.healthScore,
//         //         diets: elem.diets,  
//         //         steps: elem.analyzedInstructions[0]?.steps.map(step => {
//         //             return `<b>${step.number}</b> ${step.step}<br>`
//         //         }),
//         //         createInBd: false,
//         //     }
//         // });
//         // const recipeApi = {
//         //     id: apiData.id,
//         //     name: apiData.title,
//         //     image: apiData.image,
//         //     summary: apiData.summary,
//         //     healthScore: apiData.healthScore,
//         //     // steps: apiData.analyzedInstructions[0].steps,
//         //     diets: apiData.diets,
//         //     createInBd: false
//         // }

//         // const recipes = recipeApi.data;
//         // console.log(recipeApi);

//         dispatch({ type: GET_RECIPES, payload: apiData});

//     };
// };

// export const getRecipeByID = (id) => {
//     return async function (dispatch){
//         const apiData = await axios.get(`${URL}/${id}/information?includeNutrition=true&apiKey=${API_KEY}`) 
        
//         const recipeApi = apiData.map(elem => {

//             return{
//                 id: elem.id,
//                 name: elem.title,
//                 image: elem.image,
//                 summary: elem.summary,
//                 healthScore: elem.healthScore,
//                 diets: elem.diets,  
//                 steps: elem.analyzedInstructions[0]?.steps.map(step => {
//                     return `<b>${step.number}</b> ${step.step}<br>`
//                 }),
//                 createInBd: false,
//             }
//         });

//         dispatch({ type: GET_RECIPEID, payload: recipeApi});

//     };
// };
