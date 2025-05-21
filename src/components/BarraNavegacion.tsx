import { FaUser, FaSearch } from 'react-icons/fa'

const BarraNavegacion = () => {
   return <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#6c757d' }}>
      <div className="container-fluid d-flex align-items-center">

        
        <button className="btn text-white mx-1">Explore</button>

        <div className="dropdown mx-1">
          <button className="btn text-white dropdown-toggle" data-bs-toggle="dropdown">
            Categories
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Best Sellers</a></li>
            <li><a className="dropdown-item" href="TopRated">Top Rated</a></li>
            <li><a className="dropdown-item" href="#">Free to Play</a></li>
            <li><a className="dropdown-item" href="#">Multiplayer</a></li>
            <li><a className="dropdown-item" href="#">Early Access</a></li>
          </ul>
        </div>

        <a href="/home" className="btn text-white mx-1">Home</a>

        <div className="dropdown mx-1">
          <button className="btn text-white dropdown-toggle" data-bs-toggle="dropdown">
            Platform
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">PS5</a></li>
            <li><a className="dropdown-item" href="#">Xbox</a></li>
            <li><a className="dropdown-item" href="#">PC</a></li>
            <li><a className="dropdown-item" href="#">Switch</a></li>
          </ul>
        </div>

        <div className="dropdown mx-1">
          <button className="btn text-white dropdown-toggle" data-bs-toggle="dropdown">
            Special Offers
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">90%</a></li>
            <li><a className="dropdown-item" href="#">75%</a></li>
            <li><a className="dropdown-item" href="#">50%</a></li>
            <li><a className="dropdown-item" href="#">25%</a></li>
            <li><a className="dropdown-item" href="#">10%</a></li>
          </ul>
        </div>

        {/* Íconos alineados a la derecha */}
        <div className="ms-auto d-flex align-items-center">
          <button className="btn text-white mx-1">
            <FaUser />
          </button>
          <button className="btn text-white mx-1">
            <FaSearch />
          </button>
        </div>

      </div>
    </nav>

}

export default BarraNavegacion