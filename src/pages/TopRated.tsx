import BarraNavegacion from '../components/BarraNavegacion';

const TopRated = () => {
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

        {/* Zelda */}
        <div className="game-card-custom">
          <img src="./Imagenes/ZELDA COVER.jpg" alt="Zelda" className="game-img" />
          <div className="game-info">
            <h5>The Legend of Zelda: Tears of the Kingdom</h5>
            <img src="./Imagenes/NINTENDO.png" alt="Nintendo" className="platform-logo" />
            <p className="price">
              <span className="original-price">$59.99</span> $53.99 <span className="discount">-10%</span>
            </p>
            <p className="stars1">★★★★★</p>
          </div>
        </div>

        {/* Elden Ring */}
        <div className="game-card-custom">
          <img src="./Imagenes/ELDENRING.jpg" alt="Elden Ring" className="game-img" />
          <div className="game-info">
            <h5>Elden Ring</h5>
            <img src="./Imagenes/PS5.png" alt="PS5" className="platform-logo" />
            <img src="./Imagenes/PC3.PNG" alt="PC" className="platform-logo" />
            <img src="./Imagenes/XBOX.png" alt="Xbox" className="platform-logo" />
            <p className="price">
              <span className="original-price">$59.99</span> $29.99 <span className="discount">-50%</span>
            </p>
            <p className="stars1">★★★★★</p>
          </div>
        </div>

        {/* Super Mario Odyssey */}
        <div className="game-card-custom">
          <img src="./Imagenes/supermario.jpg" alt="Super Mario Odyssey" className="game-img" />
          <div className="game-info">
            <h5>Super Mario Odyssey</h5>
            <img src="./Imagenes/NINTENDO.png" alt="Nintendo" className="platform-logo" />
            <p className="price">
              <span className="original-price">$59.99</span> $5.99 <span className="discount">-90%</span>
            </p>
            <p className="stars1">★★★★★</p>
          </div>
        </div>

        {/* Super Mario 3D World */}
        <div className="game-card-custom">
          <img src="./Imagenes/MARIO3D.jpg" alt="Mario 3D World" className="game-img" />
          <div className="game-info">
            <h5>Super Mario 3D World + Bowser's Fury</h5>
            <img src="./Imagenes/NINTENDO.png" alt="Nintendo" className="platform-logo" />
            <p className="price">
              <span className="original-price">$59.99</span> $44.99 <span className="discount">-25%</span>
            </p>
            <p className="stars1">★★★★★</p>
          </div>
        </div>

        {/* Spider-Man 2 */}
        <div className="game-card-custom">
          <img src="./Imagenes/SPIDERMAN.png" alt="Spider-Man 2" className="game-img" />
          <div className="game-info">
            <h5>Marvel's Spider-Man 2</h5>
            <img src="./Imagenes/PS5.png" alt="PS5" className="platform-logo" />
            <p className="price">
              <span className="original-price">$69.99</span> $69.29 <span className="discount">-1%</span>
            </p>
            <p className="stars1">★★★★★</p>
          </div>
        </div>

        {/* Cyberpunk */}
        <div className="game-card-custom">
          <img src="./Imagenes/CYBERPUNK.jpeg" alt="Cyberpunk 2077" className="game-img" />
          <div className="game-info">
            <h5>Cyberpunk 2077</h5>
            <img src="./Imagenes/PC3.PNG" alt="PC" className="platform-logo" />
            <img src="./Imagenes/PS5.png" alt="PS5" className="platform-logo" />
            <img src="./Imagenes/XBOX.png" alt="Xbox" className="platform-logo" />
            <p className="price">
              <span className="original-price">$49.99</span> $24.99 <span className="discount">-50%</span>
            </p>
            <p className="stars1">★★★★★</p>
          </div>
        </div>

        {/* Astro Bot */}
        <div className="game-card-custom">
          <img src="./Imagenes/AB.png.webp" alt="Astro Bot" className="game-img" />
          <div className="game-info">
            <h5>Astro Bot</h5>
            <img src="./Imagenes/PS5.png" alt="PS5" className="platform-logo" />
            <p className="price">
              <span className="original-price">$59.99</span> $53.99 <span className="discount">-10%</span>
            </p>
            <p className="stars1">★★★★★</p>
          </div>
        </div>

        {/* God of War Ragnarok */}
        <div className="game-card-custom">
          <img src="./Imagenes/GOW.png" alt="God of War Ragnarok" className="game-img" />
          <div className="game-info">
            <h5>God Of War Ragnarok</h5>
            <img src="./Imagenes/PS5.png" alt="PS5" className="platform-logo" />
            <p className="price">
              <span className="original-price">$69.99</span> $62.99 <span className="discount">-10%</span>
            </p>
            <p className="stars1">★★★★★</p>
          </div>
        </div>

        {/* GTA V */}
        <div className="game-card-custom">
          <img src="./Imagenes/GTA.jpg" alt="GTA V" className="game-img" />
          <div className="game-info">
            <h5>Grand Theft Auto V</h5>
            <img src="./Imagenes/PC3.PNG" alt="PC" className="platform-logo" />
            <img src="./Imagenes/PS5.png" alt="PS5" className="platform-logo" />
            <img src="./Imagenes/XBOX.png" alt="Xbox" className="platform-logo" />
            <p className="price">
              <span className="original-price">$59.99</span> $5.99 <span className="discount">-90%</span>
            </p>
            <p className="stars1">★★★★★</p>
          </div>
        </div>

        {/* Red Dead Redemption 2 */}
        <div className="game-card-custom">
          <img src="./Imagenes/RD2.png" alt="Red Dead Redemption 2" className="game-img" />
          <div className="game-info">
            <h5>Red Dead Redemption 2</h5>
            <img src="./Imagenes/PC3.PNG" alt="PC" className="platform-logo" />
            <img src="./Imagenes/PS5.png" alt="PS5" className="platform-logo" />
            <img src="./Imagenes/XBOX.png" alt="Xbox" className="platform-logo" />
            <p className="price">
              <span className="original-price">$59.99</span> $29.99 <span className="discount">-50%</span>
            </p>
            <p className="stars1">★★★★★</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopRated;
