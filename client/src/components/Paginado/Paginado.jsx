import { useDispatch, useSelector } from "react-redux";
import style from "./Paginado.module.css";
import React from 'react';
import { nextPage, prevPage } from "../../redux/actions";

const Paginado = ({ cantPages }) => {
    const { currentPage } = useSelector((state) => state);
    const dispatch = useDispatch();

    const next = () => {
        dispatch(nextPage())
    }

    const prev = () => {
        dispatch(prevPage())
    }

    return (
        <div className={style.pagination}>
            {currentPage > 1 ? (
                <div>
                    <button onClick={prev}>{"<"}</button>
                    <button onClick={prev}>{currentPage - 1}</button>
                </div>
            ) : null}   
            <button className={style.active}>{currentPage}</button>
            {currentPage < cantPages ? (
                <div>
                    <button onClick={next}>{currentPage + 1}</button>
                    <button onClick={next}>{">"}</button>
                </div>
            ) : null}    
        </div>
    )
}

export default Paginado;

