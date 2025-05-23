import React, { useState, useEffect } from 'react';
import '../styles/MODAL.css';

interface GameModalProps {
  game: {
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

const defaultVideoUrls = [
  "https://www.youtube.com/embed/zw47_q9wbBE",
];

const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const videos = game.videoUrls && game.videoUrls.length > 0 ? game.videoUrls : defaultVideoUrls;
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  useEffect(() => {
    setCurrentVideo(videos[0]);
  }, [game]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleThumbnailClick = (url: string) => {
    setCurrentVideo(url);
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
              {Array.from({ length: 4 }).map((_, index) => {
                const videoId = videos[0].split('/').pop();
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${index}.jpg`;

                return (
                  <img
                    key={index}
                    src={thumbnailUrl}
                    alt={`Captura ${index + 1}`}
                    onClick={() => handleThumbnailClick(videos[0])}
                    style={{
                      cursor: 'pointer',
                      border: currentVideo === videos[0] ? '2px solid white' : 'none',
                      marginRight: '10px',
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="modal-description" style={{ color: 'white' }}>
            <p>{game.description || 'Descripción no disponible para este juego.'}</p>

            <div className="user-reviews">
              {game.reviews && game.reviews.length > 0 ? (
                game.reviews.map((review, index) => (
                  <div className="review" key={index}>
                    <img
                      src={review.avatar || review.userImage || 'https://via.placeholder.com/50'}
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
      </div>
    </div>
  );
};

export default GameModal;
