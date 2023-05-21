import style from "./AlphabeticFilter.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterSortName } from "../../redux/actions";

export const SortAlphabeticFilter = () => {
    const dispatch = useDispatch();
    const [ value, setValue ] = useState('')

    const handleSortName = (event) => {
        event.preventDefault();
        dispatch(filterSortName(event.target.value));
        setValue(event.target.value);
      };

    return (
        <div className={style.select}>
            <select onChange={handleSortName} value={value}>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
            </select>
        </div>  
    )
};