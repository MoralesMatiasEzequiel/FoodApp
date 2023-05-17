import style from "./Card.module.css";

const Card = (props) => {
    return (
        <div className={style.card}>
            <p>Name: {props.name}</p>
            <p>summary: {props.summary}</p>
            <p>healthScore: {props.healthScore}</p>
            <p>steps: {props.steps}</p>
        </div>
    )
}

export default Card;