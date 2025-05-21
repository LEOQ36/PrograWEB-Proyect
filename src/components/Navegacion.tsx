import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import IdConfirm from "../pages/IdConfirm";
import Noticias from "../pages/Noticias";
import Usuarios from "../pages/Usuarios";
import Estadisticas from "../pages/Estadisticas";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/IdConfirm" element={<IdConfirm />} />
        <Route path="/UsuariosAdmin" element={<Usuarios/>}/>
        <Route path="/NoticiasAdmin" element={<Noticias/>}/>
        <Route path="/GamesAdmin" element={<Noticias/>}/>
        <Route path="EstadisticasAdmin" element={<Estadisticas/>}/>
      </Routes>
    </Router>
  );
};

export default Navigation;
