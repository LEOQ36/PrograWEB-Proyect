import BarraNavegacion from "../components/BarraNavegacion"
import Game from "../components/Game"

const Home = () => {
    return <div className="fondo">

      <BarraNavegacion/>

    <div className="container my-4">
    <div className="d-flex justify-content-between mb-2">
      <button className="btn btn-secondary"> Previous</button>
      <div className="text-center">Games</div>
      <button className="btn btn-secondary">Next </button>
    </div>
  </div>

  <div className="">
    <h5>Best Sellers</h5>
    <div className="row">
      
      <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-5">
        <div className="game-box"><Game backgroundImage="/Imagenes/RD2.png" link="/Registro"/></div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box"><Game backgroundImage="/Imagenes/MC.png" link="/Registro"/></div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box"><Game backgroundImage="/Imagenes/RD2.png" link="/Registro"/></div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box"><Game backgroundImage="/Imagenes/RD2.png" link="/Registro"/></div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box"><Game backgroundImage="/Imagenes/RD2.png" link="/Registro"/></div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box"><Game backgroundImage="/Imagenes/RD2.png" link="/Registro"/></div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box"><Game backgroundImage="/Imagenes/RD2.png" link="/Registro"/></div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box"><Game backgroundImage="/Imagenes/RD2.png" link="/Registro"/></div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box"><Game backgroundImage="/Imagenes/RD2.png" link="/Registro"/></div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box"><Game backgroundImage="/Imagenes/RD2.png" link="/Registro"/></div>
      </div>
    </div>
  </div>


 </div>
    


}

export default Home