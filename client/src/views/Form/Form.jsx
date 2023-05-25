import style from "./Form.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets } from "../../redux/actions";
import validations from "./validations";
import { useHistory } from "react-router-dom";


const Form = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    
    const diets = useSelector(state => state.diets);

    useEffect(() =>{
        dispatch(getDiets())
    }, [dispatch]);

    const [form, setForm] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: [],  
        image: '',
        diets: [],
        createInBd: true
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        setErrors(validations({
            ...form,
            [event.target.name]: event.target.value
        }))
    };

    const handleChangeDiets= (event) => {
        setForm({
            ...form,
            diets: [...form.diets, event.target.value]
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createRecipe(form))

        alert('Recipe created successfully')    
        history.push(`/home`);

        setForm({
        name: '',
        summary: '',
        healthScore: 0,
        steps: [],  
        image: '',
        diets: [],
        createInBd: true
        })
    };

    const isDisabled =  
    form.name.trim() === '' ||
    form.summary === '' ||
    form.image === '' ||
    form.diets === [];

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.formHeader}>
                    <h1>C<span className={style.formTitle}>reate your recipe</span></h1>
                </div>
            
                <label className={style.label} htmlFor="name">Name: </label>
                <br/>
                <input className={style.input} type='text' name="name" value={form.name} onChange={handleChange} />
                <br/>
                {errors.name && <p className={style.errors}>{errors.name}</p>}           
            
                <label className={style.label} htmlFor="summary">Summary: </label>
                <br/>
                <textarea className={style.textarea} name="summary" value={form.summary} onChange={handleChange} cols="30" rows="10"/>
                <br/>
                {errors.summary && <p className={style.errors}>{errors.summary}</p>}          
            
                <label className={style.label} htmlFor="healtScore">HealthScore: </label>
                <br/>
                <input className={style.input} name="healthScore" type='number' pattern="^[0-9]\d*$" max='100' min='0' value={form.healthScore} onChange={handleChange}></input>
                <br/>
                {errors.healthScore && <p className={style.errors}>{errors.healthScore}</p>}
            
                <label className={style.label} htmlFor="steps">Steps: </label>
                <br/>
                <textarea className={style.textarea} name="steps" value={form.steps} onChange={handleChange} />
                <br/>
                {errors.steps && <p className={style.errors}>{errors.steps}</p>}
            
                <label className={style.label} htmlFor="image">Image: </label>
                <br/>
                <input className={style.input} type='text' name="image" value={form.image} onChange={handleChange}></input>
                <br/>
                {errors.image && <p className={style.errors}>{errors.image}</p>}
                
                <span>Diets: </span>
                <div className={style.containerInputs}>
                    {diets?.map((diet, index) => (
                        <label className={style.label} key={index} htmlFor={diet}>
                            <input 
                                type="checkbox"
                                name={diet}
                                value={diet}
                                onChange={handleChangeDiets}
                                />
                        {" "}{diet}                            
                        </label>
                    ))}
                </div>
                    <br/>
                    {errors.diets && <p className={style.errors}>{errors.diets}</p>}
                <button className={style.button} type="submit" disabled={isDisabled}>Create recipe!</button>  
            </form>
        </div>

    );

};

export default Form;
