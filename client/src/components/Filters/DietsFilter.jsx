import style from "./DietsFilter.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, filterByDiets } from "../../redux/actions";


export const DietsFilter = () => {

    const diets = useSelector((state) => state.diets);
    // const selectedDiets = useSelector((state) => state.selectedDiets);
    const [ selectDiets, setSelectDiets] = useState([]);
    const dispatch = useDispatch();

    useEffect(() =>{
            dispatch(getDiets())
    }, [dispatch]);

    const handleFilterByDiet = (event) => {
        const isSelected = selectDiets.includes(event);
        const updatedDiets = isSelected
          ? selectDiets.filter((diet) => diet !== event)
          : [...selectDiets, event];
        setSelectDiets(updatedDiets);
        dispatch(filterByDiets(updatedDiets));
      };


    return (
        <div className={style.container}>
                <span className={style.title}>Filter by diet: </span>
                <p />
                <div>
                    {diets?.map((diet, index) => (
                        <div className={style.diets} key={diet}>
                            <input
                            type="checkbox"
                            name={diet}
                            value={diet}
                            onChange={(elem) => handleFilterByDiet(elem.target.value)}/>
                            <label key={index} htmlFor={diet}>
                            {diet}
                            </label>
                        </div>
                    ))}
                </div>
        </div>
    )
}

