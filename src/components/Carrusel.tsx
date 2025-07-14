import React from 'react';

export interface CarouselGame {
  title: string;
  bannerImage: string;
  description?: string;
}

interface VideoGameCarouselProps {
  games: CarouselGame[];
  title?: string;
}

const VideoGameCarousel: React.FC<VideoGameCarouselProps> = ({ games, title }) => {
  return (
    <div className=" my-4">
      {title && <h2 className="text-center text-white mb-4">{title}</h2>}

      <div id="videoGameCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner rounded shadow">

          {games.map((game, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              data-bs-interval={index === 0 ? 10000 : 5000}
            >
              <img src={game.bannerImage} className="d-block w-100" alt={game.title} style={{ maxHeight: '500px', objectFit: 'cover' }} />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>{game.title}</h5>
                {game.description && <p>{game.description}</p>}
              </div>
            </div>
          ))}

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#videoGameCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#videoGameCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default VideoGameCarousel;