export interface Movie {
  title: string;
  url: string;
  release_date: number;
}

function onfavouriteclick() {
  alert("clicked");
}

function MovieCard(props: Movie) {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={props.url} alt={props.title} />
        <div className="overlay">
          <button className="fav-btn" onClick={onfavouriteclick}>
            ♥
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
