// src/pages/Estadisticas.tsx
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// Importaciones de Recharts
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// Interfaz para los datos de ventas mensuales que esperamos del backend
// Asegúrate de que esto coincida con la estructura de datos que tu backend envía para /api/admin/sales/monthly
interface MonthlySalesData { // Cambiado a MonthlySalesData para consistencia
  month: string;
  sales: number;
}

// Interfaz para el conteo total de usuarios (si tu backend lo devuelve así)
interface TotalUsersData {
  totalUsers: number;
}

const Estadisticas = () => {
  const navigate = useNavigate();

  // Estados para el nombre del usuario logueado, el conteo total de usuarios y los datos de ventas
  const [currentUserName, setCurrentUserName] = useState<string>('Cargando...');
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [monthlySalesData, setMonthlySalesData] = useState<MonthlySalesData[]>([]); // Usando la interfaz corregida

  // Estados de carga y error para la UI
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener el nombre del usuario logueado
  const fetchCurrentUserName = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUserName('No Autenticado');
      navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
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
          console.error('Token inválido o expirado al intentar obtener perfil. Redirigiendo a /signin.'); // CAMBIO CLAVE: Mensaje de log
          localStorage.removeItem('token');
          navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
        }
        throw new Error(`Error al obtener el perfil del usuario: ${response.statusText}`);
      }

      const userData = await response.json();
      setCurrentUserName(userData.name);
    } catch (err) {
      console.error("Error al obtener el nombre del usuario:", err);
      setCurrentUserName('Error al cargar usuario');
      setError((err as Error).message); // Captura el error y lo establece en el estado
    }
  };

  // Función para obtener el conteo total de usuarios
  const fetchTotalUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTotalUsers(null);
      setError('No hay token de autenticación para cargar el recuento de usuarios.');
      navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
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
            console.error('Error de autenticación/autorización al cargar recuento de usuarios. Redirigiendo a /signin.'); // CAMBIO CLAVE: Mensaje de log
            localStorage.removeItem('token');
            navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al cargar el recuento de usuarios! Estado: ${response.status}`);
      }

      const data: TotalUsersData = await response.json(); // Usa la interfaz para el tipo de respuesta
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
      navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/admin/sales/monthly', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            console.error('Error de autenticación/autorización al cargar ventas mensuales. Redirigiendo a /signin.'); // CAMBIO CLAVE: Mensaje de log
            localStorage.removeItem('token');
            navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al cargar las ventas mensuales! Estado: ${response.status}`);
      }

      const data: MonthlySalesData[] = await response.json(); // Usa la interfaz corregida
      setMonthlySalesData(data);
    } catch (err: any) {
      console.error("Error al obtener las ventas mensuales:", err);
      setError(err.message);
      setMonthlySalesData([]);
    }
  };

  // useEffect para ejecutar las funciones de fetch al cargar el componente
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null); // Limpia errores antes de cargar
      await fetchCurrentUserName();
      await fetchTotalUsers();
      await fetchMonthlySales();
      setLoading(false);
    };

    loadData();
  }, [navigate]);

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
          <h2 className="admin-title mb-4">{currentUserName}</h2>
          <Link to={"/usuarios"} className="btn btn-purple w-100 mb-2 text-start">Users</Link> {/* CAMBIO CLAVE: lowercase */}
          <Link to={"/admingames"} className="btn btn-purple w-100 mb-2 text-start">Games</Link> {/* CAMBIO CLAVE: lowercase */}
          <Link to={"/noticias"} className="btn btn-purple w-100 mb-2 text-start">News</Link> {/* CAMBIO CLAVE: lowercase */}
          <Link to={'/estadisticas'} className="btn btn-purple w-100 mb-4 text-start">Statistics</Link> {/* CAMBIO CLAVE: lowercase */}
          <Link to="/" className="logout-btn">Log Out</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5" style={{ width: "75%" }}>
        <h2 className="mb-4">Statistics</h2>

        {/* UI de carga y error para el contenido principal */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <h3>Cargando datos...</h3>
          </div>
        ) : error ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px', color: 'red' }}>
            <h3>Error al cargar datos: {error}</h3>
          </div>
        ) : (
          <>
            <div
              className="bg-light border rounded shadow-sm d-flex flex-column justify-content-center align-items-center mb-5"
              style={{ width: "250px", height: "150px" }}
            >
              <span className="text-secondary">Total registered users</span>
              <h1 className="fw-bold display-5">{totalUsers !== null ? totalUsers : 'N/A'}</h1>
            </div>

            <h4 className="mb-3">Earnings by month</h4>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={monthlySalesData} margin={{ bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month" // Asegúrate que dataKey sea 'month' para coincidir con la interfaz
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" /> {/* Asegúrate que dataKey sea 'sales' */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Estadisticas;
