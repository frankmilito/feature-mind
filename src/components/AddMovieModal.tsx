import { useState, useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import Input from "./Input";
import Button from "./Button";

type AddMovieModalProps = {
  onClose: () => void;
};

const AddMovieModal = ({ onClose }: AddMovieModalProps) => {
  const { addMovie, setQuery } = useContext(MovieContext)!;
  const [Title, setTitle] = useState("");
  const [Poster, setPoster] = useState("");
  const [Year, setYear] = useState("");

  const handleSubmit = () => {
    if (Title && Poster) {
      setQuery("");
      addMovie({ imdbID: Date.now().toString(), Poster, Title, Year });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-8 bg-white rounded shadow-lg">
        <h2 className="mb-4 text-2xl">Add a New Movie</h2>
        <div className="flex flex-col gap-4">
          <Input
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Movie Title"
          />
          <Input
            value={Poster}
            onChange={(e) => setPoster(e.target.value)}
            placeholder="Poster URL"
          />
          <Input
            type="number"
            value={Year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Movie Year"
          />
          <div className="flex justify-end space-x-2">
            <Button
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-400 rounded"
              title="Close"
            />
            <Button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-500 rounded"
              title="Add"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
