import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Logo from "../components/Logo";

const SignIn = () => {
  const navigate = useNavigate();

  // --- ESTADOS PARA EL FORMULARIO Y MENSAJES ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // --- FIN ESTADOS ---

  // --- MANEJADOR DE CAMBIOS EN LOS INPUTS ---
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // --- FIN MANEJADOR DE CAMBIOS ---

  // --- FUNCIÓN PARA INICIAR SESIÓN (FETCH POST) ---
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        // Si tu backend devuelve el rol del usuario, también podrías guardarlo:
        if (data.user && data.user.role) {
          localStorage.setItem('userRole', data.user.role);
        }

        console.log('Inicio de sesión exitoso. Token:', data.token);

        // Decide a dónde navegar basado en el rol o simplemente a Home por ahora
        // CAMBIO CLAVE: Usa '/admin' en minúsculas si esa es la ruta definida
        if (data.user && data.user.role === 'admin') {
          navigate('/admin'); // Navega a /admin si el rol es 'admin'
        } else {
          navigate('/home'); // Navega a /home para usuarios normales (o si no hay rol)
        }
      } else {
        throw new Error('No se recibió token de autenticación.');
      }
    } catch (err: any) {
      console.error('Error de inicio de sesión:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // --- FIN FUNCIÓN DE INICIO DE SESIÓN ---

  const handleAdminClick = () => {
    // CAMBIO CLAVE: Navega a '/admin' en minúsculas
    navigate("/admin");
  };

  return (
    <div className="body fondo">
      <div className="d-flex flex-column align-items-start p-3">
        <div className="logo-wrapper">
          <Logo />
        </div>
        <span> Game Store</span>

        <button
          type="button"
          className="btn btn-sm mt-2"
          style={{ backgroundColor: '#8a2be2', borderColor: '#8a2be2', color: 'white' }}
          onClick={handleAdminClick}
        >
          Administrador
        </button>
      </div>

      <div className="container text-center">
        <h2 className="mb-3">Sign in to GameStore</h2>
        <form onSubmit={handleSignIn}>
          <div className="text-start mb-3">
            <label className="form-label">Username or email address:</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="text-start mb-3">
            <label className="form-label">Password:</label>
            <div>
              <input
                type="password"
                className="form-control me-2"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <a href="/CambiarContraseña" className="forgot-link">
                Forgot your password?
              </a>
            </div>
          </div>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          <button
            type="submit"
            className="btn btn-light"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-3">
          New to GameStore? <a href="/Registro">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;