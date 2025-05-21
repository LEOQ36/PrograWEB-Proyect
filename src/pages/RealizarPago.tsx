import Logo from "../components/Logo";
import { Link } from "react-router-dom";


const RealizarPago = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-white" style={{ height: '100vh' }}>
      <div className="bg-secondary p-4 rounded shadow" style={{ width: '400px' }}>
         <div className="logo-wrapper">
            <Link to="/Home">
              <Logo />
              </Link>
            </div>

        <form>
          <div className="mb-3">
            <label className="form-label">Nombres:</label>
            <input type="text" className="form-control" placeholder="Ingresa tu nombre completo" />
          </div>
          <div className="mb-3">
            <label className="form-label">Direccion:</label>
            <input type="text" className="form-control" placeholder="Ingresa tu direccion" />
          </div>
          <div className="mb-3">
            <label className="form-label">Numero de Tarjeta:</label>
            <input type="text" className="form-control" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div style={{ width: '48%' }}>
              <label className="form-label">CVV:</label>
              <input type="text" className="form-control" placeholder="123" />
            </div>
            <div style={{ width: '48%' }}>
              <label className="form-label">Fecha de Caducidad:</label>
              <input type="text" className="form-control" placeholder="MES/AÑO" />
            </div>
          </div>

          <button type="submit" className="btn btn-light w-100">✔ Proceder con el pago</button>
        </form>

        <div className="mt-4 text-white-50 small text-center">
         
        </div>
      </div>
    </div>
  );
};

export default RealizarPago;