import style from "./Detail.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deletedRecipe } from "../../redux/actions";

const Detail = () => {

    const { id } = useParams();
    const dispatch = useDispatch()

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
                    <p className={style.step} dangerouslySetInnerHTML={createMarkup(step)} />
                </div>
            ));
        }
        else {return <p>No steps to cook</p>}
    };

    const renderDiets = () => {
        if (Array.isArray(recipes.diets)) {
            return recipes.diets.join(", ");
        }
        return null;
    };

    const handleDelete = () => {
        dispatch(deletedRecipe(id))
        alert('Recipe successfully removed')
    }

    return (
        <div className={style.container}>
            <div className={style.imgContainer}>
                <img className={style.img} src={recipes?.image} alt="img not found" />
            </div>
            <div className={style.detail}>
                <h1 className={style.name}>{recipes?.name}</h1>
                <h3 className={style.id}>ID N°{recipes?.id}</h3>
                <label className={style.titulos} htmlFor="summary">Summary:</label>
                <p className={style.texto} dangerouslySetInnerHTML={createMarkup(recipes?.summary)} />
                <label className={style.titulos} htmlFor="healthScore">Health score: {recipes?.healthScore}</label>
                <p/>
                <label className={style.titulos}>Steps to cook: </label>
                <div className={style.texto}>{renderSteps()}</div>
                <label className={style.titulos} htmlFor="diets">Diet Types: {renderDiets()}</label>
            </div>
            <div >
                {id?.length > 30 &&
                <Link to='/home'>
                    <button className={style.buttonDelete} onClick={handleDelete}>Delete Recipe</button>
                </Link>}
            </div>
        </div>
  );
};

export default Detail;


