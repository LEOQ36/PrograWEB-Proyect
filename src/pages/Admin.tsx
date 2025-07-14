import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import React, { useState, useEffect } from "react"; // Importa useState y useEffect

// Nueva interfaz para el usuario (solo con los campos que necesitamos)
interface UserInAdmin {
    id: number;
    name: string; // Esperamos el campo 'name' del usuario
}

const Admin = () => {
    const navigate = useNavigate(); // Inicializa navigate

    const [currentUserName, setCurrentUserName] = useState<string>('Cargando...'); // Estado para el nombre del usuario

    // --- FUNCIÓN: OBTENER EL NOMBRE DEL USUARIO LOGUEADO ---
    const fetchCurrentUserName = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setCurrentUserName('No Autenticado');
            navigate('/signin'); // Redirigir si no hay token
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

            const userData: UserInAdmin = await response.json(); // Usa la interfaz UserInAdmin
            setCurrentUserName(userData.name); // Establece el nombre del usuario
        } catch (err) {
            console.error("Error al obtener el nombre del usuario en Admin.tsx:", err);
            setCurrentUserName('Error al cargar usuario');
        }
    };

    // Llama a la función al montar el componente
    useEffect(() => {
        fetchCurrentUserName();
    }, [navigate]); // Agrega navigate como dependencia

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
                    {/* CAMBIO CLAVE AQUÍ: Muestra el nombre del usuario logueado */}
                    <h2 className="admin-title">{currentUserName}</h2>
                    <Link to={"/Usuarios"} className="btn btn-purple w-100 mb-2 text-start">Users</Link>
                    <Link to={"/AdminGames"} className="btn btn-purple w-100 mb-2 text-start">Games</Link>
                    <Link to={"/Noticias"} className="btn btn-purple w-100 mb-2 text-start">News</Link>
                    <Link to={'/Estadisticas'} className="btn btn-purple w-100 mb-4 text-start">Statistics</Link>
                    <Link to={"/"} className="logout-btn">Log Out</Link>
                </div>
            </div>
            {/* Si Admin.tsx tuviera contenido principal, iría aquí */}
            <div className="bg-white p-4" style={{ width: "75%" }}>
                {/* Contenido principal de la página de administración si lo hubiera */}
                <h1>Bienvenido al Panel de Administración</h1>
                <p>Usa el menú lateral para navegar.</p>
            </div>
        </div>
    );
};

export default Admin;