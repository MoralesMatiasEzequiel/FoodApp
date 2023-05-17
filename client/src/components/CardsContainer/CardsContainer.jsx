import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css"    
const CardsContainer = () => {
    
    // const users = [
    //     {
    //         id: "877b56de-33b9-4d5c-aca4-214c72f3cfad",
    //         name: "Diego mama guevo",
    //         image: "https://diegomamaguevo.com/recipeImages/639794-312x231.jpg",
    //         summary: "Choclo con carne y pasas de uva",
    //         healthScore: 100,
    //         steps: [
    //           "In a medium saucepan, bring 1 1/2 cups water to a boil."
    //         ],
    //         diets: ["65dd3d79-ae2e-4e85-b738-66322bf29797"],
    //         createInBd: true
    //       },
    //       {
    //         id: "asdasd6de-33b9-4d5c-aca4-214asfasfafasf3cfad",
    //         name: "FEfefef",
    //         image: "https://diegomamaguevo.com/recipeImages/639794-312x231.jpg",
    //         summary: "Choclo con carne y pasas de uva",
    //         healthScore: 100,
    //         steps: [
    //           "In a medium saucepan, bring 1 1/2 cups water to a boil."
    //         ],
    //         diets: ["65dd3d79-ae2e-4e85-b738-66322bf29797"],
    //         createInBd: true
    //       }
    // ];
 
    const recipes = useSelector(state => state.recipes)    
    // console.log(recipes);
    return (
        <div className={style.container}>
            {recipes.map(recipe => {
                return <Card 
                    id={recipe.id}
                    name={recipe.name}
                    image={recipe.image}
                    summary={recipe.summary}
                    healthScore={recipe.healthScore}
                    diets={recipe.diets}
                    steps={recipe.steps.map(step => {
                        return `<b>${step.number}</b> ${step.step}<br>`
                    })}
                    createInBd={recipe.createInBd}
                />
            })}
        </div>
    )
}

export default CardsContainer;

/*
  {recipes.map(user => {
                return <Card        
                />
            })}
*/