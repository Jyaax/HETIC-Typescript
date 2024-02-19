import React, { useState } from "react";
import { Anime } from "../interfaces/Anime";
import AnimeSummary from "./AnimeSummary";
import AnimeDescription from "./AnimeDescription";
import AddAnimeForm from "./AddAnimeForm";
import "../styles/Home.css";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [allAnimes, setAllAnimes] = useState<Anime[]>([
    {
      id: 1,
      title: "Jujutsu Kaisen",
      completed: true,
      progress: 10,
      comments: "Awesome anime!",
    },
    { id: 2, title: "Dr. Stone", completed: false, progress: 5 },
    { id: 3, title: "One Piece", completed: false, progress: 0 },
  ]);

  const completedAnimes = allAnimes.filter((anime) => anime.completed);
  const watchingAnimes = allAnimes.filter(
    (anime) => !anime.completed && anime.progress > 0
  );
  const toWatchAnimes = allAnimes.filter(
    (anime) => !anime.completed && anime.progress === 0
  );

  const handleOpenModal = (anime: Anime) => {
    setSelectedAnime(anime);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAnime(null);
  };

  const handleUpdateAnime = (updatedAnime: Anime) => {
    const updatedAnimeList = allAnimes.map((anime) =>
      anime.id === updatedAnime.id ? updatedAnime : anime
    );
    setAllAnimes(updatedAnimeList);
    setShowModal(false);
    setSelectedAnime(null);
  };

  const handleDeleteAnime = (id: number) => {
    const updatedAnimeList = allAnimes.filter((anime) => anime.id !== id);
    setAllAnimes(updatedAnimeList);
    setShowModal(false);
    setSelectedAnime(null);
  };

  const handleAddAnime = (newAnime: Anime) => {
    setAllAnimes([...allAnimes, newAnime]);
    setShowModal(false);
  };

  const handleToggleCompletion = (id: number) => {
    const updatedAnimeList = allAnimes.map((anime) =>
      anime.id === id ? { ...anime, completed: !anime.completed } : anime
    );
    setAllAnimes(updatedAnimeList);
  };

  return (
    <div className="home-container">
      <h1>My Anime List</h1>
      <button className="add-button" onClick={() => setShowModal(true)}>
        Add New Anime
      </button>
      <AnimeSummary
        animeList={allAnimes}
        onViewDetails={handleOpenModal}
        onToggleCompletion={handleToggleCompletion}
        title="All Animes"
      />
      <AnimeSummary
        animeList={completedAnimes}
        onViewDetails={handleOpenModal}
        onToggleCompletion={handleToggleCompletion}
        title="Completed"
      />
      <AnimeSummary
        animeList={watchingAnimes}
        onViewDetails={handleOpenModal}
        onToggleCompletion={handleToggleCompletion}
        title="Watching"
      />
      <AnimeSummary
        animeList={toWatchAnimes}
        onViewDetails={handleOpenModal}
        onToggleCompletion={handleToggleCompletion}
        title="To Watch"
      />

      {showModal && (
        <div className="modal-background" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedAnime ? (
              <AnimeDescription
                anime={selectedAnime}
                onUpdateAnime={handleUpdateAnime}
                onDelete={handleDeleteAnime}
                onClose={handleCloseModal}
              />
            ) : (
              <AddAnimeForm onAdd={handleAddAnime} onClose={handleCloseModal} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
