import style from "./SideBar.module.css";
import React from "react";
import { useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { SortAlphabeticFilter } from "../Filters/SortAlphabeticFilter";

export const SideBar = () => {
    const dispatch = useDispatch();

    return (
        <SortAlphabeticFilter />
    )
    
}
