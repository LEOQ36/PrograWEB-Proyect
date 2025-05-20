import ChangePassword from './pages/ChangePassword';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'; 
import './pages/class.css';                 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import IdConfirm from './pages/IdConfirm';
import Home from './pages/Home';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TopRated from './pages/TopRated';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/Registro' element={<SignUp />} />
        <Route path='/CambiarContraseña' element={<ChangePassword />} />
        <Route path='/Verificacion' element={<IdConfirm />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/TopRated' element={<TopRated />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
