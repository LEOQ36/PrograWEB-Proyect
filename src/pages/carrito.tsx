import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Tipo para cada juego en el carrito
interface CartGame {
  id: number;
  name: string;
  image: string;
}

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<CartGame[]>([]);

  const userId = 1; // ID del usuario de prueba

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/cart/fake/${userId}`);
        const data = await res.json();

        const mappedGames: CartGame[] = data.map((item: any) => ({
          id: item.game.id,
          name: item.game.title,
          image: item.game.image || './Imagenes/placeholder.png', // fallback
        }));

        setGames(mappedGames);
      } catch (err) {
        console.error('Error cargando carrito:', err);
      }
    };

    fetchCart();
  }, []);

  const removeGame = (id: number) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
    // Aquí podrías hacer una solicitud DELETE si lo deseas
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
