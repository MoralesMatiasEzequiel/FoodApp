import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <div>
                <Link to="/home">HOME</Link>
                <Link to="/create">CREATE RECIPE</Link>
            </div>
        </div>

    )
}

export default NavBar;