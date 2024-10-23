import { Routes, Route } from "react-router-dom";
import MoviesList from "./pages/MoviesList";
import { MovieProvider } from "./context/MovieContext";
import MovieDetailsPage from "./pages/MoviesDetail";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <MovieProvider>
            <MoviesList />
          </MovieProvider>
        }
      />
      <Route path="/movie/id" element={<MovieDetailsPage />} />
    </Routes>
  );
}

export default App;
