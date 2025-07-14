import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Verificacion = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Verificación exitosa. Ahora puedes iniciar sesión.");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(data.error || "❌ Código inválido.");
      }
    } catch (err) {
      setMessage("❌ Error al verificar el código.");
    }
  };

  return (
    <div className="fondo body">
      <div>
        <div className="text-center">
          <img
            src="/templates/Logo.png"
            alt="GameStore Logo"
            className="img-fluid"
            style={{ maxWidth: "150px", cursor: "pointer" }}
          />
        </div>
        <h3 className="text-center mb-4">Please confirm your identity</h3>
        <div className="container">
          <p>
            We’ve sent a confirmation code to your email. Please enter it below
            along with your email address.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 text-start">
              <label>Confirmation code:</label>
              <input
                type="text"
                className="form-control"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-custom w-100">
              Verify confirmation
            </button>
          </form>

          {message && <p className="text-center mt-3">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Verificacion;
