// src/pages/Estadisticas.tsx
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// Interfaz para los datos de ventas que esperamos del backend
interface MonthlySaleData {
  mes: string;
  ventas: number;
}

const Estadisticas = () => {
  const navigate = useNavigate();

  // Estados para el nombre del usuario logueado, el conteo total de usuarios y los datos de ventas
  const [currentUserName, setCurrentUserName] = useState<string>('Cargando...');
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [monthlySalesData, setMonthlySalesData] = useState<MonthlySaleData[]>([]);

  // Estados de carga y error para la UI
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener el nombre del usuario logueado
  const fetchCurrentUserName = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        setCurrentUserName('No Autenticado');
        navigate('/SignIn');
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
                console.error('Token inválido o expirado al intentar obtener perfil. Redirigiendo a SignIn.');
                localStorage.removeItem('token');
                navigate('/SignIn');
            }
            throw new Error(`Error al obtener el perfil del usuario: ${response.statusText}`);
        }

        const userData = await response.json();
        setCurrentUserName(userData.name);
    } catch (err) {
        console.error("Error al obtener el nombre del usuario:", err);
        setCurrentUserName('Error al cargar usuario');
    }
  };

  // Función para obtener el conteo total de usuarios
  const fetchTotalUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTotalUsers(null);
      setError('No hay token de autenticación para cargar el recuento de usuarios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/count', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            console.error('Error de autenticación/autorización al cargar recuento de usuarios. Redirigiendo a SignIn.');
            localStorage.removeItem('token');
            navigate('/SignIn');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al cargar el recuento de usuarios! Estado: ${response.status}`);
      }

      const data = await response.json();
      setTotalUsers(data.totalUsers);
    } catch (err: any) {
      console.error("Error al obtener el recuento de usuarios:", err);
      setError(err.message);
      setTotalUsers(null);
    }
  };

  // Función para obtener los datos de ventas mensuales
  const fetchMonthlySales = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token de autenticación para cargar las ventas mensuales.');
      return;
    }

    try {
      // Esta URL debe coincidir con la ruta que definiste en tu backend (ej. admin.routes.ts)
      const response = await fetch('http://localhost:3000/api/admin/sales/monthly', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            console.error('Error de autenticación/autorización al cargar ventas mensuales. Redirigiendo a SignIn.');
            localStorage.removeItem('token');
            navigate('/SignIn');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al cargar las ventas mensuales! Estado: ${response.status}`);
      }

      const data: MonthlySaleData[] = await response.json();
      setMonthlySalesData(data); // Actualiza el estado con los datos reales de ventas
    } catch (err: any) {
      console.error("Error al obtener las ventas mensuales:", err);
      setError(err.message);
      setMonthlySalesData([]); // Vacía los datos en caso de error
    }
  };

  // useEffect para ejecutar las funciones de fetch al cargar el componente
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      await fetchCurrentUserName(); // Carga el nombre del usuario para el sidebar
      await fetchTotalUsers();     // Carga el conteo total de usuarios
      await fetchMonthlySales();   // Carga los datos para el gráfico de ventas
      setLoading(false);
    };

    loadData();
  }, [navigate]);

  // UI de carga
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#282c34', color: 'white' }}>
        <h2>Cargando estadísticas...</h2>
      </div>
    );
  }

  // UI de error
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#282c34', color: 'red' }}>
        <h2>Error al cargar estadísticas: {error}</h2>
      </div>
    );
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="fondo2 p-4 text-white" style={{ width: "25%", minHeight: "100vh" }}>
        <div className="d-flex flex-column align-items-center">
          <div className="logo_Admin mb-3">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <h2 className="admin-title mb-4">{currentUserName}</h2> {/* Aquí se mostrará el nombre dinámico */}
          <Link to={"/Usuarios"} className="btn btn-purple w-100 mb-2 text-start">Users</Link>
          <Link to={"/AdminGames"} className="btn btn-purple w-100 mb-2 text-start">Games</Link>
          <Link to={"/Noticias"} className="btn btn-purple w-100 mb-2 text-start">News</Link>
          <Link to={'/Estadisticas'} className="btn btn-purple w-100 mb-4 text-start">Statistics</Link>
          <Link to="/" className="logout-btn">Log Out</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5" style={{ width: "75%" }}>
        <h2 className="mb-4">Statistics</h2>

        <div
          className="bg-light border rounded shadow-sm d-flex flex-column justify-content-center align-items-center mb-5"
          style={{ width: "250px", height: "150px" }}
        >
          <span className="text-secondary">Total registered users</span>
          <h1 className="fw-bold display-5">{totalUsers !== null ? totalUsers : 'Cargando...'}</h1> {/* Aquí se mostrará el conteo dinámico */}
        </div>

        <h4 className="mb-3">Earnings by month</h4>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            {/* Aquí el gráfico usará los datos de ventas obtenidos del backend */}
            <BarChart data={monthlySalesData} margin={{ bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="mes"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;