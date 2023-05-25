import style from './SearchBar.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes, getRecipesByName } from '../../redux/actions';

const SearchBar = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSearch = async () => {
        dispatch(getRecipesByName(name))
        setError('');
    }

    const handleBack = () => {
        dispatch(getRecipes());
        setError('');
        setName('');
    };

    return ( 
        <div>
            <div className={style.container}>
            <input className={style.searchInput} type='search' name="search" onChange={handleChange} value={name} placeholder="Search recipes..." autoComplete="off"/>         
            </div>
            <div>
                {name.length > 0 && <button className={style.buttonSearch} onClick={handleSearch}>
                Buscar</button>
                }
                {name.length > 0 && <button className={style.buttonAllRecipes} onClick={handleBack}>All recipes</button>
                }
                {error && <div>{error}</div>}
            </div>   
        </div>    
    );

}

export default SearchBar;