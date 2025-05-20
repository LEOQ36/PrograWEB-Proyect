import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/Home");
  };

  return (
    <div className="body fondo">
      <div className="">
        <div className="logo-wrapper">
          <Logo />
        </div>
        <span> Game Store</span>
      </div>

      <div className="container text-center">
        <h2 className="mb-3">Sign in to GameStore</h2>
        <form>
          <div className="text-start mb-3">
            <label className="form-label">Username or email address:</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="text-start mb-3">
            <label className="form-label">Password:</label>
            <div>
              <input type="password" className="form-control me-2" required />
              <a href="/CambiarContraseña" className="forgot-link">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-light"
            onClick={handleSignIn}
          >
            Sign in
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
