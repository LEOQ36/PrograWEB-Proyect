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
  description?: string;
  videoUrls?: string[];
  screenshots?: string[];
}

const TopRated: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const games: Game[] = [
    {
      title: 'The Legend of Zelda: Tears of the Kingdom',
      image: './Imagenes/ZELDA COVER.jpg',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$53.99',
      discount: '-10%',
      description: 'The Legend of Zelda: Tears of the Kingdom es un juego de acción...',
      videoUrls: [
        "https://www.youtube.com/embed/zw47_q9wbBE",
        "https://www.youtube.com/embed/1rPxiXXxftE",
      ],    
    },
    {
      title: 'Elden Ring',
      image: './Imagenes/ELDENRING.jpg',
      platforms: ['./Imagenes/PS5.png', './Imagenes/PC3.PNG', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$29.99',
      discount: '-50%',
      description: 'Elden Ring es el nuevo videojuego de FromSoftware, creadores de Dark Souls, Sekiro o Bloodborne. Se trata del nuevo título de acción y rol para un jugador ideado por Hidetaka Miyazaki, que en esta ocasión, estrenará un mundo abierto más grande y ambicioso. Su argumento y mitología están firmados por George R.R. Martin, autor de Canción de hielo y fuego.',
      videoUrls: [
        "https://www.youtube.com/embed/E3Huy2cdih0",
        "https://www.youtube.com/embed/O1D2xvTwt5g",
      ],
    },
    {
      title: 'Super Mario Odyssey',
      image: './Imagenes/supermario.jpg',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$5.99',
      discount: '-90%',
      description:"Mario regresa a los videojuegos con su primer gran título para Nintendo Switch. En esta ocasión lo hace con un juego en 3D de mundo abierto que recuerda en estética y jugabilidad a lo visto en Super Mario 64 o los juegos de la serie en Game Cube, pero que además incluye una gran cantidad de novedades, los mejores gráficos de la saga e interesantes mecánicas jugables como la gorra, la cual tendrá un gran protagonismo y ofrecerá diversas funcionalidades como ayudarnos a recorrer el escenario o la capacidad de controlar a los enemigos, obteniendo así increíbles y variadas habilidades.",
      videoUrls: [
        "https://www.youtube.com/embed/EF5YynyWvQo"
      ]      
      
    },
    {
      title: 'Super Mario 3D World + Bowser\'s Fury',
      image: './Imagenes/MARIO3D.jpg',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$44.99',
      discount: '-25%',
      description:"¡Únete a Mario y sus amigos en dos aventuras únicas! En Super Mario™ 3D World, disfruta de niveles creativos y multijugador cooperativo. En Bowser’s Fury, explora un mundo abierto en busca de Cat Shines para enfrentarte a Bowser. Ambos juegos ofrecen diversión para toda la familia.",
      videoUrls: [
        "https://www.youtube.com/embed/5nW9o6M5zFo"
      ]

    },
    {
      title: 'Marvel\'s Spider-Man 2',
      image: './Imagenes/SPIDERMAN.png',
      platforms: ['./Imagenes/PS5.png'],
      originalPrice: '$69.99',
      discountedPrice: '$69.29',
      discount: '-1%',
      description:"Peter Parker y Miles Morales unen fuerzas para enfrentar una nueva amenaza en Nueva York. Con nuevas habilidades y una historia emocionante, este juego de acción y aventura lleva la experiencia de Spider-Man a un nivel superior.",
      videoUrls: [
        "https://www.youtube.com/embed/9fVYKsEmuRo"
      ]
    },
    {
      title: 'Cyberpunk 2077',
      image: './Imagenes/CYBERPUNK.jpeg',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$49.99',
      discountedPrice: '$24.99',
      discount: '-50%',
      description:"El juego sigue la historia de V , un asesino a sueldo en ascenso en Night City , la metrópolis más violenta y peligrosa del futuro corporativo . Un completo creador de personajes permitirá a los jugadores elegir el género, la apariencia y los antecedentes históricos de V, factores que pueden influir en el desarrollo del juego",
      videoUrls: [
        "https://www.youtube.com/embed/qIcTM8WXFjk"
      ]
    },
    {
      title: 'Astro Bot',
      image: './Imagenes/AB.png.webp',
      platforms: ['./Imagenes/PS5.png'],
      originalPrice: '$59.99',
      discountedPrice: '$53.99',
      discount: '-10%',
      description:"En este juego de plataformas exclusivo para PS5, controla a Astro mientras rescatas a tus compañeros bots en un universo lleno de sorpresas. Con niveles creativos y mecánicas innovadoras, Astro Bot es una celebración del legado de PlayStation. ",
      videoUrls: [
        "https://www.youtube.com/embed/unYFdcEjV9k"
      ]
    },
    {
      title: 'God Of War Ragnarok',
      image: './Imagenes/GOW.png',
      platforms: ['./Imagenes/PS5.png'],
      originalPrice: '$69.99',
      discountedPrice: '$62.99',
      discount: '-10%',
      description:"Acompaña a Kratos y su hijo Atreus en una épica aventura a través de los Nueve Reinos. Enfréntate a dioses y monstruos en una historia cargada de emoción y acción. Ragnarök es la conclusión de la saga nórdica de God of War.",
      videoUrls: [
        "https://www.youtube.com/embed/hfJ4Km46A-0"
      ]
    },
    {
      title: 'Grand Theft Auto V',
      image: './Imagenes/GTA.jpg',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$5.99',
      discount: '-90%',
      description:"Sumérgete en la vida de tres criminales en la ciudad ficticia de Los Santos. Con una narrativa envolvente y un mundo abierto lleno de actividades, GTA V ofrece una experiencia de juego sin igual. ",
      videoUrls: [
        "https://www.youtube.com/embed/QkkoHAzjnUs"
      ]
    },
    {
      title: 'Red Dead Redemption 2',
      image: './Imagenes/RD2.png',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$29.99',
      discount: '-50%',
      description:"Vive la vida de un forajido en el ocaso del Viejo Oeste. Con una historia profunda y un mundo abierto detallado, Red Dead Redemption 2 es una obra maestra de narrativa y jugabilidad.",
      videoUrls: [
        "https://www.youtube.com/embed/gmA6MrX81z4"
      ]
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
            onClick={() => handleGameClick(game)} 
          />
        ))}
      </div>

      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TopRated;