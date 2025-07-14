import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Interfaz para un usuario (con los campos que esperamos del perfil)
interface UserProfile {
  id: number;
  name: string;
  email: string;
  estado: boolean; // Coincide con el backend
  role: string;    // Coincide con el backend
}

// Interfaz para los usuarios que se muestran en la tabla
// ¡CAMBIO CLAVE AQUÍ! Ahora incluye email, role y estado directamente
interface UserTableItem {
  id: number;
  photo?: string; // Opcional, si tienes fotos de perfil
  name: string;
  email: string;   // Añadido para mostrar el email
  role: string;    // Añadido para mostrar el rol
  estado: boolean; // Añadido para mostrar el estado (activo/inactivo)
  createdAt: string; // Útil para mostrar la fecha de creación
}

const Usuarios = () => {
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState<string>('Cargando...');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [usersList, setUsersList] = useState<UserTableItem[]>([]); // Lista de usuarios para la tabla

  // Función para obtener el nombre del usuario logueado (para el sidebar)
  const fetchCurrentUserName = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUserName('No Autenticado');
      navigate('/signin');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/auth/profile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error('Token inválido o expirado al intentar obtener perfil. Redirigiendo a /signin.');
          localStorage.removeItem('token');
          navigate('/signin');
        }
        throw new Error(`Error al obtener el perfil del usuario: ${response.statusText}`);
      }

      const userData: UserProfile = await response.json();
      setCurrentUserName(userData.name);
    } catch (err) {
      console.error("Error al obtener el nombre del usuario:", err);
      setCurrentUserName('Error al cargar usuario');
      setError((err as Error).message);
    }
  };

  // Función para obtener la lista de usuarios del backend
  const fetchUsersList = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token de autenticación para cargar usuarios.');
      navigate('/signin');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users', { // Endpoint para obtener todos los usuarios
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error('Error de autenticación/autorización al cargar usuarios. Redirigiendo a /signin.');
          localStorage.removeItem('token');
          navigate('/signin');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al cargar usuarios: ${response.statusText}`);
      }

      const data: UserTableItem[] = await response.json(); // Los datos del backend deben coincidir con UserTableItem
      setUsersList(data);
    } catch (err: any) {
      console.error("Error al obtener lista de usuarios:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUserName();
    fetchUsersList(); // Carga la lista de usuarios al montar el componente
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#282c34', color: 'white' }}>
        <h2>Cargando Usuarios...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#282c34', color: 'red' }}>
        <h2>Error al cargar Usuarios: {error}</h2>
      </div>
    );
  }

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
          <h2 className="admin-title">{currentUserName}</h2>
          <Link to={"/usuarios"} className="btn btn-purple w-100 mb-2 text-start">Users</Link>
          <Link to={"/admingames"} className="btn btn-purple w-100 mb-2 text-start">Games</Link>
          <Link to={"/noticias"} className="btn btn-purple w-100 mb-2 text-start">News</Link>
          <Link to={'/estadisticas'} className="btn btn-purple w-100 mb-4 text-start">Statistics</Link>
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
              <th scope="col">Email</th>   {/* Encabezado para Email */}
              <th scope="col">Role</th>    {/* Encabezado para Role */}
              <th scope="col">Status</th>  {/* Encabezado para Status */}
              <th scope="col">Created At</th> {/* Encabezado para Fecha de Creación */}
            </tr>
          </thead>
          <tbody>
            {usersList.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">No hay usuarios disponibles.</td> {/* colSpan ajustado a 7 */}
              </tr>
            ) : (
              usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      src={user.photo || "https://via.placeholder.com/50"}
                      alt={user.name}
                      className="rounded-circle"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>   {/* Muestra el email */}
                  <td>{user.role}</td>    {/* Muestra el rol */}
                  <td>{user.estado ? 'Activo' : 'Inactivo'}</td> {/* Muestra el estado */}
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td> {/* Muestra la fecha de creación */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
