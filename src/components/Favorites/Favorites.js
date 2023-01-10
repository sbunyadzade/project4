import React, { useState } from "react";
import "./Favorites.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Favorites() {
  const [list, setList] = useState("");
  const [linkTo, setLink] = useState("");

  const changeList = (e) => {
    setList(e.currentTarget.value);
  };
  const idControl = useSelector((state) => {
    return state.filmListID;
  });
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const removeFromFavorites = (e) => {
    dispatch({
      type: "DELETE_FAVORITE",
      payload: { imdbID: e.currentTarget.id },
    });
  };
  const saveList = async () => {
    let moviesList = {
      title: "",
      movies: [],
    };
    moviesList.title = list;
    moviesList.movies = favorites.map((elem) => elem.imdbID);

    console.log(moviesList);

    let response = await fetch(
      "https://acb-api.algoritmika.org/api/movies/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(moviesList),
      }
    );

    let result = await response.json();

    setLink(result.id);

    console.log("control id-", idControl);
  };

  return (
    <div className="favorites">
      <input value={list} onChange={changeList} className="favorites__name" placeholder="Название списка"/>
      <ul className="favorites__list">
        {favorites.map((item) => {
          return (
            <li key={item.imdbID} className="favorites__strings">
              {item.Title} ({item.Year})
              <button onClick={removeFromFavorites} id={item.imdbID}>
                X
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" className="favorites__save" onClick={saveList} disabled={!list} hidden={linkTo}>
        Сохранить список
      </button>
      {linkTo && <Link to={`/list/${linkTo}`}>Перейти в мой список: {list}</Link>}
    </div>
  );
}

export default Favorites;
