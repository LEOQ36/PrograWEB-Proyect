import React, { useState } from 'react';
import BarraNavegacion from '../components/BarraNavegacion';
import GameModal from '../components/GameModal';
import GameCard from '../components/GameCard';
import VideoGameCarousel from '../components/Carrusel';

interface Game {
  id : number;
  title: string;
  Bannerimage: string;
  image: string;
  platforms: string[];
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  description?: string;
  videoUrls?: string[];
  screenshots?: string[];
}


const Home : React.FC = () => {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    
      const handleGameClick = (game: Game) => {
        setSelectedGame(game);
      };
    
      const handleCloseModal = () => {
        setSelectedGame(null);
      };

      const games: Game[] = [
    {
      id : 1234,
      title: 'NBA 2K25',
      image: './Imagenes/2k25.png',
      Bannerimage: './Imagenes/2k25.png',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$53.99',
      discount: '-10%',
      description: ' La entrega anual de la serie NBA 2K, con mejoras en gráficos, físicas realistas y modos de juego como MiCarrera y MiEquipo',
      videoUrls: [
        "https://www.youtube.com/embed/zw47_q9wbBE",
        "https://www.youtube.com/embed/1rPxiXXxftE",
      ],    
    },
    {
      id : 1243212,
      title: 'Diablo IV',
      image: './Imagenes/DiabloiV.png',
      Bannerimage: './Imagenes/DiabloiV_banner.png',
      platforms: ['./Imagenes/PS5.png', './Imagenes/PC3.PNG', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$29.99',
      discount: '-50%',
      description: 'Regresa el oscuro mundo de Santuario con una campaña inmersiva, exploración libre, y multijugador en línea con clases icónicas como el Bárbaro y la Hechicera',
      videoUrls: [
        "https://www.youtube.com/embed/watch?v=0SSYzl9fXOQ",
        "https://www.youtube.com/embed/watch?v=7RdDpqCmjb4",
      ],
    },
    {
       id : 1249,
      title: 'Tekken 8',
      image: './Imagenes/TEKKEN8.png',
      Bannerimage: './Imagenes/TEKKEN8.png',
      platforms: ['./Imagenes/PS5.png', './Imagenes/PC3.PNG', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$5.99',
      discount: '-90%',
      description:"Nueva entrega del clásico de peleas con gráficos renovados en Unreal Engine 5 y un enfoque en el estilo ofensivo con nuevos sistemas de combate.",
      videoUrls: [
        "https://www.youtube.com/embed/EF5YynyWvQo"
      ]      
      
    },
    {
       id : 1242,
      title: 'Final Fantasy VII Rebirth',
      image: './Imagenes/FF.png',
      Bannerimage: './Imagenes/FF.png',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$44.99',
      discount: '-25%',
      description:"Segunda parte del remake de Final Fantasy VII, expandiendo la historia clásica con nuevos personajes, mundos abiertos y combate en tiempo real por equipos.",
      videoUrls: [
        "https://www.youtube.com/embed/5nW9o6M5zFo"
      ]

    },
    {
       id : 1241,
      title: 'Call of Duty: Modern Warfare III',
      image: './Imagenes/COD.png',
      Bannerimage: './Imagenes/COD.webp',
      platforms: ['./Imagenes/PS5.png'],
      originalPrice: '$69.99',
      discountedPrice: '$69.29',
      discount: '-1%',
      description:"Continuación directa de MWII con una campaña intensa, mapas multijugador clásicos remasterizados y un nuevo modo de zombis de mundo abierto.",
      videoUrls: [
        "https://www.youtube.com/embed/9fVYKsEmuRo"
      ]
    },
    {
       id : 1244,
      title: 'Resident Evil 4 (Remake)',
      image: './Imagenes/RE.png',
      Bannerimage: './Imagenes/RE_BANNER.jpg',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$49.99',
      discountedPrice: '$24.99',
      discount: '-50%',
      description:"Reimaginación moderna del clásico de 2005, con mejores gráficos, combate refinado y narrativa más profunda con Leon S. Kennedy como protagonista.",
      videoUrls: [
        "https://www.youtube.com/embed/qIcTM8WXFjk"
      ]
    },
    {
       id : 1243,
      title: 'Hogwarts Legacy',
      image: './Imagenes/HL.webp',
      Bannerimage: './Imagenes/HL_BANNER.avif',
      platforms: ['./Imagenes/PS5.png'],
      originalPrice: '$59.99',
      discountedPrice: '$53.99',
      discount: '-10%',
      description:"Ambientado en el universo de Harry Potter, permite a los jugadores vivir como un estudiante en Hogwarts del siglo XIX con libertad para explorar, lanzar hechizos y elegir su casa.",
      videoUrls: [
        "https://www.youtube.com/embed/unYFdcEjV9k"
      ]
    },
    {
      id : 124,
      title: 'The Legend of Zelda: Tears of the Kingdom',
      image: './Imagenes/ZELDA COVER.jpg',
      Bannerimage: './Imagenes/ZELDA.avif',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$53.99',
      discount: '-10%',
      description: 'Secuela de Breath of the Wild que expande Hyrule con islas flotantes, nuevos poderes para Link y una narrativa más oscura.',
      videoUrls: [
        "https://www.youtube.com/embed/zw47_q9wbBE",
        "https://www.youtube.com/embed/1rPxiXXxftE",
      ],    
    },
    {
       id : 1248,
      title: 'Street Fighter 6',
      image: './Imagenes/SF6.avif',
      Bannerimage: './Imagenes/SF6_BANNER.avif',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$5.99',
      discount: '-90%',
      description:"La legendaria saga de lucha evoluciona con un diseño visual vibrante, nuevos modos como World Tour para un jugador y una experiencia multijugador más accesible. ",
      videoUrls: [
        "https://www.youtube.com/embed/QkkoHAzjnUs"
      ]
    },
    {
      id : 12429,
      title: 'Starfield',
      image: './Imagenes/STARFIELD.png',
      Bannerimage: './Imagenes/STARFIEL_BANNER.jpg',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$29.99',
      discount: '-50%',
      description:"Sumérgete en una aventura intergaláctica donde formas parte de una organización de exploradores en busca de respuestas en los confines del universo.",
      videoUrls: [
        "https://www.youtube.com/embed/gmA6MrX81z4"
      ]
    },
  ];

 return (
    <div className="fondo">
      <BarraNavegacion />

      <div>
      <VideoGameCarousel games={games} title="Videojuegos Recomendados" />
    </div>

    

      <h1 className="section-title">Recent Games</h1>

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




}

export default Home