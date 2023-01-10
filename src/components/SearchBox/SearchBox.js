import React  from "react";
import { useState } from "react";
import "./SearchBox.css";
import { useDispatch } from "react-redux";

function SearchBox() {
  const [searchLine, setSearch] = useState("");
  const dispatch = useDispatch();

  const searchLineChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  const searchBoxSubmitHandler = (e) => {
    e.preventDefault();
  };
  const onButtonClick = () => {
    fetch("http://www.omdbapi.com/?s=" + searchLine + "&apikey=b0f07e2f")
      .then((promize) => promize.json())
      .then((data) => {
        data.Search.forEach((element) => {
          dispatch({ type: "ADD_MOVIE", payload: element });
          // console.log(element.Title, element.Year, element.imdbID, element.Type) //, element.Poster)
        });
      });
  };

  return (
    <div className="search-box">
      <form className="search-box__form" onSubmit={searchBoxSubmitHandler}>
        <label className="search-box__form-label">
          Искать фильм по названию:
          <input
            value={searchLine}
            type="text"
            className="search-box__form-input"
            placeholder="Например, Shawshank Redemption"
            onChange={searchLineChangeHandler}
          />
        </label>
        <button
          type="submit"
          className="search-box__form-submit"
          disabled={!searchLine}
          onClick={onButtonClick}
        >
          Искать
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
