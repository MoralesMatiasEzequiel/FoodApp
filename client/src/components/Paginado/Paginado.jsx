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







// import style from "./Paginado.module.css";
// import React from 'react';

// const Paginado = ({recipesPerPage, allRecipes, paginado}) => {
//     const pageNumber = [];

//     for (let i = 0; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
//         pageNumber.push(i)
//     };

//     return (
//         <nav>
//             <ul className={style.paginado}>
//                 {pageNumber && pageNumber.map(number => {
//                     <li className={style.number} key={number}>
//                         <a onClick={() => paginado(number)}>{number}</a>
//                     </li>
//                 })}
//             </ul>
//         </nav>
//     )
// }

// export default Paginado;

//En la linea 14 cambiar las {} del .map por () hace que se vea un 0 y 1 en pantalla (pi).