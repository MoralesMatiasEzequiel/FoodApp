import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import style from "./CardsContainer.module.css"    


const CardsContainer = () => {
 
    const recipes = useSelector(state => state.recipes)   
    const { currentPage } = useSelector(state => state)

    let start = (currentPage - 1) * 9;
    let end = currentPage * 9;
    let cantPages = Math.floor(recipes.length / 9);
    let viewRecipes = recipes.slice(start,end);

   
    return (
        <div>
            
            <Paginado cantPages={cantPages}></Paginado> 
            <div className={style.container}>
                {viewRecipes && viewRecipes.map(recipe => {
                    return <Card
                        key={recipe.id}
                        id={recipe.id}
                        name={recipe.name}
                        image={recipe.image}
                        summary={recipe.summary}
                        healthScore={recipe.healthScore}
                        diets={recipe.diets}
                        steps={recipe.steps?.map(step => {
                            return `<b>${step.number}</b> ${step.step}<br>`
                        })}
                        createInBd={recipe.createInBd}
                    />  
                })}
            </div>
        </div>
    )
}

export default CardsContainer;
