// src/components/BarraNavegacion.tsx
import { useState } from 'react';
import { FaUser, FaSearch, FaShoppingCart, FaApplePay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UsuarioActualizacion from './UsuarioActualizacion'; 

const BarraNavegacion = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  // Función handleGuardarPerfil (adaptada para reflejar los campos de UsuarioActualizacion)
  const handleGuardarPerfil = (datosPerfil: {
    firstName: string;
    lastName: string;
    email: string;
    archivoImagenPerfil?: File | null;
  }) => {
    console.log("Datos del perfil guardados desde BarraNavegacion:", datosPerfil);
    setMostrarModal(false); // Cierra el modal después de guardar
  }; // ¡Corchete de cierre agregado aquí!

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#6c757d' }}>
        <div className="container-fluid d-flex align-items-center">
          <Link to="/explore" className="btn text-white mx-1">Explore</Link>

          <div className="dropdown mx-1">
            <button className="btn text-white dropdown-toggle" data-bs-toggle="dropdown">
              Categories
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/BestSellers">Best Sellers</Link></li>
              <li><Link className="dropdown-item" to="/TopRated">Top Rated</Link></li>
              <li><Link className="dropdown-item" to="/free-to-play">Free to Play</Link></li>
              <li><Link className="dropdown-item" to="/multiplayer">Multiplayer</Link></li>
              <li><Link className="dropdown-item" to="/early-access">Early Access</Link></li>
            </ul>
          </div>

          <Link to="/home" className="btn text-white mx-1">Home</Link>

          <div className="dropdown mx-1">
            <button className="btn text-white dropdown-toggle" data-bs-toggle="dropdown">
              Platform
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/ps5">PS5</Link></li>
              <li><Link className="dropdown-item" to="/xbox">Xbox</Link></li>
              <li><Link className="dropdown-item" to="/pc">PC</Link></li>
              <li><Link className="dropdown-item" to="/switch">Switch</Link></li>
            </ul>
          </div>

          <div className="dropdown mx-1">
            <button className="btn text-white dropdown-toggle" data-bs-toggle="dropdown">
              Special Offers
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/offers/90">90%</Link></li>
              <li><Link className="dropdown-item" to="/offers/75">75%</Link></li>
              <li><Link className="dropdown-item" to="/offers/50">50%</Link></li>
              <li><Link className="dropdown-item" to="/offers/25">25%</Link></li>
              <li><Link className="dropdown-item" to="/offers/10">10%</Link></li>
            </ul>
          </div>

          <div className="ms-auto d-flex align-items-center">
            <Link className="btn text-white mx-1" to="/carrito">
              <FaShoppingCart />
            </Link>
            <button className="btn text-white mx-1" onClick={() => setMostrarModal(true)}>
              <FaUser />
            </button>
            <Link className="btn text-white mx-1" to="/search">
              <FaSearch />
            </Link>
            <div className="dropdown mx-1">
          <button className="btn text-white dropdown-toggle" data-bs-toggle="dropdown">
            <FaApplePay />
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="./JuegosComprados">Mis compras</a></li>

          </ul>
        </div>
          </div>
        </div>
      </nav>

      <UsuarioActualizacion
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        alGuardar={handleGuardarPerfil}
      />
    </>
  );
};

export default BarraNavegacion;
