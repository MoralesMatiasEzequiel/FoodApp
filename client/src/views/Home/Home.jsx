import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Paginado from "../../components/Paginado/Paginado";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";

const Home = () => {
    
    const dispatch = useDispatch();

    //Paginado:
    // const allRecipes = useSelector ((state) => state.recipes)
    // const [currentPage, setCurrentPage] = useState(1);
    // const [recipesPerPage, setRecipesPerPage] = useState(9);
    // const indexOfLastRecipes = currentPage * recipesPerPage;
    // const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
    // const currentRecipes = allRecipes.slice(indexOfFirstRecipes, indexOfLastRecipes);

    // const paginado = (pageNumber) => {
    //     setCurrentPage(pageNumber)
    // };

    useEffect(() => {
        dispatch(getRecipes());
    },[dispatch]);

    return (
        <div>
            <h1>Home</h1>
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value="alfabetico">A-Z</option>
                    <option value="alfabeticoReves">Z-A</option>

                </select>
                <select>
                    <option value="healtScore">HealthScore</option>
                </select>
                <select>
                    <option value="diets">Tipo de dieta</option>
                </select>
                <select>
                    <option value="createRecipe">Receteas creadas</option>
                    <option value="apiRecipe">Recetas de la api</option>
                    <option value="allRecipes">Todas las recetas</option>
                </select>
                {/* <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado} /> */}
            </div>
            <CardsContainer />
        </div>   
    )
}

export default Home;