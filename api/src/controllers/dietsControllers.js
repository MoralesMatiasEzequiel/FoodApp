const { Diets } = require('../db');
const axios = require('axios');
require("dotenv").config();
const { API_KEY, URL } = process.env;


const cleanData = (arr) => { //Creo que esto se puede refactorizar.
    const clean = arr.map(recipe => recipe.diets
    );
    return clean;
}

const getAllDiets = async () => {
    // const databaseDiets = await Diets.findAll();  //Antes: const databaseDiets = await Diets.findAll({where: { diets }});
    // console.log(databaseDiets);
    const apiDietsRaw = (  //Aqui va a llegar toda la data de la api (URL), y va a llegar con mucha informacion. A esta la pasaremos por un filtro para descartar la info que esta demas.
        await axios.get(`${URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    ).data.results;

    const apiDiets = cleanData(apiDietsRaw).flat() //Este sera el filtro.

    // const dietsEach = dietArray.flat();
    const diets = [...new Set(apiDiets)];
    // console.log(diets);  

    diets.forEach((diet) => {
        Diets.findOrCreate({
            where: {
                name: diet,
            }
        })
    })

    return diets;
};


module.exports = getAllDiets;



//Antes:
// const cleanData = (arr) => {
//     const clean = arr.map(recipe => 
//         {
//         return{
//             /*
//             Aqui van a ir las propiedades que querramos mostrar. Aqui se produce el filtro.
//             Ej:
//             name: elem.name,
//             ingredientes: elem.ingredientes,
//             etc...,
//             created: false   //Esto es para marcar que la dieta que queremos mostrar no es creada por nosotros (no viene de la base de datos), sino fue creada por la api.
//             */
//         }
//     }
//     );
//     return clean;

//     /*Modularizacion del mapeo:
//     const cleanData = (arr) => 
//         arr.map((elem) => {
//             return {
//                 name: elem.name,
//                 etc...
//             };
//         });    
//     */
// }