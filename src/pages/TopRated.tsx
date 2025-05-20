import React, { useState } from 'react';
import BarraNavegacion from '../components/BarraNavegacion';
import GameModal from '../components/GameModal';
import GameCard from '../components/GameCard';

interface Game {
  title: string;
  image: string;
  platforms: string[];
  originalPrice: string;
  discountedPrice: string;
  discount: string;
}

const TopRated: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleGameClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const games: Game[] = [
    {
      title: 'The Legend of Zelda: Tears of the Kingdom',
      image: './Imagenes/ZELDA COVER.jpg',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$53.99',
      discount: '-10%',
    },
    {
      title: 'Elden Ring',
      image: './Imagenes/ELDENRING.jpg',
      platforms: ['./Imagenes/PS5.png', './Imagenes/PC3.PNG', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$29.99',
      discount: '-50%',
    },
    {
      title: 'Super Mario Odyssey',
      image: './Imagenes/supermario.jpg',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$5.99',
      discount: '-90%',
    },
    {
      title: 'Super Mario 3D World + Bowser\'s Fury',
      image: './Imagenes/MARIO3D.jpg',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$44.99',
      discount: '-25%',
    },
    {
      title: 'Marvel\'s Spider-Man 2',
      image: './Imagenes/SPIDERMAN.png',
      platforms: ['./Imagenes/PS5.png'],
      originalPrice: '$69.99',
      discountedPrice: '$69.29',
      discount: '-1%',
    },
    {
      title: 'Cyberpunk 2077',
      image: './Imagenes/CYBERPUNK.jpeg',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$49.99',
      discountedPrice: '$24.99',
      discount: '-50%',
    },
    {
      title: 'Astro Bot',
      image: './Imagenes/AB.png.webp',
      platforms: ['./Imagenes/PS5.png'],
      originalPrice: '$59.99',
      discountedPrice: '$53.99',
      discount: '-10%',
    },
    {
      title: 'God Of War Ragnarok',
      image: './Imagenes/GOW.png',
      platforms: ['./Imagenes/PS5.png'],
      originalPrice: '$69.99',
      discountedPrice: '$62.99',
      discount: '-10%',
    },
    {
      title: 'Grand Theft Auto V',
      image: './Imagenes/GTA.jpg',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$5.99',
      discount: '-90%',
    },
    {
      title: 'Red Dead Redemption 2',
      image: './Imagenes/RD2.png',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$29.99',
      discount: '-50%',
    },
  ];

  return (
    <div className="fondo">
      <BarraNavegacion />

      <div className="container my-4">
        <div className="d-flex justify-content-between mb-2">
          <button className="btn btn-secondary">Previous</button>
          <div className="text-center text-white">Games</div>
          <button className="btn btn-secondary">Next</button>
        </div>
      </div>

      <h1 className="section-title">Top Rated Games</h1>

      <div className="game-grid">
        {games.map((game, index) => (
          <GameCard
            key={index}
            game={game}
            onClick={index === 0 ? handleGameClick : undefined}
          />
        ))}
      </div>

      {isModalOpen && <GameModal onClose={handleCloseModal} />}
    </div>
  );
};

export default TopRated;