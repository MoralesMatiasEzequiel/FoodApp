import style from "./HealthScoreFilter.module.css";
import { useDispatch } from 'react-redux';
import { filterHealthScore } from "../../redux/actions";

export const HealthScoreFilter = () => {

    const dispatch = useDispatch();

    const handleFilterHealthScore = (event) => {
        dispatch(filterHealthScore(event));
    };

    return (
        <div className={style.select}>
            <select defaultValue="healthScore" onChange={(event) => handleFilterHealthScore(event.target.value)}>
                <option value="healthScore">Health Score</option>
                <option value="min-max">Min-max</option>
                <option value="max-min">Max-min</option>
            </select>
        </div>
    )   
}