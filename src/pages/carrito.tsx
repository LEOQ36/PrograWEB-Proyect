const ShoppingCart = () => {
  return (
    <div className="container-fluid bg-dark text-white p-4" style={{ minHeight: '100vh' }}>
      <div className="mb-4 d-flex align-items-center">
        <i className="bi bi-cart-fill fs-4 me-2"></i>
        <h4 className="mb-0">Shopping Cart</h4>
      </div>

      {/* Zona de juegos en el carrito */}
      <div className="d-flex flex-wrap gap-4 mb-4">
        {/* Grand Theft Auto V */}
        <div className="game-card-custom bg-light text-dark position-relative rounded p-2">
          <button className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1" title="Remove">
            ×
          </button>
         <img src="./Imagenes/GTA.jpg" alt="GTA V" className="game-img" />
          <div className="game-info text-center">
            <h6 className="fw-bold mt-2 mb-1">Grand Theft Auto V</h6>
          </div>
        </div>

        {/* Minecraft */}
        <div className="game-card-custom bg-light text-dark position-relative rounded p-2">
          <button className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1" title="Remove">
            ×
          </button>
          <img src="./Imagenes/RD2.png" alt="Minecraft" className="game-img" />
          <div className="game-info text-center">
            <h6 className="fw-bold mt-2 mb-1">Red Dead Redemption 2</h6>
           
          </div>
        </div>

        {/* League of Legends */}
        <div className="game-card-custom bg-light text-dark position-relative rounded p-2">
          <button className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1" title="Remove">
            ×
          </button>
          <img src="./Imagenes/GOW.png" alt="League of Legends" className="game-img" />
          <div className="game-info text-center">
            <h6 className="fw-bold mt-2 mb-1">God Of War Ragnarok</h6>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="d-flex flex-column align-items-start">
        
        <a className="btn btn-success mb-2" href="/RealizarPago">✔ Confirm Order</a>
        <a className="btn btn-success mb-2" href="/Home">✖ Cancel Order</a>
        
      </div>
    </div>
  );
};

export default ShoppingCart;