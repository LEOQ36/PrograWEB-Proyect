import { useNavigate } from "react-router-dom";
import React, { useState } from "react"; // <-- Importa useState
import Logo from "../components/Logo";

const SignIn = () => {
  const navigate = useNavigate();

  // --- ESTADOS PARA EL FORMULARIO Y MENSAJES ---
  const [email, setEmail] = useState(''); // Usaremos 'email' para el campo de usuario/email
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
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    setLoading(true);
    setError(null); // Limpia errores previos

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', { // <-- URL de tu endpoint de login en el backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Envía el email y la contraseña
      });

      const data = await response.json(); // Parsea la respuesta del backend

      if (!response.ok) {
        // Si la respuesta no es 2xx (ej. 400, 401, 500), maneja el error
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Si el login fue exitoso, el backend debería devolver un token
      if (data.token) {
        localStorage.setItem('token', data.token); // <-- Guarda el token en localStorage
        // Si tu backend devuelve el rol del usuario, también podrías guardarlo:
        // localStorage.setItem('userRole', data.user.role);

        console.log('Inicio de sesión exitoso. Token:', data.token);

        // Decide a dónde navegar basado en el rol o simplemente a Home por ahora
        // if (data.user.role === 'admin') {
        //   navigate('/Admin');
        // } else {
        //   navigate('/Home');
        // }
        navigate('/Home'); // Por ahora, siempre navega a Home
      } else {
        throw new Error('No se recibió token de autenticación.');
      }
    } catch (err: any) {
      console.error('Error de inicio de sesión:', err);
      setError(err.message); // Muestra el error al usuario
    } finally {
      setLoading(false);
    }
  };
  // --- FIN FUNCIÓN DE INICIO DE SESIÓN ---

  const handleAdminClick = () => {
    // Esta función podría ser usada para un login de admin específico o para navegar si ya está logueado como admin
    navigate("/Admin");
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
          onClick={handleAdminClick} // Podrías redirigir a /Admin si el usuario ya es admin
        >
          Administrador
        </button>
      </div>

      <div className="container text-center">
        <h2 className="mb-3">Sign in to GameStore</h2>
        <form onSubmit={handleSignIn}> {/* <-- Asocia el formulario con handleSignIn */}
          <div className="text-start mb-3">
            <label className="form-label">Username or email address:</label>
            <input
              type="text"
              className="form-control"
              value={email} // <-- Asocia el valor con el estado
              onChange={handleEmailChange} // <-- Asocia el cambio con el manejador
              required
            />
          </div>
          <div className="text-start mb-3">
            <label className="form-label">Password:</label>
            <div>
              <input
                type="password"
                className="form-control me-2"
                value={password} // <-- Asocia el valor con el estado
                onChange={handlePasswordChange} // <-- Asocia el cambio con el manejador
                required
              />
              <a href="/CambiarContraseña" className="forgot-link">
                Forgot your password?
              </a>
            </div>
          </div>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} {/* <-- Muestra errores */}

          <button
            type="submit" // <-- Cambiado a 'submit' para que el formulario lo maneje
            className="btn btn-light"
            disabled={loading} // Deshabilita el botón mientras carga
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