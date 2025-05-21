import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const navigate = useNavigate();

  const [games, setGames] = useState([
    {
      id: 1,
      name: 'Grand Theft Auto V',
      image: './Imagenes/GTA.jpg',
    },
    {
      id: 2,
      name: 'Red Dead Redemption 2',
      image: './Imagenes/RD2.png',
    },
    {
      id: 3,
      name: 'God Of War Ragnarok',
      image: './Imagenes/GOW.png',
    },
  ]);

  const removeGame = (id: number) => {
    setGames(games.filter((game) => game.id !== id));
  };

  return (
    <div className="container-fluid bg-dark text-white p-4" style={{ minHeight: '100vh' }}>
      <div className="mb-4 d-flex align-items-center">
        <i className="bi bi-cart-fill fs-4 me-2"></i>
        <h4 className="mb-0">Shopping Cart</h4>
      </div>

      <div className="d-flex flex-wrap gap-4 mb-4">
        {games.map((game) => (
          <div key={game.id} className="game-card-custom bg-light text-dark position-relative rounded p-2">
            <button
              className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
              title="Remove"
              onClick={() => removeGame(game.id)}
            >
              ×
            </button>
            <img src={game.image} alt={game.name} className="game-img" />
            <div className="game-info text-center">
              <h6 className="fw-bold mt-2 mb-1">{game.name}</h6>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex flex-column align-items-start">
        <button className="btn btn-success mb-2" onClick={() => navigate('/RealizarPago')}>
          ✔ Confirm Order
        </button>
        <button className="btn btn-outline-light" onClick={() => navigate('/Home')}>
          ✖ Cancel Order
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;