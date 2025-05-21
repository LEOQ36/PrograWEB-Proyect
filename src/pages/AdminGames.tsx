
import { Link } from "react-router-dom";
import React, { useState } from "react";

type EliminarJuegosProps ={

  isOpen:boolean;

  onCancel:() =>void;

  onConfirm:() =>void;

};

const EliminarJuegos = ({ isOpen, onCancel, onConfirm }: EliminarJuegosProps) => {
  if (!isOpen) return null;
  return (
    <div className="modal_overlay">
      <div className="modal_content bg-light p-4 rounded text-center" style={{ width: "400px", margin: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <h5 className="mb-4">¿Estás seguro de que deseas eliminar este juego?</h5>
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

const AdminGames = () => {
const games = [
    {
      date: "12/12/2024",
      categorie: "Horror",
      name: "silent hill II",
      precioBase: "S/. 232.50",
      discount: "0%" 
    },
    {
      date: "27/11/2021",
      categorie: "Zombies",
      name: "The last of us, Remastered",
      precioBase: "S/. 159.00",
      discount: "25%"
    },
     {
      date: "10/12/2020",
      categorie: "Souls like",
      name: "Elden Ring",
      precioBase: "S/. 172.50",
      discount: "75%"
    }
  ];

  
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [iseditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedGameToDelete, setSelectedGameToDelete] = useState<string | null>(null);

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openFilterModal = () => setFilterModalOpen(true);
  const closeFilterModal = () => setFilterModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (gameName: string) => {
    setSelectedGameToDelete(gameName);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedGameToDelete(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    console.log(`Eliminando juego: ${selectedGameToDelete}`);
    // Aquí iría la lógica real de eliminación
    closeDeleteModal();
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
          <h1 className="text-dark">JUEGOS</h1>
          <div>
            <button className="btn btn-secondary me-2" onClick={openFilterModal}>Filter</button>
            <button className="btn btn-success" onClick={openAddModal}>+ADD</button>
          </div>
        </div>

        {/* Filter Modal */}
        {isFilterModalOpen && (
          <div className="modal_overlay">
            <div className="modal_content bg-light p-4 rounded" style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
              <h4 className="mb-4">Filter Games</h4>
              <div className="mb-3">
                <label className="form-label">Release Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Categorie</label>
                <input type="text" className="form-control" placeholder="Enter category" />
              </div>
              <div className="mb-3">
                <label className="form-label">Price Range</label>
                <div className="d-flex gap-2">
                  <input type="text" placeholder="Min" className="form-control rounded-pill" />
                  <input type="text" placeholder="Max" className="form-control rounded-pill" />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={closeFilterModal}>Cancel</button>
                <button className="btn btn-primary" onClick={closeFilterModal}>Submit</button>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="modal_overlay">
            <div className="modal_content bg-light p-4 rounded" style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
              <h2 className="mb-4">Add Game</h2>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Categorie</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Base Price</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Discount</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Release Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={closeAddModal}>Cancel</button>
                <button className="btn btn-primary" onClick={closeAddModal}>Submit</button>
              </div>
            </div>
          </div>
        )}

        {iseditModalOpen && (
          <div className="modal_overlay">
            <div
              className="modal_content bg-light p-4 rounded"
              style={{
                width: "400px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
              }}
            >
              <h4 className="mb-4 text-center">Edit game</h4>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" defaultValue="Silent Hill 2" />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-control">
                  <option>Horror</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="text" className="form-control" defaultValue="29.52" />
              </div>
              <div className="mb-3">
                <label className="form-label">Discount</label>
                <input type="text" className="form-control" defaultValue="0" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" defaultValue="Describe el juego..."></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Photo</label>
                <div className="border rounded bg-light text-center py-2">
                  <img src="https://via.placeholder.com/100x60?text=Image" alt="Preview" />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
                <button className="btn btn-primary" onClick={closeEditModal}>Submit</button>
              </div>
            </div>
          </div>
        )}        

        {/* Games Table */}
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">DATE</th>
              <th scope="col">CATEGORIE</th>
              <th scope="col">NAME</th>
              <th scope="col">BASE PRICE</th>
              <th scope="col">DISCOUNT</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr>
                <td>{game.date}</td>
                <td>{game.categorie}</td>
                <td>{game.name}</td>
                <td>{game.precioBase}</td>
                <td>{game.discount}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={openEditModal}>✏️</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(game.name)}>🗑️</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EliminarJuegos
          isOpen={isDeleteModalOpen}
          onCancel={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default AdminGames;

