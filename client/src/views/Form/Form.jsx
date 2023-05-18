import axios from "axios";
import { useState } from "react";

const Form = () => {

    const [ form, setForm ] = useState({
        email: "",
        name: "",
        phone: ""
    });

    const [ errors, setErrors ] = useState({
        email: "",
        name: "",
        phone: ""
    });
    
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        validate({...form, [property]:value})
        setForm({...form, [property]:value})
    };
    
    const validate = (form) => {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)){
            setErrors({...errors, email: ""})
        }
        else{
            // console.log("asfafas");
            setErrors({...errors, email: "Hay un error en el email"})
        }
        if(form.email === "") setErrors({...errors, email: "Email vacio"})
    }
    //Hacer las demás validaciones para los demas campos.


    const submitHandler = (event) => {
        event.preventDefault()
        axios.post('/recipes', form)
        .then(res => alert(res))
        .catch(err => alert(err))
    }
    
    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="email">Email: </label>
                <input name="email" type="text" value={form.email} onChange={changeHandler}/>
                <span>{errors.email}</span>
            </div>

            <div>
                <label htmlFor="name">Name: </label>
                <input name="name" type="text" value={form.name} onChange={changeHandler}/>
            </div>

            <div>
                <label htmlFor="phone">Phone: </label>
                <input name="phone" type="text" value={form.phone} onChange={changeHandler}/>
            </div>

            <button type="submit">SUBMIT</button>
        </form>
    )
}

export default Form;