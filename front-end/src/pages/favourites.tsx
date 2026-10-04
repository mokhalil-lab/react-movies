import type { Movie } from "../components/MovieCard";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Favourites.css";

function Favourites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="favorites">
        <h2>your favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie: Movie) => {
            return <MovieCard {...movie} key={movie.id} />;
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="favorites-empty favourites-empty">
      <h2>No Favourites Yet</h2>
      <p>Add movies to your favourites and they will appear here.</p>
    </div>
  );
}

export default Favourites;
