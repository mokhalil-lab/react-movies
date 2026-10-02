import { useEffect, useState, type FormEvent } from "react";
import "../css/Home.css";
import { getPopularMovies, searchMovie } from "../services/api";
import MovieCard, { type Movie } from "../components/MovieCard";

function Home() {
  const [searchQuery, setsearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularmovies = await getPopularMovies();
        setMovies(popularmovies);
      } catch (err) {
        console.log(err);
        setError("failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSerach = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    try {
      const searchResult = await searchMovie(searchQuery);
      setMovies(searchResult);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("failed to search movies ...");
    } finally {
      setLoading(false);
    }
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

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading"></div>
      ) : (
        <div className="movies-grid">
          {movies
            .filter((movie: Movie) =>
              movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
            )
            .map((movie: Movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
