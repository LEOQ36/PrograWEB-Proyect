import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useState } from "react";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value.trim();
        const newPassword = form.newPassword.value;
        const confirmPassword = form.confirmPassword.value;

        if (!email || !newPassword || !confirmPassword) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setError("");

        setMensaje("Contraseña actualizada exitosamente. Inicia sesión.");

        setTimeout(() => {
            navigate("/SignIn"); 
        }, 2500);
    };

    return (
        <div className="body fondo">
            <div>
                <div className="text-center"><Logo /></div>
                <h3 className="text-center mb-4">Restablecer contraseña</h3>
                <div className="container">
                    {mensaje && (
                        <div className="alert alert-success text-center">
                            {mensaje}
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger text-center">
                            {error}
                        </div>
                    )}
                    <p>
                        Ingresa tu correo y tu nueva contraseña para continuar.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Correo electrónico:</label>
                            <input type="email" name="email" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label>Nueva contraseña:</label>
                            <input type="password" name="newPassword" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label>Confirmar nueva contraseña:</label>
                            <input type="password" name="confirmPassword" className="form-control" required />
                        </div>
                        <button type="submit" className="btn btn-custom w-100">
                            Restablecer contraseña
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
