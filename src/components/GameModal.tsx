// GameModal.tsx
import React, { useState } from 'react';
import '../styles/MODAL.css';

interface GameModalProps {
  onClose: () => void;
}


const videoUrls = [
  "https://www.youtube.com/embed/zw47_q9wbBE",
  "https://www.youtube.com/embed/1rPxiXXxftE",
  "https://www.youtube.com/embed/abcdefghi1",
  "https://www.youtube.com/embed/abcdefghi2",
  "https://www.youtube.com/embed/abcdefghi3",
  "https://www.youtube.com/embed/abcdefghi4",
];

const GameModal: React.FC<GameModalProps> = ({ onClose }) => {
  const [currentVideo, setCurrentVideo] = useState(videoUrls[0]);

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
        <button className="close-button" aria-label="Cerrar modal" onClick={onClose}>X</button>

        <h2 id="gameTitle">The Legend of Zelda: Tears of the Kingdom</h2>

        <div className="modal-content">
          <div className="modal-video">
            <iframe
              width="100%"
              height="360"
              src={currentVideo}
              title="The Legend of Zelda Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <div className="video-thumbnails">
              {videoUrls.map((url, i) => (
                <img
                  key={i}
                  src={`https://img.youtube.com/vi/${url.split('/').pop()}/default.jpg`}
                  alt={`Miniatura ${i + 1}`}
                  onClick={() => handleThumbnailClick(url)}
                />
              ))}
            </div>
          </div>

          <div className="modal-description" style={{ color: 'white' }}>
                <p>
                The Legend of Zelda: Tears of the Kingdom 
                es un juego de acción y aventuras de 2023 desarrollado y publicado 
                por Nintendo para Nintendo Switch. 
                El jugador controla a Link mientras busca a la Princesa Zelda y lucha para evitar 
                que Ganondorf destruya Hyrule. 
                Tears of the Kingdom conserva lajugabilidad y la ambientación de mundo 
                abierto de su predecesor, Breath of the Wild (2017), 
                y presenta nuevos entornos, incluyendo un área compuesta por 
                islas flotantes en el cielo y un área subterránea bajo 
                Hyrule conocida como las Profundidades.
                </p>

                <div className="user-reviews">
                  <div className="review">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Usuario 1" />
                    <div className="review-content">
                      <div className="review-rating">★★★★☆</div>
                      <p>Bueno!</p>
                    </div>
                  </div>
                  <div className="review">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Usuario 2"  />
                    <div className="review-content">
                      <div className="review-rating">★★★★★</div>
                      <p>Excelente!</p>
                    </div>
                  </div>
                </div>
              </div>
          
        </div>
        <div className="modal-rating">
  <div className="rating-info">
    <span>Rating: 5</span>
    <div className="stars">★★★★★</div> {/* Aquí pones las estrellas */}
  </div>

  <button className="purchase-button">PURCHASE NOW</button>
</div>
      </div>
    </div>
    
  );
};

export default GameModal;