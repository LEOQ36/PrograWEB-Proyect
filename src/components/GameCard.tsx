import React from 'react';

interface Game {
  id?: number;
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
  const isAuthenticated = !!localStorage.getItem('token');

  const handleBuyClick = async () => {
    const userId = 1;
    const endpoint = isAuthenticated
      ? 'http://localhost:3000/api/cart'
      : 'http://localhost:3000/api/cart/fake';

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (isAuthenticated) {
      headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({ gameId: game.id, userId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('✅ Juego agregado al carrito');
      } else {
        alert(`❌ Error: ${data.message || 'No se pudo agregar al carrito'}`);
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div className="game-card-custom" onClick={onClick}>
      <img src={game.image} alt={game.title} className="game-img" />

      <div className="game-info">
        <h5>{game.title}</h5>

        <div className="platform-icons">
          {game.platforms.map((platform, index) => (
            <img
              key={index}
              src={platform}
              alt={`Platform ${index}`}
              className="platform-logo"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ))}
        </div>

        <p className="price">
          <span className="original-price">{game.originalPrice}</span>{' '}
          {game.discountedPrice}{' '}
          <span className="discount">{game.discount}</span>
        </p>

        <p className="stars1">★★★★★</p>

        <button
          className="buy-button"
          onClick={(e) => {
            e.stopPropagation();
            handleBuyClick();
          }}
        >
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default GameCard;
