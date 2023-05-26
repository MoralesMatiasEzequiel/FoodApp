import React from "react";
import style from "./Landing.module.css";
import videoLanding from "../../Images/video-landing-1.mp4"
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <div>
        <div className="video-container">
            <video src={videoLanding} autoPlay muted loop></video>
        </div>
        <div className={style.full}>
            <h1>The art of good eating</h1>
        </div>
        <div className={style.welcome}>
            <Link to="/home">
                <button className={style.welcomeButton}>LETS COOK!</button>
            </Link>
        </div>
        
    </div>
  );
};

export default Landing;