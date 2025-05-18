const Home = () => {
    return <div className="fondo">
    <nav  className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <div className="me-3">
            <button className="btn btn-secondary" type="button">Explore</button>
        </div>
        <div className="dropdown me-3">
            <button className="btn btn-secondary" type="button">Categories</button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="">Best Sellers</a></li>
                <li><a className="dropdown-item" href="">Top Rated</a></li>
                <li><a className="dropdown-item" href="">Free to Play</a></li>
                <li><a className="dropdown-item" href="">Multiplayer</a></li>
                <li><a className="dropdown-item" href="">Early Access</a></li>
            </ul>
        </div>

         <div className="dropdown me-3">
            <button className="btn btn-secondary" type="button">Home</button>        
        </div>

         <div className="dropdown me-3">
            <button className="btn btn-secondary" type="button">Platform</button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="">PS5</a></li>
                <li><a className="dropdown-item" href="">Xbox</a></li>
                <li><a className="dropdown-item" href="">PC</a></li>
                <li><a className="dropdown-item" href="">Switch</a></li>
            </ul>
        </div>

         <div className="dropdown me-3">
            <button className="btn btn-secondary" type="button">Special Offers</button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="">90%</a></li>
                <li><a className="dropdown-item" href="">75%</a></li>
                <li><a className="dropdown-item" href="">50%</a></li>
                <li><a className="dropdown-item" href="">25%</a></li>
                <li><a className="dropdown-item" href="">10%</a></li>      
            </ul>
        </div>
    </nav>

    <div className="container my-4">
    <div className="d-flex justify-content-between mb-2">
      <button className="btn btn-secondary"> Previous</button>
      <div className="text-center">Games</div>
      <button className="btn btn-secondary">Next </button>
    </div>
  </div>

  <div className="container">
    <h5>Best Sellers</h5>
    <div className="row">
      
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box">Game 1</div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box">Game 2</div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box">Game 3</div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box">Game 4</div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box">Game 5</div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box">Game 6</div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box">Game 7</div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box">Game 8</div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box">Game 9</div>
      </div>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="game-box">Game 10</div>
      </div>
    </div>
  </div>


 </div>
    


}

export default Home