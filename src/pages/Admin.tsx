import { Link } from "react-router-dom";

const Admin = () => {
    return (

    <div className="d-flex">
      {/* Sidebar */}
      <div className="fondo2 p-4 text-white" style={{ width: "25%", minHeight: "100vh" }}>
        <div className="d-flex flex-column align-items-center">
          <div className="logo_Admin">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <h2 className="admin-title">Jonathan Smith</h2>
          <Link to={"/Usuarios"} className="btn btn-purple w-100 mb-2 text-start">Users</Link>
          <Link to={"/AdminGames"} className="btn btn-purple w-100 mb-2 text-start">Games</Link>
          <Link to={"/Noticias"} className="btn btn-purple w-100 mb-2 text-start">News</Link>
          <Link to={'/Estadisticas'} className="btn btn-purple w-100 mb-4 text-start">Statistics</Link>
          <Link to={"/"} className="logout-btn">Log Out</Link>
        </div>
      </div>
    </div>
      );
    
};

export default Admin;