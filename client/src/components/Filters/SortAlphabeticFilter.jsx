import style from "./SortAlphabeticFilter.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterSortName } from "../../redux/actions";

export const    SortAlphabeticFilter = () => {
    const dispatch = useDispatch();
    const [ value, setValue ] = useState('')

    const handleSortName = (event) => {
        event.preventDefault();
        dispatch(filterSortName(event.target.value));
        setValue(event.target.value);
      };

    return (
        <div className={style.select}>
            <select defaultValue="alphabetic" onChange={handleSortName}>
                <option value="alphabetic">Alphabetical order</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
            </select>
        </div>  
    )
};