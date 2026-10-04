import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Movie } from "../components/MovieCard";

// 1. The contract: what the context provides
interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

// 2. Context typed with the contract (undefined until a Provider exists)
const MovieContext = createContext<MovieContextType | undefined>(undefined);

// 3. Custom hook — throws if used outside the Provider
export function useMovieContext(): MovieContextType {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used inside a MovieProvider");
  }
  return context;
}

interface MovieProviderProps {
  children: ReactNode;
}

export function MovieProvider({ children }: MovieProviderProps) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // load once on mount
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs) as Movie[]);
      } catch {
        localStorage.removeItem("favorites"); // corrupted data → start clean
      }
    }
  }, []);

  // persist on every change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value: MovieContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
