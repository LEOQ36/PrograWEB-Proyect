import React, { useEffect, useState } from 'react';
import BarraNavegacion from '../components/BarraNavegacion';
import GameModal from '../components/GameModal';
import GameCard from '../components/GameCard';
import VideoGameCarousel from '../components/Carrusel';

interface Game {
  id: number;
  title: string;
  image: string;
  bannerImage: string;  // No opcional para coincidir con CarouselGame
  description?: string;
  platformImage: string;
  platforms: string[];
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  reviews?: {
    avatar?: string;
    rating: string;
    comment: string;
  }[];
}

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/games');
        const data = await res.json();

        console.log('Respuesta del backend:', data);

        // Asegurarnos que data sea un array antes de mapear
        if (!Array.isArray(data)) {
          console.error('La respuesta del backend NO es un arreglo:', data);
          return;
        }

        const mapped = data.map((game: any) => ({
          id: game.id,
          title: game.title,
          image: game.image,
          bannerImage: game.bannerImage || '',
          description: game.description,
          platformImage: game.plataforma?.imagenPlataforma || '',
          platforms: [game.plataforma?.nombre || ''],
          originalPrice: `$${(game.price * 1.1).toFixed(2)}`,
          discountedPrice: `$${game.price.toFixed(2)}`,
          discount: '-10%',
          reviews: game.reviews?.map((r: any) => ({
            avatar: `https://randomuser.me/api/portraits/lego/${r.stars}.jpg`,
            rating: '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars),
            comment: r.content,
          })),
        }));

        setGames(mapped);
        setFilteredGames(mapped);
      } catch (error) {
        console.error('Error al obtener juegos:', error);
      }
    };

    fetchGames();
  }, []);

  const handleFilter = () => {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      const filtered = games.filter(
        (game) => parseFloat(game.discountedPrice.replace('$', '')) <= max
      );
      setFilteredGames(filtered);
    } else {
      setFilteredGames(games);
    }
  };

  return (
    <div className="fondo">
      <BarraNavegacion />
      <VideoGameCarousel games={games} />

      <h1 className="section-title">Recent Games</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            width: '150px',
          }}
        />
        <button
          onClick={handleFilter}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Filtrar
        </button>
      </div>

      <div className="game-grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} onClick={() => setSelectedGame(game)} />
        ))}
      </div>

      {selectedGame && <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </div>
  );
};

export default Home;
