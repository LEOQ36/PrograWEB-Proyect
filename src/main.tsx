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
        <Route path='/' element={<SignIn />} />
        <Route path='/Registro' element={<SignUp />} />
        <Route path='/CambiarContraseña' element={<ChangePassword />} />
        <Route path='/Verificacion' element={<Verificacion />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/TopRated' element={<TopRated />} />
        <Route path='/BestSellers' element={<BestSellers />} />
        <Route path='/Carrito' element={<ShoppingCart />} />
        <Route path='/RealizarPago' element={<RealizarPago />} />
        <Route path='/Estadisticas' element={<Estadisticas />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Usuarios' element={<Usuarios />} />
        <Route path='/AdminGames' element={<AdminGames />} />
        <Route path='/Noticias' element={<Noticias />} />
        <Route path='/JuegosComprados' element={<JuegosComprados />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
