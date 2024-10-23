import { useState, useContext } from "react";
import { MovieContext } from "../context/MovieContext";

type AddMovieModalProps = {
  onClose: () => void;
};

const AddMovieModal = ({ onClose }: AddMovieModalProps) => {
  const { addMovie } = useContext(MovieContext)!;
  const [Title, setTitle] = useState("");
  const [Poster, setPoster] = useState("");
  const [Year, setYear] = useState("");

  const handleSubmit = () => {
    if (Title && Poster) {
      addMovie({ imdbID: Date.now().toString(), Poster, Title, Year });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-8 bg-white rounded shadow-lg">
        <h2 className="mb-4 text-2xl">Add a New Movie</h2>
        <input
          type="text"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border"
          placeholder="Movie Title"
        />
        <input
          type="text"
          value={Poster}
          onChange={(e) => setPoster(e.target.value)}
          className="w-full p-2 mb-4 border"
          placeholder="Poster URL"
        />
        <input
          type="number"
          value={Year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-2 mb-4 border"
          placeholder="Movie Year"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
