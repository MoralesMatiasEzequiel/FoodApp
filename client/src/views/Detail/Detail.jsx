import style from "./Detail.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {

    const { id } = useParams();
    const [recipes, setRecipes] = useState({});

    useEffect(() => {
        axios(`recipes/${id}`)
        .then(({ data } ) => {
            if(data.name){
                setRecipes(data);
            } else{
                alert(`We dont have recipes with this ${id} number`)
            }
        })
        return setRecipes({});
    }, [id]);
    
    const createMarkup = (html) => {
        return { __html: html };
    };

    const renderSteps = () => {
        if(Array.isArray(recipes.steps)) {
            return recipes.steps.map((step) => (
                <div className={style.stepContainer}>
                    <p className={style.step}dangerouslySetInnerHTML={createMarkup(step)} />
                </div>
            ));
        }
        return null;
      };

    const renderDiets = () => {
        if (Array.isArray(recipes.diets)) {
            return recipes.diets.join(", ");
        }
        return null;
    };

    return (
        <div className={style.container}>
            <div className={style.imgContainer}>
                <img className={style.img} src={recipes?.image} alt="img not found" />
            </div>
            <div className={style.detail}>
                <h1>{recipes?.name}</h1>
                <h3>ID N°{recipes?.id}</h3>
                <label htmlFor="summary">Summary:</label>
                <p dangerouslySetInnerHTML={createMarkup(recipes?.summary)} />
                {/* <p>{console.log()}</p> */}
                <label htmlFor="healthScore">Health score: {recipes?.healthScore}</label>
                <p/>
                <label className={style.stepNumber}>Steps to cook: </label>
                <div className={style.containerStep}>{renderSteps()}</div>
                <label htmlFor="diets">Diet Types: {renderDiets()}</label>
            </div>
        </div>
  );
};

export default Detail;


