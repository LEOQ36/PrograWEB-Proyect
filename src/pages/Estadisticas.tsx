import React from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";



const data = [
 { mes: "Enero", ventas: 11000 },
 { mes: "Febrero", ventas: 7000 },
 { mes: "Marzo", ventas: 7200 },
 { mes: "Abril", ventas: 10200 },
 { mes: "Mayo", ventas: 6000 },
 { mes: "Junio", ventas: 8000 },
 { mes: "Julio", ventas: 5800 },
 { mes: "Agosto", ventas: 5900 },
 { mes: "Septiembre", ventas: 7300 },
 { mes: "Octubre", ventas: 8100 },
 { mes: "Noviembre", ventas: 9500 },
 { mes: "Diciembre", ventas: 6200 },
];



const Estadisticas = () => {
 return (
  <div className="d-flex">
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
     <h2 className="admin-title mb-4">Jonathan Smith</h2>
     <Link to={"/Usuarios"} className="btn btn-purple w-100 mb-2 text-start">Users</Link>
     <Link to={"/AdminGames"} className="btn btn-purple w-100 mb-2 text-start">Games</Link>
     <Link to={"/Noticias"} className="btn btn-purple w-100 mb-2 text-start">News</Link>
     <Link to={"/Estadisticas"} className="btn btn-purple w-100 mb-4 text-start">Statistics</Link>
     <Link to="/" className="logout-btn">Log Out</Link>
    </div>

   </div>



   <div className="p-5" style={{ width: "75%" }}>

    <h2 className="mb-4">Statistics</h2>



    <div

     className="bg-light border rounded shadow-sm d-flex flex-column justify-content-center align-items-center mb-5"

     style={{ width: "250px", height: "150px" }}

    >

     <span className="text-secondary">Total registered users</span>

     <h1 className="fw-bold display-5">120</h1>

    </div>



    <h4 className="mb-3">Earnings by month</h4>

    <div style={{ width: '100%', height: 300 }}>

     <ResponsiveContainer>

      <BarChart data={data} margin={{ bottom: 50 }}>

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

