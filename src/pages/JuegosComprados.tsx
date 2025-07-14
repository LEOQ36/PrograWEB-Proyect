import React, { useState } from 'react';
import BarraNavegacion from '../components/BarraNavegacion';

interface Game {
  id: number;
  title: string;
  image: string;
  Bannerimage: string;
  description?: string;
  reviews?: {
    avatar: string;
    rating: string;
    comment: string;
  }[];
}

const JuegosComprados: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [userReview, setUserReview] = useState('');

  const handleOpenModal = (game: Game) => {
    setSelectedGame(game);
    setUserReview('');
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
    setUserReview('');
  };

  const handleSendReview = () => {
    setUserReview('');
    handleCloseModal();
  };

  const games: Game[] = [
    {
      id: 1,
      title: 'The Legend of Zelda: Tears of the Kingdom',
      image: './Imagenes/ZELDA COVER.jpg',
      Bannerimage: './Imagenes/BANNERZELDA.png',
      description: 'Explora Hyrule desde los cielos.',
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: '★★★★☆',
          comment: 'Gran Juego!'
        }
      ]
    },
    {
      id: 2,
      title: 'Elden Ring',
      image: './Imagenes/ELDENRING.jpg',
      Bannerimage: './Imagenes/EBANNER.png',
      description: 'Mundo abierto brutal.',
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          rating: '★★★★★',
          comment: 'Obra maestra.'
        }
      ]
    }
  ];

  return (
    <div className="fondo">
      <BarraNavegacion />
      <h1 className="section-title">Juegos Comprados</h1>

      <div className="game-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card-custom bg-light text-dark p-3 rounded shadow-sm">
            <img src={game.image} alt={game.title} className="img-fluid rounded mb-2" />
            <h5 className="fw-bold">{game.title}</h5>
            <p className="small">{game.description}</p>
            <button className="btn btn-secondary mt-2" onClick={() => handleOpenModal(game)}>
              Ver reseñas
            </button>
          </div>
        ))}
      </div>

      {selectedGame && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reseñas de {selectedGame.title}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {selectedGame.reviews && selectedGame.reviews.length > 0 ? (
                  selectedGame.reviews.map((r, idx) => (
                    <div key={idx} className="mb-3 border-bottom pb-2">
                      <div className="d-flex align-items-center mb-1">
                        <img src={r.avatar} alt="avatar" className="rounded-circle me-2" style={{ width: 30, height: 30 }} />
                        <strong>{r.rating}</strong>
                      </div>
                      <p className="mb-0">{r.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No hay reseñas aún.</p>
                )}

                <textarea
                  className="form-control mt-3"
                  rows={3}
                  placeholder="Escribe tu reseña..."
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={handleSendReview}
                  disabled={userReview.trim() === ''}
                >
                  Enviar reseña
                </button>
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JuegosComprados;
