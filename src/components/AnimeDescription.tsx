import React, { useState } from "react";
import { Anime } from "../interfaces/Anime";
import "../styles/AnimeDescription.css";

interface AnimeDescriptionProps {
  anime: Anime;
  onUpdateAnime: (updatedAnime: Anime) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
}

const AnimeDescription: React.FC<AnimeDescriptionProps> = ({
  anime,
  onUpdateAnime,
  onDelete,
  onClose,
}) => {
  const [updatedAnime, setUpdatedAnime] = useState(anime);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedAnime((prevAnime) => ({
      ...prevAnime,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdateAnime(updatedAnime);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{anime.title} Details</h2>
        <p>ID: {anime.id}</p>
        <label>
          Title:
          <input
            type="text"
            value={updatedAnime.title}
            onChange={handleChange}
            name="title"
          />
        </label>
        <label>
          Progress:
          <input
            type="number"
            value={updatedAnime.progress}
            onChange={handleChange}
            name="progress"
          />
        </label>
        <label>
          Comments:
          <textarea
            value={updatedAnime.comments}
            onChange={handleChange}
            name="comments"
          />
        </label>
        <label>
          Completed:
          <input
            type="checkbox"
            checked={updatedAnime.completed || false}
            onChange={(e) =>
              setUpdatedAnime((prevAnime) => ({
                ...prevAnime,
                completed: e.target.checked,
              }))
            }
          />
        </label>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={() => onDelete(anime.id)}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AnimeDescription;
