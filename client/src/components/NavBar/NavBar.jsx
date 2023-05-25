import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePag, setSearch } from "../../redux/actions";
import SearchBar from "../Filters/SearchBar";


const NavBar = () => {

    const dispatch = useDispatch();

    const handleChange = (event) => { 
        event.preventDefault()
        dispatch(changePag(1))
        dispatch(setSearch(event.target.value))
    }

    const handleHomeButton = () => {
        dispatch(changePag(1))
    }

    return (
        <nav className={style.nav}>
            <div>
                <div className={style.searchBar}>
                    <SearchBar handleChange={handleChange}/>
                </div>
                <div>
                    <Link to='/home'><button className={style.homeButton} onClick={handleHomeButton}>HOME</button></Link>
                    <Link to='/create'><button className={style.createRecipeButton}>CREATE RECIPE</button></Link>
                </div>
            </div>
        </nav>
    ) 
}

export default NavBar;