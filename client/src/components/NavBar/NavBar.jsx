import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePag, setSearch } from "../../redux/actions";


const NavBar = () => {

    const dispatch = useDispatch();

    const handleChange = (event) => { 
        event.preventDefault()
        dispatch(changePag(1))
        dispatch(setSearch(event.target.value))
    }

    return (
        <nav className={style.nav}>
            <div>
                <div className={style.searchBar}>
                    {/* <SearchBar handleChange={handleChange}/> */}
                </div>
                <div className={style.mainContainer}>
                    <div>
                        <Link to="/home">HOME</Link>
                        <Link to="/create">CREATE RECIPE</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;