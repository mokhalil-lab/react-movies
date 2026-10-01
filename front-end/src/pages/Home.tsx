import { useState, type FormEvent } from "react";
import MovieCard, { type Movie } from "../components/MovieCard";
import "../css/Home.css";

const movies: Movie[] = [
  { id: 1, title: "john wick", release_date: 2020, url: "https://via.placeholder.com/300x450" },
  { id: 2, title: "harry potter", release_date: 2001, url: "https://via.placeholder.com/300x450" },
  { id: 3, title: "terminator", release_date: 1999, url: "https://via.placeholder.com/300x450" },
];

function Home() {
  const [searchQuery, setsearchQuery] = useState("");

  const handleSerach = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(searchQuery);
    setsearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSerach} className="search-form">
        <input
          type="text"
          placeholder="serach for movies"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setsearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          search
        </button>
      </form>

      <div className="movies-grid">
        {movies
          .filter((movie) => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
          .map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
      </div>
    </div>
  );
}

export default Home;
