
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Noticias = () => {
  const noticias = [
    {
      id: 1,
      photo: "https://via.placeholder.com/150",
      name: "Breaking News",
      description: "Description of the first news."
    },
    {
      id: 2,
      photo: "https://via.placeholder.com/150",
      name: "Tech Update",
      description: "Description of the second news."
    }
  ];

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [AddModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const EditClick = () => {
    setEditModalOpen(true);
  };

   const AddClick = () => {
    setAddModalOpen(true);
  };

   const DeleteClick = () => {
    setDeleteModalOpen(true);
  };
  
   const SubmitClick = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    
  };

  const Cancelclick = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };


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

      {/* Main Content */}
      <div className="bg-white p-4" style={{ width: "75%" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-dark">NOTICIAS</h1>
          <button className="btn btn-success" onClick={AddClick}>+ADD</button>
        </div>

        {/* Edit Modal */}
        {editModalOpen && (
          <div className="modal_overlay">
            <div
              className="modal_content bg-light p-4 rounded"
              style={{
                width: "400px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
              }}
            >
              <h2 className="mb-4">Edit News</h2>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Photo</label>
                <div
                  className="photo-placeholder"
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f8f8f8",
                    marginTop: "8px"
                  }}
                >
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Placeholder"
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={Cancelclick}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={SubmitClick}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

      {/* ADD Modal */}
        {AddModalOpen && (
          <div
            className="modal_overlay">
            <div
              className="modal_content bg-light p-4 rounded"
              style={{
                width: "400px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2 className="mb-4">Add new</h2>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Photo</label>
                <div
                  className="photo-placeholder"
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f8f8f8",
                    marginTop: "8px",
                  }}
                >
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Placeholder"
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-secondary"
                  onClick={Cancelclick}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={SubmitClick}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

      {/* DELETE Modal */}
        {deleteModalOpen && (
          <div className="modal_overlay">
            <div
              className="modal_content bg-light p-4 rounded text-center"
              style={{
                width: "400px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2 className="mb-3">Borrar Registro</h2>
              <p className="mb-4">Estas seguro de que quieres borrar este registro?</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary w-45" onClick={Cancelclick}>
                  Cancel
                </button>
                <button className="btn btn-primary w-45" onClick={SubmitClick}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Photo</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((noticia) => (
              <tr key={noticia.id}>
                <td>{noticia.id}</td>
                <td>
                  <img
                    src={noticia.photo || "https://via.placeholder.com/100"}
                    alt=""
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{noticia.name}</td>
                <td>{noticia.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={EditClick}
                  >
                    ✏️
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={DeleteClick}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Noticias;
