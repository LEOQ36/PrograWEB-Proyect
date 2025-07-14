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
  reviews?: {
    avatar: string;
    rating: string; // Ej: "★★★★☆"
    comment: string;
  }[];

}


const BestSellers : React.FC = () => {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    
      const handleGameClick = (game: Game) => {
        setSelectedGame(game);
      };
    
      const handleCloseModal = () => {
        setSelectedGame(null);
      };

      const games: Game[] = [
   
   {
      id: 1594,
      title: 'Minecraft',
      image: './Imagenes/MC.png',
       Bannerimage: './Imagenes/MC_HORIZONTAL.avif',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$53.99',
      discount: '-10%',
      description: 'En esta secuela del juego The Legend of Zelda: Breath of the Wild, decidirás tu propio camino a través de los extensos paisajes de Hyrule y las islas que flotan en los vastos cielos. ¿Podrás aprovechar el poder de las nuevas habilidades de Link para luchar contra las malévolas fuerzas que amenazan al reino?',
      videoUrls: [
        "https://www.youtube.com/embed/MmB9b5njVbA",
        
      ],
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: '★★★★☆',
          comment: 'Gran Juego!'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          rating: '★★★★★',
          comment: '¡Uno de los mejores juegos que he probado este año!'
        }
      ]    
    },
     {
      id: 1594,
      title: 'Grand Theft Auto V',
      image: './Imagenes/GTA.jpg',
       Bannerimage: './Imagenes/GTAV_banner.jpg',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$5.99',
      discount: '-90%',
      description:"Sumérgete en la vida de tres criminales en la ciudad ficticia de Los Santos. Con una narrativa envolvente y un mundo abierto lleno de actividades, GTA V ofrece una experiencia de juego sin igual. ",
      videoUrls: [
        "https://www.youtube.com/embed/QkkoHAzjnUs",
        "https://www.youtube.com/embed/hvoD7ehZPcM"
      ],
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
          rating: '★★★★★',
          comment: 'Impresionante. Años después, sigue siendo adictivo.'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
          rating: '★★★★☆',
          comment: 'Muy completo, aunque el online puede mejorar.'
        }
      ]
    },
    {
      id: 1594,
      title: 'Mario Kart 8 Deluxe',
      image: './Imagenes/MK.jpeg',
       Bannerimage: './Imagenes/MK_banner.avif',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$53.99',
      discount: '-10%',
      description: 'En esta secuela del juego The Legend of Zelda: Breath of the Wild, decidirás tu propio camino a través de los extensos paisajes de Hyrule y las islas que flotan en los vastos cielos. ¿Podrás aprovechar el poder de las nuevas habilidades de Link para luchar contra las malévolas fuerzas que amenazan al reino?',
      videoUrls: [
        "https://www.youtube.com/embed/tKlRN2YpxRE",
       
      ],
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: '★★★★☆',
          comment: 'Gran Juego!'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          rating: '★★★★★',
          comment: '¡Uno de los mejores juegos que he probado este año!'
        }
      ]    
    },
    {
      id: 1594,
      title: 'Red Dead Redemption 2',
      image: './Imagenes/RD2.png',
       Bannerimage: './Imagenes/RD2_banner.jpeg',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$29.99',
      discount: '-50%',
      description:"Vive la vida de un forajido en el ocaso del Viejo Oeste. Con una historia profunda y un mundo abierto detallado, Red Dead Redemption 2 es una obra maestra de narrativa y jugabilidad.",
      videoUrls: [
        "https://www.youtube.com/embed/gmA6MrX81z4",
        "https://www.youtube.com/embed/eaW0tYpxyp0"
      ],
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
          rating: '★★★★★',
          comment: 'Increíble mundo abierto, lo mejor de Rockstar hasta ahora.'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
          rating: '★★★★☆',
          comment: 'Lento al inicio, pero luego se vuelve muy envolvente.'
        }
      ]
    },
     {
      id: 1594,
      title: 'The Witcher 3: Wild Hunt',
      image: './Imagenes/W3.jpg',
       Bannerimage: './Imagenes/W3_banner.png',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$29.99',
      discount: '-50%',
      description:"Vive la vida de un forajido en el ocaso del Viejo Oeste. Con una historia profunda y un mundo abierto detallado, Red Dead Redemption 2 es una obra maestra de narrativa y jugabilidad.",
      videoUrls: [
        "https://www.youtube.com/embed/XHrskkHf958"
      ],
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
          rating: '★★★★★',
          comment: 'Increíble mundo abierto, lo mejor de Rockstar hasta ahora.'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
          rating: '★★★★☆',
          comment: 'Lento al inicio, pero luego se vuelve muy envolvente.'
        }
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
        "https://www.youtube.com/embed/S6GTl_vPRvU"
      ],
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
          rating: '★★★★★',
          comment: 'Increíble mundo abierto, lo mejor de Rockstar hasta ahora.'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
          rating: '★★★★☆',
          comment: 'Lento al inicio, pero luego se vuelve muy envolvente.'
        }
      ]
    },
   {
      id: 1594,
      title: 'The Legend of Zelda: Tears of the Kingdom',
      image: './Imagenes/ZELDA COVER.jpg',
       Bannerimage: './Imagenes/ZELDA.avif',
      platforms: ['./Imagenes/NINTENDO.png'],
      originalPrice: '$59.99',
      discountedPrice: '$53.99',
      discount: '-10%',
      description: 'En esta secuela del juego The Legend of Zelda: Breath of the Wild, decidirás tu propio camino a través de los extensos paisajes de Hyrule y las islas que flotan en los vastos cielos. ¿Podrás aprovechar el poder de las nuevas habilidades de Link para luchar contra las malévolas fuerzas que amenazan al reino?',
      videoUrls: [
        "https://www.youtube.com/embed/zw47_q9wbBE",
        "https://www.youtube.com/embed/1rPxiXXxftE",
      ],
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: '★★★★☆',
          comment: 'Gran Juego!'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          rating: '★★★★★',
          comment: '¡Uno de los mejores juegos que he probado este año!'
        }
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
        "https://www.youtube.com/embed/mRLjrtX6Jes"
      ],
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
          rating: '★★★★★',
          comment: 'Increíble mundo abierto, lo mejor de Rockstar hasta ahora.'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
          rating: '★★★★☆',
          comment: 'Lento al inicio, pero luego se vuelve muy envolvente.'
        }
      ]
    },
     {
      id: 1594,
      title: 'EA Sports FC 24',
      image: './Imagenes/FC.jpg',
       Bannerimage: './Imagenes/FC_banner.jpeg',
      platforms: ['./Imagenes/PC3.PNG', './Imagenes/PS5.png', './Imagenes/XBOX.png'],
      originalPrice: '$59.99',
      discountedPrice: '$29.99',
      discount: '-50%',
      description:"Vive la vida de un forajido en el ocaso del Viejo Oeste. Con una historia profunda y un mundo abierto detallado, Red Dead Redemption 2 es una obra maestra de narrativa y jugabilidad.",
      videoUrls: [
        "https://www.youtube.com/embed/-vL01jbgENE"
      ],
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
          rating: '★★★★★',
          comment: 'Increíble mundo abierto, lo mejor de Rockstar hasta ahora.'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
          rating: '★★★★☆',
          comment: 'Lento al inicio, pero luego se vuelve muy envolvente.'
        }
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
        "https://www.youtube.com/embed/pYqyVpCV-3c"
      ],
      reviews: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
          rating: '★★★★★',
          comment: 'Increíble mundo abierto, lo mejor de Rockstar hasta ahora.'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
          rating: '★★★★☆',
          comment: 'Lento al inicio, pero luego se vuelve muy envolvente.'
        }
      ]
    },
   
    
  ];



 return (
    <div className="fondo">
      <BarraNavegacion />

      <div>
      <VideoGameCarousel games={games} title="Videojuegos Recomendados" />
    </div>

    

      <h1 className="section-title">Best Sellers</h1>

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

export default BestSellers