import axios from "axios";
import { GET_RECIPES, GET_RECIPEID } from "./action-types";


const URL = "https://api.spoonacular.com/recipes";
const API_KEY = "899a64dd68724c03a8330d65ca462226";

export const getRecipes = () => {
    return async function (dispatch){
        const apiData = (await axios.get(`${URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)).data.results 
        
        const recipeApi = apiData.map(elem => {

            //  return{  //No mostrar todos los datos, dejar esto para el Detail.
            //     name: elem.title,
            //     image: elem.image,
            //     healthScore: elem.healthScore,
            //     diets: elem.diets,  
            // }

            return{
                id: elem.id,
                name: elem.title,
                image: elem.image,
                summary: elem.summary,
                healthScore: elem.healthScore,
                diets: elem.diets,  
                steps: elem.analyzedInstructions[0]?.steps.map(step => {
                    return `<b>${step.number}</b> ${step.step}<br>`
                }),
                createInBd: false,
            }
        });
        // const recipeApi = {
        //     id: apiData.id,
        //     name: apiData.title,
        //     image: apiData.image,
        //     summary: apiData.summary,
        //     healthScore: apiData.healthScore,
        //     // steps: apiData.analyzedInstructions[0].steps,
        //     diets: apiData.diets,
        //     createInBd: false
        // }

        // const recipes = recipeApi.data;
        // console.log(recipeApi);

        dispatch({ type: GET_RECIPES, payload: recipeApi});

    };
};

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
