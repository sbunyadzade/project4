import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";

import App from "./App";

const defaultState = {
  movies: [],
  favorites: []
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      const alreadyExists = state.movies.find(
        (elem) => elem.imdbID === action.payload.imdbID
      );
      return alreadyExists
        ? state
        : { ...state, movies: [...state.movies, action.payload] };
    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter(
          (elem) => elem.imdbID !== action.payload.imdbID
        ),
      };

    case "ADD_FAVORITE":
      const alreadyExistsFavorit =  state.favorites.find((elem) => elem.imdbID === action.payload.imdbID);
      return alreadyExistsFavorit 
        ? state
        : { ...state, favorites: [...state.favorites, action.payload] };
    case "DELETE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (elem) => elem.imdbID !== action.payload.imdbID
        ),
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
