import ChangePassword from './pages/ChangePassword';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';  // mejor usar la ruta así
import './pages/class.css';                  // ruta local para tus estilos
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import IdConfirm from './pages/IdConfirm';
import Home from './pages/Home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/Registro' element={<SignUp />} />
        <Route path='/CambiarContraseña' element={<ChangePassword />} />
        <Route path='/Verificacion' element={<IdConfirm />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
