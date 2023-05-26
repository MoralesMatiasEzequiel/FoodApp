import style from "./Home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { SideBar } from "../../components/SideBar/SideBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";

const Home = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes());
    },[dispatch]);

    return (
        <div>
            <h1 className={style.title}>Home</h1>
            <div>
                <SideBar />        
            </div>
            <div>
                <CardsContainer />
            </div>
        </div>   
    )
}

export default Home;