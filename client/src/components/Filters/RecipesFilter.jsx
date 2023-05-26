import style from "./RecipesFilter.module.css";
import { useDispatch } from "react-redux";
import { filterRecipes } from "../../redux/actions";


export const RecipesFilter = () => {

    const dispatch = useDispatch();

    const handleFilterBySource = (source) => {
        dispatch(filterRecipes(source));
    };

    return (
        <div className={style.select}>
            <select defaultValue="allRecipes" onChange={(event) => handleFilterBySource(event.target.value)}>
                <option value="allRecipes">All recipes</option>
                <option value="apiRecipes">Api recipes</option>
                <option value="dbRecipes">Database recipes</option>
            </select>
        </div>
    )
}