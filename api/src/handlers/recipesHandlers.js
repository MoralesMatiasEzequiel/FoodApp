const { getRecipes, getApiRecipes, getDbRecipes, getRecipeById, searchByName, createRecipe, putRecipe, deleteRecipe } = require('../controllers/recipesControllers');

const getRecipesHandler = async (req, res) => {

    try {
        const allRecipes = await getRecipes();

        res.status(200).send(allRecipes);

    } catch (error) {
        res.status(400).send({ error: error.message});
    }
};

const getApiRecipesHandler = async (req, res) => {

    try {
        const apiRecipes = await getApiRecipes();

        res.status(200).send(apiRecipes);

    } catch (error) {
        res.status(400).send({ error: error.message});
    }
}

const getDbRecipesHandler = async (req, res) => {

    try {
        const dbRecipes = await getDbRecipes();

        res.status(200).send(dbRecipes);

    } catch (error) {
        res.status(400).send({ error: error.message});
    }
}

const getRecipeDetailHandler = async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id) ? "bdd" : "api";

    try {
        const recipe = await getRecipeById(id, source);
        // console.log({recipe}.recipe.config);

        if(source === 'bdd'){ return res.status(200).json({recipe}.recipe);}

        
        res.status(200).json({recipe}.recipe); //Antes: "res.status(200).json({recipe});"  Para la db: res.status(200).json({recipe}.recipe)  Para la api;

        // res.status(200).json({recipe: recipe.data}.recipe);        

    } catch (error) {
        res.status(400).send({ error: error.message, description: `No se ha encontrado el ID '${id}'`}); //Hacerlo en ingles.
    }
};

const getNameRecipeHandler = async (req, res) => {

    const { title } = req.query;  

    try {
        
        const result = title ? await searchByName(title) : await getRecipes();
        // console.log(result);

        if(result.length === 0){
            return res.status(400).send(`No se encontraron recetas con ese nombre: "${title}"`);
        }

        res.status(200).send(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createRecipeHandler = async (req, res) => {
    
    const { name, image, summary, healthScore, steps, diets, createInBd } = req.body; 

    try {
        if (!name || !image || !summary || !healthScore || !steps || !createInBd) {
            return res.status(400).json({ error: 'Missing required data' });
        }

        const newRecipe = await createRecipe(name, image, summary, healthScore, steps, diets, createInBd);
        
        res.status(201).json(newRecipe);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateHandler = async (req, res) => {
    const { id, name, image, summary, healthScore, steps, diets } = req.body;
    try {
      if(!id) throw Error('Missing ID')
    
      const recipeUpdated = await putRecipe(id, name, image, summary, healthScore, steps, diets);
    //   await Recipe.update({
    //     name, image, summary, healthScore, steps, diets
    //   }, { where: {id} });

      res.status(200).send(recipeUpdated);

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
};

const deleteRecipeHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteRecipe(id);
        // const result = id ? await deleteRecipe(id) : res.status(500).send('Ingrese el ID que desea eliminar');

        return res.status(200).json(result)

    } catch (error) {
       return res.status(500).json({ error: error.message, description: `Ingrese correctamente el ID que desea eliminar` }) //Hacerlo en ingles.
    }
};

module.exports = {
    getRecipesHandler,
    getApiRecipesHandler,
    getDbRecipesHandler,
    getRecipeDetailHandler,
    getNameRecipeHandler,
    createRecipeHandler,
    updateHandler,
    deleteRecipeHandler
};


/*
"await createRecipe()" como esta funcion es una promesa debo esperar a que la resuelva (await), por esto pongo el async.

"res.status(201).json(newRecipe);" Status 201 es de creado.

"catch (error) {
        res.satatus(400).json({ error: error.message });
}" con este catch evitamos que rompa la base de datos al ingresar mal los datos. Si hay un error en el controllers, buscara el catch mas cercano, en este caso va a ser este el que encuentre.

"const recipe = await getRecipeById(id); 
    res.status(200).json(recipe); " 
La funcion "getRecipeById()" de typo async


"const getRecipeDetailHandler = async (req, res) => {
    const { id } = req.params;

    try {
    const recipe = await getRecipeById(id, source); 
    res.status(200).json(recipe);    
    } catch (error) {
        res.status(400).json({ error: error.message })
    }"
Tengo que averiguar si la id viene de la BDD (de tipo UUDI) o de la API (de tipo number).
"isNan" = No es un numero.
const source = isNaN(id) ? "bdd" : "api;"  // Con este ternario me pregunto si lo que tengo por parametro (id) no es un numero? se guardara en source "bdd", si es un numero se guarda "api".
Al metodo "getRecipeById()" ademas de pasarle ID le pasamos "source" para que verifique el tipo de id que viene.

ANTES:
const createRecipeHandler = async (req, res) => {
    const { name, summary, healthScore, steps } = req.body;
    try {

        const newRecipe = await createRecipe(name, summary, healthScore, steps);
        
        res.status(201).json(newRecipe);

    } catch (error) {
        res.satatus(400).json({ error: error.message });
    }
    
    
}
*/