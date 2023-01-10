import React, { useState } from "react";
import "./ListPage.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ListPage() {
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`) // TODO: запрос к сервер на получение списка
      .then((promize) => promize.json())
      .then((data) => {
        console.log(data.movies);
        let requests = data.movies.map((movie) =>
          fetch(`http://www.omdbapi.com/?i=${movie}&apikey=b0f07e2f`)
        ); // TODO: запросы к серверу по всем imdbID
        Promise.all(requests).then((responses) =>
          Promise.all(responses.map((r) => r.json())).then((data) =>
            setMovies(data)
          )
        );
      });
  }, []);

  return (
    <div className="list-page">
      <h1 className="list-page__title">Мой список</h1>
      {"Loading..." && <ul>
        { movies.map((item) => {
          return (
            <li key={item.imdbID}>
              { <a
                href={`http://www.imdb.com/title/${item.imdbID}/`}
                rel="noreferrer"
                target="_blank"
              >
                {item.Title} ({item.Year})
              </a>}
            </li>
          );
        })}
      </ul>}
    </div>
  );
}

export default ListPage;
