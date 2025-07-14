import React, { useState } from 'react';

interface Game {
  id: number;
  title: string;
  image: string;
  platformImage: string;
  platforms: string[];
  originalPrice: string;
  discountedPrice: string;
  discount: string;
}

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      await fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId: game.id }),
      });
      // No mostrar alertas ni logs, manejar silenciosamente
    } catch {
      // Error silencioso
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-card-custom" onClick={onClick}>
      <button
        className="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-1"
        onClick={handleAddToCart}
        title="Agregar al carrito"
        disabled={loading}
        style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 10 }}
      >
        {loading ? '⏳' : '🛒'}
      </button>

      <img src={game.image} alt={game.title} className="game-img" />
      <div className="game-info">
        <h5>{game.title}</h5>

        {game.platformImage && game.platformImage !== '' ? (
          <img alt="Platform" className="platform-logo" src={game.platformImage} />
        ) : (
          game.platforms.map((platform, index) => (
            <p key={index} className="platform-text">{platform}</p>
          ))
        )}

        <p className="price">
          <span className="original-price">{game.originalPrice}</span> {game.discountedPrice}{' '}
          <span className="discount">{game.discount}</span>
        </p>
        <p className="stars1">★★★★★</p>
      </div>
    </div>
  );
};

export default GameCard;
