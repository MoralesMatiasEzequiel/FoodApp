// import style from "./Form.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets } from "../../redux/actions";
import validations from "./validations";


const Form = () => {

    const dispatch = useDispatch();
    
    const diets = useSelector(state => state.diets);
    // console.log(diets);

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

    const handleDiets = (event) => {
        if(event.target.checked){

            setForm({
                ...form,
                diets: [...form.diets, event.target.value]
            })
    
            setErrors(validations({
                ...form,
                diets: [...form.diets, event.target.value]
            },
            ))
        } else {
            setForm({
                ...form,
                diets: form.diets.filter(t => t !== event.target.value)
            })
    
            setErrors(validations({
                ...form,
                diets: form.diets.filter(t => t !== event.target.value)
            }))
        }
    } 

    const isDisabled =  
    form.name.trim() === '';
    // form.difficulty === '' ||
    // form.season === '' ||
    // form.countries.length === 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createRecipe(form))
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <br/>
                    <input type='text' name="name" value={form.name} onChange={handleChange} />
                    <br/>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="summary">Summary: </label>
                    <br/>
                    <textarea name="summary" value={form.summary} onChange={handleChange}/>
                    <br/>
                    {errors.summary && <p>{errors.summary}</p>}
                </div>
                <div>
                    <label htmlFor="healtScore">HealthScore: </label>
                    <br/>
                    <input name="healthScore" type='number' pattern="^[0-9]\d*$" max='100' min='0' value={form.healthScore} onChange={handleChange}></input>
                    <br/>
                    {errors.healthScore && <p>{errors.healthScore}</p>}
                </div>
                <div>
                    <label htmlFor="steps">Steps: </label>
                    <br/>
                    <textarea name="steps" value={form.steps} onChange={handleChange} />
                    <br/>
                    {errors.steps && <p>{errors.steps}</p>}
                </div>
                <div>
                    <label htmlFor="image">Image: </label>
                    <br/>
                    <input type='text' name="image" value={form.image} onChange={handleChange}></input>
                    <br/>
                    {errors.image && <p>{errors.image}</p>}
                </div>
                <span>Diets: </span>
                <div>
                    {diets?.map((diet, index) => (
                        <label key={index} htmlFor={diet}>
                            {diet}
                            {/* <>{console.log(diet)}</> */}
                            <input
                                type="checkbox"
                                name={diet}
                                value={diet}
                                onChange={handleDiets}/>
                        </label>
                    ))}
                    <br/>
                    {errors.diets && <p>{errors.diets}</p>}
                </div>
                <button type="submit" disabled={isDisabled}>Creates!</button>                           
            </form>
        </div>

    );

};

export default Form;
