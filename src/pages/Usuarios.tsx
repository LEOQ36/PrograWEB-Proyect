import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";

const Usuarios = () => {
  const usuarios = [
    {
      id: 1,
      photo: "https://via.placeholder.com/150",
      name: "Jonathan04982",
      description: "Rodrigo Arrieta",
    },
    {
      id: 2,
      photo: "https://via.placeholder.com/150",
      name: "PepitoLaVior77",
      description: "Fidel Castro",
    },
  ];

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
          <Link to="/UsuariosAdmin" className="btn btn-purple w-100 mb-2 text-start">Users</Link>
          <Link to="/GamesAdmin" className="btn btn-purple w-100 mb-2 text-start">Games</Link>
          <Link to="/NoticiasAdmin" className="btn btn-purple w-100 mb-2 text-start">News</Link>
          <Link to="/EstadisticasAdmin" className="btn btn-purple w-100 mb-4 text-start">Statistics</Link>
          <Link to="/" className="logout-btn">Log Out</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white p-4" style={{ width: "75%" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-dark">USUARIOS</h1>
        </div>

        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Photo</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>
                  <img
                    src={usuario.photo || "https://via.placeholder.com/100"}
                    alt=""
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{usuario.name}</td>
                <td>{usuario.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;