import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form[0] as HTMLInputElement).value;
    const password = (form[1] as HTMLInputElement).value;
    const name = (form[2] as HTMLInputElement).value;

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        navigate("/Verificacion");
      } else {
        const error = await response.json();
        alert("❌ Error: " + error.error);
      }
    } catch (err) {
      console.error("❌ Error de red:", err);
      alert("❌ Error de red");
    }
  };

  return (
    <div className="">
      <div className="row">
        <div className="body fondo col-md-6 p-4 d-flex flex-column justify-content-center align-items-center text-center">
          <div className="mb-4">
            <span className="fw-semibold fs-3 d-block mb-2">GameStore</span>
            <img
              src="./public/templates/Logo.png"
              alt="GameStore Logo"
              className="img-fluid"
              style={{ maxWidth: "150px" }}
            />
          </div>
          <h4 className="mb-2">Create your free account</h4>
          <p className="mb-0">Explore your favorite games and play without restrictions</p>
        </div>

        <div className="fondo2 col-md-6 d-flex align-items-center">
          <div className="w-100 px-4">
            <h3 className="mb-4">Sign up to GameStore</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Username or email:</label>
                <input type="email" className="form-control" required />
              </div>

              <div className="mb-3">
                <label>Password:</label>
                <input type="password" className="form-control" required />
                <div className="form-text">
                  La contraseña debe tener como máximo 15 caracteres o al menos 8 caracteres incluyendo un número y un carácter especial.
                </div>
              </div>

              <div className="mb-3">
                <label>Username:</label>
                <input type="text" className="form-control" required />
              </div>

              <div className="mb-3">
                <label>País/Región:</label>
                <select className="form-select" required>
                  <option>United States</option>
                  <option>Argentina</option>
                  <option>Spain</option>
                  <option>Peru</option>
                  <option>Others</option>
                </select>
                <div className="form-text">
                  Para mantenerte informado, guardaremos información del país para enviarte actualizaciones y noticias.
                </div>
              </div>

              <button type="submit" className="btn btn-custom w-100 mb-3">
                Continue →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
