import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year?: string;
  Type?: string;
};

export type MovieContextProps = {
  movies: Movie[];
  searchMovies: (query: string, page?: number) => void;
  addMovie: (movie: Movie) => void;
  setRecentSearchQueries: Dispatch<SetStateAction<string[]>>;
  setQuery: Dispatch<SetStateAction<string>>;
  recentSearchQueries: string[];
  query: string;
  loading: boolean;
  error: boolean;
  totalResults: number;
  searchQuery: string;
};

export const MovieContext = createContext<MovieContextProps | undefined>(
  undefined
);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "Avengers";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(searchQuery);
  const [error, setError] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  // Cache to store movies
  const [movieCache, setMovieCache] = useState<
    Record<string, Record<number, Movie[]>>
  >(() => {
    const savedCache = localStorage.getItem("movieCache");
    return savedCache ? JSON.parse(savedCache) : {};
  });

  const [recentSearchQueries, setRecentSearchQueries] = useState<Array<string>>(
    () => {
      const savedQueries = localStorage.getItem("recentQueries");
      return savedQueries ? JSON.parse(savedQueries) : [];
    }
  );

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const searchMovies = useCallback(
    async (query: string, page: number = 1) => {
      //check if movie exists in cache
      if (movieCache[query]?.[page]) {
        setMovies(movieCache[query][page]);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=e6c0da32`
        );
        const fetchedMovies = response.data.Search || [];
        setMovies(fetchedMovies);
        setTotalResults(+response.data.totalResults);
        setMovieCache((prevCache) => {
          const newCache = {
            ...prevCache,
            [query]: {
              ...prevCache[query],
              [page]: fetchedMovies,
            },
          };
          localStorage.setItem("movieCache", JSON.stringify(newCache));
          return newCache;
        });

        setError(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [movieCache]
  );

  const addMovie = useCallback((movie: Movie) => {
    setMovies((prevMovies) => {
      const updatedMovies = [movie, ...prevMovies];
      localStorage.setItem("movieList", JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  }, []);

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
      totalResults,
      error,
      searchQuery,
    }),
    [
      movies,
      searchMovies,
      addMovie,
      recentSearchQueries,
      query,
      loading,
      totalResults,
      error,
      searchQuery,
    ]
  );

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
