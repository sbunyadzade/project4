import React  from 'react';
import { useDispatch } from 'react-redux';
import './MovieItem.css';

function MovieItem({ Title, Year, Poster, imdbID })  {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch({type:"ADD_FAVORITE", payload: {Title, Year, imdbID}});
    }
    const handleDelete = () => {
        dispatch({type:"DELETE_MOVIE", payload: {imdbID}});
    }
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={handleClick}>Добавить в список</button>
                    <button type="button" className="movie-item__delete-button" onClick={handleDelete}>X</button>
                </div>
            </article>
        );
    }

 
export default MovieItem;