import React, { useState, useEffect } from 'react';
import BarraNavegacion from '../components/BarraNavegacion';
import GameModal from '../components/GameModal';
import GameCard from '../components/GameCard';
import VideoGameCarousel from '../components/Carrusel';

interface Game {
  id: number;
  title: string;
  description: string;
  price: number;
  publisher: string;
  image: string;
  bannerImage: string;
  platforms: string[];
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  reviews?: {
    avatar: string;
    rating: string;
    comment: string;
  }[];
}

const TopRated: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/games');
        const data = await res.json();
  
        const processedGames: Game[] = data.map((game: any) => {
  const discountRate = game.estaOferta ? 0.1 : 0;
  const discounted = (game.price * (1 - discountRate)).toFixed(2);
  const discountPercent = `-${Math.round(discountRate * 100)}%`;

  return {
    id: game.id,
    title: game.title,
    description: game.description,
    price: game.price,
    publisher: game.publisher,
    image: `http://localhost:3000${game.image}`,
    bannerImage: `http://localhost:3000${game.bannerImage}`,
    platforms: game.plataforma ? [game.plataforma.nombre] : ['Plataforma desconocida'],
    platformImage: game.plataforma ? `http://localhost:3000${game.plataforma.image}` : '',
    originalPrice: `$${game.price.toFixed(2)}`,
    discountedPrice: `$${discounted}`,
    discount: discountRate > 0 ? discountPercent : '-0%',
    reviews: game.reviews?.map((r: any) => ({
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      rating: '★★★★☆',
      comment: r.content
    })),
    videoUrls: game.videoUrls || [] // Asegúrate de incluir los videos aquí
  };
});
  
        setGames(processedGames);
      } catch (err) {
        console.error('Error al obtener juegos:', err);
      }
    };
  
    fetchGames();
  }, []);
  
  

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    console.log("SE SELECCIONO EL JUEGO",game)
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  return (
    <div className="fondo">
      <BarraNavegacion />
      <div>
      <VideoGameCarousel
  games={games.map(({ title, bannerImage, description }) => ({
    title,
    bannerImage, // ✅ nombre correcto con "I" mayúscula
    description,
  }))}
  title="Videojuegos Recomendados"
/>


      </div>

      <h1 className="section-title">Top Rated Games</h1>

      <div className="game-grid">
        {games.map((game, index) => (
          <GameCard key={index} game={game} onClick={() => handleGameClick(game)} />
        ))}
      </div>

      {selectedGame && (
        <GameModal game={selectedGame} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default TopRated;
