import React from "react";
import { useSelector } from "react-redux";
import MovieItem from "../MovieItem/MovieItem";
import "./Movies.css";

function Movies() {
  const movies = useSelector((state) => state.movies);
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movies__item" key={movie.imdbID}>
          {"Loading..." && <MovieItem {...movie} />}
        </li>
      ))}
    </ul>
  );
}

export default Movies;
