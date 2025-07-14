import ChangePassword from './pages/ChangePassword';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'; 
import './pages/class.css';                 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Verificacion from './pages/verificacion';
import Home from './pages/Home';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TopRated from './pages/TopRated';
import BestSellers from './pages/BestSellers';
import ShoppingCart from './pages/carrito';
import RealizarPago from './pages/RealizarPago';
import Estadisticas from './pages/Estadisticas';
import Admin from './pages/Admin';
import Usuarios from './pages/Usuarios';
import AdminGames from './pages/AdminGames';
import Noticias from './pages/Noticias';
import JuegosComprados from './pages/JuegosComprados';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta principal puede ser SignIn o Home */}
        <Route path='/' element={<SignIn />} />

        {/* Rutas con minúscula */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/registro' element={<SignUp />} />
        <Route path='/cambiarcontraseña' element={<ChangePassword />} />
        <Route path='/verificacion' element={<Verificacion />} />
        <Route path='/home' element={<Home />} />
        <Route path='/toprated' element={<TopRated />} />
        <Route path='/bestsellers' element={<BestSellers />} />
        <Route path='/carrito' element={<ShoppingCart />} />
        <Route path='/realizarpago' element={<RealizarPago />} />
        <Route path='/estadisticas' element={<Estadisticas />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path='/admingames' element={<AdminGames />} />
        <Route path='/noticias' element={<Noticias />} />
        <Route path='/juegoscomprados' element={<JuegosComprados />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
