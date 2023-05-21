const { Router } = require('express');
const { getRecipesHandler, getRecipeDetailHandler, getNameRecipeHandler, createRecipeHandler, updateHandler, deleteRecipeHandler } = require('../handlers/recipesHandlers')

const recipeRouter = Router();

const validate = (req, res, next) => {
    const { name, image, summary, healthScore, steps, diets, createInBd } = req.body;
    if(!name) return res.status(400).json({ error: "Missing name"});
    if(!image) return res.status(400).json({ error: "Missing image"});
    if(!summary) return res.status(400).json({ error: "Missing summary"});
    if(!healthScore) return res.status(400).json({ error: "Missing healthScore"});
    if(!steps) return res.status(400).json({ error: "Missing steps"});
    if(!diets) return res.status(400).json({ error: "Missing diets" });
    // if(!createInBd) return res.status(400).json({ error: "Missing createInBd"});

    next();
}
/*Tambien puede ser:
if(!name || !name.trim() || !difficulty || !season ){
            throw new Error('Data missing');
        };
*/

recipeRouter.get('/:id', getRecipeDetailHandler);  //:idRecipe

recipeRouter.get('/', getNameRecipeHandler);

recipeRouter.get('/', getRecipesHandler); //Traemos todas las recetas

recipeRouter.post('/', validate, createRecipeHandler);

recipeRouter.put('/', validate, updateHandler);

recipeRouter.delete('/:id', deleteRecipeHandler);


module.exports = recipeRouter;


//Flow y explicacion de la funcion validate(): repaso clase 3 (1hs:30min). Las validaciones se hacen en el front y en el back. A la BD tiene que llegar toda la info bien clara.