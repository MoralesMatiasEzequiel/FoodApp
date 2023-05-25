import style from "./SideBar.module.css";
import React from "react";
import { useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { SortAlphabeticFilter } from "../Filters/SortAlphabeticFilter";
import { RecipesFilter } from "../Filters/RecipesFilter";
import { HealthScoreFilter } from "../Filters/HealthScoreFilter";
import { DietsFilter } from "../Filters/DietsFilter";

export const SideBar = () => {
    const dispatch = useDispatch();

    return (
        <div className={style.container}>
            <div className={style.selects}>
                <SortAlphabeticFilter />
            </div>
            <div className={style.selects}>
                <RecipesFilter />
            </div>
            <div className={style.selects}>
                <HealthScoreFilter />
            </div>
            <div>
                <DietsFilter />
            </div>
        </div>     
    )
    
}
