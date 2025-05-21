
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import Confirmacion from '../components/Confirmacion'; 

const RealizarPago = () => {
  const navigate = useNavigate();


  const [nombreCompleto, setNombreCompleto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [cvv, setCvv] = useState('');
  const [fechaCaducidad, setFechaCaducidad] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const handlePaymentSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 

    console.log("Datos del formulario capturados (simulados):", {
      nombreCompleto,
      direccion,
      numeroTarjeta,
      cvv,
      fechaCaducidad,
    });

   
    
    setTimeout(() => { 
      setIsModalOpen(true);
      console.log("Modal de confirmación de compra abierto.");
    }, 500); 
  };


  const handleCloseModalAndRedirect = () => {
    setIsModalOpen(false); 
    navigate("/Home"); 
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-white" style={{ height: '100vh' }}>
      <div className="bg-secondary p-4 rounded shadow" style={{ width: '400px' }}>
        <div className="logo-wrapper">
          <Link to="/Home">
            <Logo />
          </Link>
        </div>

        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombres:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu nombre completo"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Direccion:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Numero de Tarjeta:</label>
            <input
              type="text"
              className="form-control"
              placeholder="1234 5678 9012 3456"
              value={numeroTarjeta}
              onChange={(e) => setNumeroTarjeta(e.target.value)}
              maxLength={19}
              required
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div style={{ width: '48%' }}>
              <label className="form-label">CVV:</label>
              <input
                type="text"
                className="form-control"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={4}
                required
              />
            </div>
            <div style={{ width: '48%' }}>
              <label className="form-label">Fecha de Caducidad:</label>
              <input
                type="text"
                className="form-control"
                placeholder="MES/AÑO"
                value={fechaCaducidad}
                onChange={(e) => setFechaCaducidad(e.target.value)}
                maxLength={7}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-light w-100">✔ Proceder con el pago</button>
        </form>

        <div className="mt-4 text-white-50 small text-center">
        </div>
      </div>

      <Confirmacion
        isOpen={isModalOpen}
        onClose={handleCloseModalAndRedirect}
      />
    </div>
  );
};

export default RealizarPago;
