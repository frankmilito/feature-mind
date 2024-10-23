import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import axios from "axios";

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year?: string;
};

type MovieContextProps = {
  movies: Movie[];
  searchMovies: (query: string) => void;
  addMovie: (movie: Movie) => void;
  setRecentSearchQueries: Dispatch<SetStateAction<string[]>>;
  setQuery: Dispatch<SetStateAction<string>>;
  recentSearchQueries: string[];
  query: string;
  loading: boolean;
};

export const MovieContext = createContext<MovieContextProps | undefined>(
  undefined
);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearchQueries, setRecentSearchQueries] = useState<Array<string>>(
    () => {
      const savedQueries = localStorage.getItem("recentQueries");
      return savedQueries ? JSON.parse(savedQueries) : [];
    }
  );

  const searchMovies = useCallback(async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=e6c0da32`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const addMovie = (movie: Movie) => {
    setMovies((prevMovies) => [movie, ...prevMovies]);
  };

  const value = useMemo(
    () => ({
      movies,
      searchMovies,
      addMovie,
      recentSearchQueries,
      setRecentSearchQueries,
      setQuery,
      query,
      loading,
    }),
    [
      movies,
      recentSearchQueries,
      setRecentSearchQueries,
      setQuery,
      searchMovies,
      query,
      loading,
    ]
  );

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
