import React from "react";
import { Anime } from "../interfaces/Anime";
import "../styles/AnimeSummary.css";

interface AnimeSummaryProps {
  animeList: Anime[];
  onViewDetails: (anime: Anime) => void;
  onToggleCompletion: (id: number) => void;
  title: string;
}

const AnimeSummary: React.FC<AnimeSummaryProps> = ({
  animeList,
  onViewDetails,
  onToggleCompletion,
  title,
}) => {
  const handleToggleCompletion = (id: number) => {
    onToggleCompletion(id);
  };

  return (
    <div className="anime-summary">
      <h2 className="list-title">{title || "None"}</h2>
      {animeList.length === 0 ? (
        <p className="empty-list">None</p>
      ) : (
        animeList.map((anime) => (
          <div className="anime-card" key={anime.id}>
            <h3>{anime.title}</h3>
            <p>Completed: {anime.completed ? "Yes" : "No"}</p>
            <p>Progress: {anime.progress}</p>
            <button onClick={() => onViewDetails(anime)}>View Details</button>
            <button onClick={() => handleToggleCompletion(anime.id)}>
              Toggle Completion
            </button>{" "}
          </div>
        ))
      )}
    </div>
  );
};

export default AnimeSummary;
