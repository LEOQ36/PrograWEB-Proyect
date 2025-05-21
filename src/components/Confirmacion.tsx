
import React from 'react';
import './Confirmacion.css'; 

type ConfirmacionProps = {
  isOpen: boolean;
  onClose: () => void;

};


const Confirmacion: React.FC<ConfirmacionProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (

    <div className="gdl-modal-overlay-confirm">
      <div className="gdl-modal-content-confirm">
        <button className="gdl-modal-close-button" onClick={onClose}>×</button>
        <div className="gdl-modal-body-confirm">
          
          <h2>¡Compra completada con éxito!</h2>
          <div className="gdl-check-icon">✔️</div>
          <p>Las claves para el(los) juego(s) comprado(s) han sido enviadas a la dirección de correo electrónico correspondiente.</p>
        </div>
      </div>
    </div>
  );
};

export default Confirmacion;
