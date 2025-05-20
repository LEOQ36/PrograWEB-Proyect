import React from 'react';

interface Game {
  title: string;
  image: string;
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
        {game.platforms.map((platform, index) => (
          <img
            key={index}
            src={platform}
            alt="Platform"
            className="platform-logo"
          />
        ))}
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
