import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieCard.css";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: number;
}

function MovieCard(props: Movie) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const fav = isFavorite(props.id);

  const onfavouriteclick = () => {
    if (fav) {
      removeFromFavorites(props.id);
    } else {
      addToFavorites(props);
    }
  };
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${props.poster_path ?? ""}`} alt={props.title} />
        <div className="movie-overlay">
          <button className="favorite-btn" onClick={onfavouriteclick}>
            {fav ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{props.title}</h3>
        <p>{props.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
