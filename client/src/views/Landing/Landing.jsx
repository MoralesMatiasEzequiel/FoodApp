import React from "react";
import style from "./Landing.module.css";
import videoLanding from "../../Images/video-landing-1.mp4"
// import imgFood from "../../Images/cocina-rustica-2.jpg";
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <div>
        <div className="video-container">
            <video src={videoLanding} autoPlay muted loop></video>
        </div>
        <div className={style.full}>
            {/* <img src={imgFood} /> */}
            <h1>The art of good eating</h1>
            {/* <h3>Recipes and Diets for a Balanced Life</h3> */}
        </div>
        <div className={style.welcome}>
            <Link to="/home">
                <button className={style.welcomeButton}>LETS COOK!</button>
            </Link>
        </div>
        
    </div>
  );
};
//<Link className={style.link} to='home'><button className={style.welcomeButton}>Lets Cook!</button></Link>

export default Landing;