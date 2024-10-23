import { Routes, Route } from "react-router-dom";
import MoviesList from "./pages/MoviesList";
import { MovieProvider } from "./context/MovieContext";

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
    </Routes>
  );
}

export default App;
