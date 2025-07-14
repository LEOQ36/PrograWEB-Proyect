import React from 'react';

interface Game {
  id: number;
  title: string;
  image: string;
  platformImage: string;  // Aquí estamos añadiendo la imagen de la plataforma
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
  return (
    <div className="game-card-custom" onClick={onClick}>
      <img src={game.image} alt={game.title} className="game-img" />
      <div className="game-info">
        <h5>{game.title}</h5>

        {/* Aquí mostramos la imagen de la plataforma */}
        {game.platformImage && game.platformImage !== '' ? (
        <img
        alt="Platform"
        className="platform-logo"
        src={`http://localhost:3000/Imagenes/PS5.png`}  // Solo agrega el nombre del archivo
      />

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
