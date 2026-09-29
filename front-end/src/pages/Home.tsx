import MovieCard, { type Movie } from "../components/MovieCard";

const movies: Movie[] = [
  { id: 1, title: "john wick", release_date: 2020, url: "https://via.placeholder.com/300x450" },
  { id: 2, title: "harry potter", release_date: 2001, url: "https://via.placeholder.com/300x450" },
  { id: 3, title: "terminator", release_date: 1999, url: "https://via.placeholder.com/300x450" },
];

const handleserach = () => {};

function Home() {
  return (
    <div className="home">
      <form onSubmit={handleserach} className="search-form">
        <input type="text" placeholder="serach for movies" className="search-input" />
        <button type="submit" className="search-btn">
          search
        </button>
      </form>

      <div className="movie-grid">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </div>
    </div>
  );
}

export default Home;
