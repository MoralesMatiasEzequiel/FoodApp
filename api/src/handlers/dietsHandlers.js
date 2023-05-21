const getAllDiets = require('../controllers/dietsControllers');


const getDietsHandler = async (req, res) => {
    // const { name } = r.query; //Por query?
    // const results = getAllDiets(/*Lo que buscamos*/);
    try {
        
        const dietsApi = await getAllDiets();
        // console.log(dietsApi);
        return res.status(200).json(dietsApi);
    } catch (error) {
        return res.status(500).json({error: error.message});        
    }; 
}



module.exports = getDietsHandler;

 // const dietsApix = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`)
        // const dietArray = dietsApix.data.results?.map((recipe) => recipe.diets);
        // const dietsEach = dietArray.flat();
        // const diets = [...new Set(dietsEach)];
        // console.log(diets);

        // diets.forEach((diet) => {
        //     Diets.findOrCreate({
        //         where: {
        //             name: diet,
        //         }
        //     })
        // })