import React, { useState, useEffect } from 'react';
import '../styles/MODAL.css';

// Obtener reseñas aleatorias
const getRandomReviews = (reviews: any[]) => {
  const shuffledReviews = reviews.sort(() => Math.random() - 0.5);
  return shuffledReviews.slice(0, 3); // Selecciona 3 reseñas aleatorias
};

interface GameModalProps {
  game: {
    id: number;
    title: string;
    description?: string;
    videoUrls?: string[];
    screenshots?: string[];
    reviews?: {
      avatar?: string;
      userImage?: string;
      rating: string; // Ej: "★★★★☆"
      comment: string;
    }[];
  };
  onClose: () => void;
}

// Función para actualizar las URLs de video en el backend
const updateVideoUrls = async (gameId: number, videoUrls: string[]) => {
  try {
    const res = await fetch(`http://localhost:3000/api/games/${gameId}/videoUrls`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoUrls }),
    });

    if (!res.ok) {
      throw new Error('No se pudo actualizar las URLs de video');
    }

    const updatedGame = await res.json();
    console.log('Juego actualizado:', updatedGame);
  } catch (err) {
    console.error('Error al actualizar el juego:', err);
  }
};

const defaultVideoUrls = [
  "https://www.youtube.com/embed/zw47_q9wbBE",
];

const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const videos = game.videoUrls && game.videoUrls.length > 0 ? game.videoUrls : defaultVideoUrls;
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [videoUrls, setVideoUrls] = useState(videos); // Mantener las URLs de video

  useEffect(() => {
    setCurrentVideo(videos[0]);
    setVideoUrls(videos); // Asegura que los videoUrls estén actualizados al principio
  }, [game]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleThumbnailClick = (url: string) => {
    setCurrentVideo(url);
  };

  const getThumbnailUrl = (videoUrl: string, index: number) => {
    const videoId = videoUrl.split('/').pop();
    return `https://img.youtube.com/vi/${videoId}/${index}.jpg`;
  };

  const randomReviews = game.reviews ? getRandomReviews(game.reviews) : [];

  const handleUpdateVideoUrls = () => {
    // Actualizar las URLs de video en el backend
    updateVideoUrls(game.id, videoUrls);
  };

  return (
    <div
      id="modal"
      className="modal-overlay show"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gameTitle"
      onClick={handleOverlayClick}
    >
      <div className="modal-container">
        <button className="close-button" aria-label="Cerrar modal" onClick={onClose}>
          X
        </button>

        <h2 id="gameTitle">{game.title}</h2>

        <div className="modal-content">
          <div className="modal-video">
            <iframe
              width="100%"
              height="360"
              src={currentVideo}
              title={`${game.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <div className="video-thumbnails">
              {videos.map((videoUrl, index) => (
                <img
                  key={index}
                  src={getThumbnailUrl(videoUrl, index + 1)}
                  alt={`Captura ${index + 1}`}
                  onClick={() => handleThumbnailClick(videoUrl)}
                  style={{
                    cursor: 'pointer',
                    border: currentVideo === videoUrl ? '2px solid white' : 'none',
                    marginRight: '10px',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="modal-description" style={{ color: 'white' }}>
            <p>{game.description || 'Descripción no disponible para este juego.'}</p>

            <div className="user-reviews">
              {randomReviews.length > 0 ? (
                randomReviews.map((review, index) => (
                  <div className="review" key={index}>
                    <img
                      src={review.avatar || 'https://via.placeholder.com/50'}
                      alt={`Usuario ${index + 1}`}
                    />
                    <div className="review-content">
                      <div className="review-rating">{review.rating}</div>
                      <p>{review.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay reseñas disponibles.</p>
              )}
            </div>
          </div>
        </div>

        <div className="modal-rating">
          <div className="rating-info">
            <span>Rating: 5</span>
            <div className="stars">★★★★★</div>
          </div>

          <button className="purchase-button">PURCHASE NOW</button>
        </div>

        {/* Botón para actualizar las URLs de video solo si hay alguna URL nueva */}
        {videoUrls.length > 0 && videoUrls !== videos && (
          <button onClick={handleUpdateVideoUrls}>Actualizar URLs de Video</button>
        )}
      </div>
    </div>
  );
};

export default GameModal;
