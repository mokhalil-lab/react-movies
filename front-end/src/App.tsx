import MovieCard, { type Movie } from "./components/MovieCard";

function App() {
  const dummymovie: Movie = {
    title: "Interstellar",
    url: "https://via.placeholder.com/300x450",
    release_date: 2014,
  };
  return <MovieCard {...dummymovie} />;
}

export default App;
