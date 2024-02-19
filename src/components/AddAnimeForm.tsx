import React, { useState } from "react";
import { Anime } from "../interfaces/Anime";
import "../styles/AddAnimeForm.css";

interface AddAnimeFormProps {
  onAdd: (newAnime: Anime) => void;
  onClose: () => void;
}

const AddAnimeForm: React.FC<AddAnimeFormProps> = ({ onAdd, onClose }) => {
  const [newAnime, setNewAnime] = useState<Partial<Anime>>({
    title: "",
    completed: false,
    progress: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAnime((prevAnime) => ({
      ...prevAnime,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newAnime.title) {
      onAdd(newAnime as Anime);
      setNewAnime({ title: "", completed: false, progress: 0 });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Anime</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={newAnime.title || ""}
              onChange={handleChange}
              name="title"
            />
          </label>
          <label>
            Completed:
            <input
              type="checkbox"
              checked={newAnime.completed || false}
              onChange={(e) =>
                setNewAnime((prevAnime) => ({
                  ...prevAnime,
                  completed: e.target.checked,
                }))
              }
            />
          </label>
          <label>
            Progress:
            <input
              type="number"
              value={newAnime.progress || 0}
              onChange={handleChange}
              name="progress"
            />
          </label>
          <button type="submit">Add Anime</button>
          <button onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default AddAnimeForm;
