require("dotenv").config();
const { API_KEY, URL } = process.env;
const axios = require('axios');
const { Recipe, Diets } = require('../db');
const { Op } = require('sequelize');


const cleanApiData = (arr) => {

    const clean = arr.map(elem => {

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
    return clean;
}

const cleanDbData = (arr) => {

    const clean = arr.map(elem => {
        
        return{
            id: elem.dataValues.id,
            name: elem.dataValues.name,
            image: elem.dataValues.image,
            summary: elem.dataValues.summary,
            healthScore: elem.dataValues.healthScore,
            diets: elem.dataValues.Diets.map((elem) => elem.name),
            steps: elem.dataValues.steps,
            createInBd: elem.dataValues.createInBd,
        }
    });
    return clean;
}

const getApiRecipes = async () => {
    const apiRecipes = (await axios.get(`${URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    
    const allApiRecipes = cleanApiData(apiRecipes);

    return allApiRecipes;
}

const getDbRecipes = async () => {
    const dbRecipes = await Recipe.findAll({
        include: {
          model: Diets,
          atrributes: ['name'],
          through: {
            atrributes: ['id', 'name'],
          },
        },
    });

    const allDbRecipes = cleanDbData(dbRecipes);
    // console.log(allDbRecipes);
    return allDbRecipes;

};

const getRecipes = async () => {
    const apiRecipes = await getApiRecipes()

    const dbRecipes = await getDbRecipes();

    const response = [...apiRecipes, ...dbRecipes];

   
    // const randomRecipes = [];
    // //Se puede modularizar esto?:
    // for (let i = 0; i < 100; i++) {  //"i < 'x'" --> En 'x' poner la cantidad de recetas qe renderalizaremos
    //     const randomIndex = Math.floor(Math.random() * response.length);
    //     const anyRecipe = response[randomIndex];
    //     randomRecipes.push(anyRecipe);
    // }  
    // return randomRecipes;
    
    return response;

};

const getRecipeById = async (id, source) => {

    if(source === "api"){
        const recipeRaw = await (axios.get(`${URL}/${id}/information?includeNutrition=true&apiKey=${API_KEY}`));

        const recipe = recipeRaw.data;
        // console.log(recipeRaw.data);
        const apiRecipe = {
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions[0]?.steps.map(step => `<b>${step.number}</b> ${step.step}<br>`
            ),
            diets: recipe.diets,
            createInBd: false
        }
        return apiRecipe;
    }
    
    const allDbRecipe = await getDbRecipes();
    const idBdRecipe = allDbRecipe.find(obj => obj.id === id)
    
    return idBdRecipe;
    
    
    //? await (axios.get(`${URL}/${id}/information?apiKey=${API_KEY}`))
    //const recipeRaw = await (axios.get(`${URL}/${id}/information?includeNutrition=true&apiKey=${API_KEY}`));
}

const searchByName = async (title) => {

    if(title){
        const apiRecipes = (await axios.get(`${URL}/complexSearch?apiKey=${API_KEY}&query=${title}&addRecipeInformation=true&number=100`)).data.results;

        const recipesApi = cleanApiData(apiRecipes); 
        
        const dbRecipes = await Recipe.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${title}%`,
                }
            },
            include: {
                model: Diets,
                atrributes: ['name'],
                through: {
                  atrributes: ['id', 'name'],
                },
              }
        });

        const dbRecipe = cleanDbData(dbRecipes);
        
        const response = [...recipesApi, ...dbRecipe];
        
        return response;
    }
}

const createRecipe = async (name, image, summary, healthScore, steps, diets, createInBd ) => { 

    const [ newRecipe, created] = await Recipe.findOrCreate({ 
        where: { name },
        defaults: { name, image, summary, healthScore, steps, createInBd}
     }); 


    if(diets && diets.length > 0) {
        const dietsFound = await Diets.findAll({ 
            where: { name: diets }});

            await newRecipe.setDiets(dietsFound);
        
    }
    return newRecipe;
    
}

const putRecipe = async (id, name, image, summary, healthScore, steps, diets) => {

    const updated =  await Recipe.update({
        name, image, summary, healthScore, steps, diets
      }, { where: {id} });

    return updated;
}

const deleteRecipe = async (id) => {
    await Recipe.destroy({
        where: {
            id: id
        }
    });
    const recipes = await Recipe.findAll();

    return recipes;
}

module.exports = {
    getApiRecipes,
    getDbRecipes,
    getRecipes,
    getRecipeById,
    searchByName,
    createRecipe,
    deleteRecipe,
    putRecipe
}

//getRecipeById:
//&addRecipeInformation=true
//`${URL}/${id}/information?apiKey=${API_KEY}`

//`${URL}/complexSearch?apiKey=${API_KEY}`

// https://api.spoonacular.com/recipes/complexSearch?${API_KEY1}&addRecipeInformation=true&number=10

//${id}/information?apiKey=${API_KEY}

//https://api.spoonacular.com/recipes/complexSearch?query=butter&apiKey=${API_KEY}

//https://jsonplaceholder.typicode.com/users/${id}

// const resultAPI = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`).catch((err)=>err);

    // console.log(id);
    // const recipe = "api" 
    // ? await (axios.get(`https://api.spoonacular.com/recipes/640003/information?apiKey=4bdae221777942beb08f48abc2e64a71`)) 
    // : await Recipe.findByPk(id);
    // return resultAPI;

// const createRecipe = async (name, summary, healthScore, steps) =>
//      await Recipe.create({name, summary, healthScore, steps});                

// module.exports = createRecipe;

/*
ANTES:
const createRecipe = async (name, summary, score, healthScore, steps, dietTypes) => {
    const newRecipe = await Recipe.create({name, summary, score, healthScore, steps, dietTypes});
    return newRecipe;
}

Modularizamos por una cuestion de separar las responsabilidades

Creamos la funcion "createRecipe" para crear una receta. Ésta será async porque va a trabajar con los métodos del modelo (por esto mismo es que importamos el modelo "Recipe"), el modelo trabaja con promesas.
Esta funcion recibira los parametros para crear una nueva receta. 
"Recipe.create()" me devuelve una promesa y es por esto que hacemos un await. Por lo tanto, espero que la promesa se resuelva y el valor de resolucion voy a guardarlo en "newRecipe" y luego lo retorno.

REFACTORIZACION DE CODIGO:
const createRecipe = async (name, summary, score, healthScore, steps, dietTypes) => {
    return await Recipe.create({name, summary, score, healthScore, steps, dietTypes});
}
Y puedo refactorizar aún mas con la funcion flecha, que es como quedo.
*/



/*
const createRecipe = async (name, image, summary, healthScore, steps, diets, createInBd ) => { 
    
    const newRecipe = await Recipe.create({name, image, summary, healthScore, steps, diets, createInBd }); 

    return newRecipe;

    //Esto se puede modulariazar: const createRecipe = async (...) => await Recipe.create({...})
}
*/




/*
const recipe = {
        name,
        image,
        healthScore,
        summary,
        steps,
        diets,
        createInBd
    };
    const dietInfo = await Diets.findAll({
        where: {
            id: diets
        }
    });
    const createRecipe = await Recipe.create(recipe);

    createRecipe.addDiets(dietInfo);

    return Recipe.findAll()


const createRecipe = async (name, image, summary, healthScore, steps, diets, createInBd ) => { 

    const [ newRecipe, created] = await Recipe.findOrCreate({ 
        where: { name },
        defaults: { name, image, summary, healthScore, steps, createInBd},
        // include: [Diets]
     }); 


    if(diets && diets.length > 0) {
        const dietsFound = await Diets.findAll({ 
            where: { name: diets }});

            await newRecipe.setDiets(dietsFound);
        
    }
    return newRecipe;

    //Esto se puede modulariazar: const createRecipe = async (...) => await Recipe.create({...})
}

*/