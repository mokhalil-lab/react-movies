const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

if (!API_KEY || !BASE_URL) {
  throw new Error("TMDB env vars missing. Did you create .env and restart the dev server?");
}

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovie = async (query: string) => {
  const response = await fetch(
    ` ${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};
