import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// --- INTERFACES ACTUALIZADAS ---
interface Categoria {
  id: number;
  nombre: string;
}

interface Plataforma {
  id: number;
  nombre: string;
}

// Nueva interfaz para el usuario (solo con los campos que necesitamos)
interface UserInGame {
    id: number;
    name: string; // Esperamos el campo 'name' del usuario
}

interface Game {
  id: number;
  title: string;
  description: string;
  price: number;
  publisher: string;
  estado: boolean;
  estaOferta: boolean;
  createdAt: string;
  categoriaId: number;
  plataformaId: number;
  userId: number;
  categoria?: Categoria;
  plataforma?: Plataforma;
  user?: UserInGame; // <-- ¡AHORA ESPERAMOS ESTO DEL BACKEND!
}

// Interfaz para el estado del formulario de añadir/editar
interface FormData {
  id?: number;
  title: string;
  description: string;
  price: number;
  publisher: string;
  estaOferta: boolean;
  estado: boolean;
  userId: number; // Asegúrate de que este userId sea válido en tu DB.
  categoriaId: number; // Ahora se seleccionará de las opciones cargadas
  plataformaId: number; // Ahora se seleccionará de las opciones cargadas
}
// --- FIN DE INTERFACES ---

type EliminarJuegosProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const EliminarJuegos = ({ isOpen, onCancel, onConfirm }: EliminarJuegosProps) => {
  if (!isOpen) return null;
  return (
    <div className="modal_overlay">
      <div className="modal_content bg-light p-4 rounded text-center" style={{ width: "400px", margin: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <h5 className="mb-4">¿Estás seguro de que deseas eliminar este juego?</h5>
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

const AdminGames = () => {
  const navigate = useNavigate();

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string>('Cargando...'); // <-- NUEVO ESTADO PARA EL NOMBRE

  // Nuevos estados para categorías y plataformas
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [plataformas, setPlataformas] = useState<Plataforma[]>([]);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(true);
  const [errorOptions, setErrorOptions] = useState<string | null>(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedGameIdToDelete, setSelectedGameIdToDelete] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: 0,
    publisher: '',
    estaOferta: false,
    estado: true,
    userId: 1, // <<< Este ID es fijo, asegúrate de que exista un usuario con ID 1 en tu DB
    categoriaId: 0, // Se inicializa en 0 o un valor por defecto que tu backend acepte
    plataformaId: 0, // Se inicializa en 0 o un valor por defecto que tu backend acepte
  });

  const [currentEditGame, setCurrentEditGame] = useState<Game | null>(null);

  // --- NUEVA FUNCIÓN: OBTENER EL NOMBRE DEL USUARIO LOGUEADO ---
  const fetchCurrentUserName = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUserName('No Autenticado');
      navigate('/signin'); // Redirigir si no hay token
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/auth/profile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error('Token inválido o expirado al intentar obtener perfil. Redirigiendo a /signin.');
          localStorage.removeItem('token');
          navigate('/signin');
        }
        throw new Error(`Error al obtener el perfil del usuario: ${response.statusText}`);
      }

      const userData = await response.json();
      setCurrentUserName(userData.name); // Establece el nombre del usuario
    } catch (err) {
      console.error("Error al obtener el nombre del usuario:", err);
      setCurrentUserName('Error al cargar usuario');
    }
  };

  // --- FUNCIONES PARA OBTENER CATEGORIAS Y PLATAFORMAS ---
  const fetchOptions = async () => {
    setLoadingOptions(true);
    setErrorOptions(null);
    const token = localStorage.getItem('token');

    if (!token) {
      setErrorOptions('No hay token de autenticación para cargar opciones.');
      setLoadingOptions(false);
      navigate('/signin');
      return;
    }

    try {
      const [categoriasRes, plataformasRes] = await Promise.all([
        fetch('http://localhost:3000/api/categorias', {
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3000/api/plataformas', {
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (!categoriasRes.ok) {
        throw new Error(`Error al cargar categorías: ${categoriasRes.statusText}`);
      }
      if (!plataformasRes.ok) {
        throw new Error(`Error al cargar plataformas: ${plataformasRes.statusText}`);
      }

      const categoriasData: Categoria[] = await categoriasRes.json();
      const plataformasData: Plataforma[] = await plataformasRes.json();

      setCategorias(categoriasData);
      setPlataformas(plataformasData);

      setFormData(prev => ({
        ...prev,
        categoriaId: categoriasData.length > 0 ? categoriasData[0].id : 0,
        plataformaId: plataformasData.length > 0 ? plataformasData[0].id : 0,
      }));

    } catch (err: any) {
      console.error("Error al cargar opciones (categorías/plataformas):", err);
      setErrorOptions(err.message);
      if (err.message.includes('401') || err.message.includes('403')) {
          localStorage.removeItem('token');
          navigate('/signin');
      }
    } finally {
      setLoadingOptions(false);
    }
  };

  // --- FUNCIONES PARA ABRIR/CERRAR MODALES ---
  const openAddModal = () => {
    setCurrentEditGame(null);
    setFormData({
      title: '', description: '', price: 0, publisher: '', estaOferta: false, estado: true, userId: 1,
      categoriaId: categorias.length > 0 ? categorias[0].id : 0,
      plataformaId: plataformas.length > 0 ? plataformas[0].id : 0,
    });
    setAddModalOpen(true);
  };
  const closeAddModal = () => setAddModalOpen(false);

  const openFilterModal = () => setFilterModalOpen(true);
  const closeFilterModal = () => setFilterModalOpen(false);

  const openEditModal = (game: Game) => {
    setCurrentEditGame(game);
    setFormData({
      id: game.id,
      title: game.title,
      description: game.description,
      price: game.price,
      publisher: game.publisher,
      estaOferta: game.estaOferta,
      estado: game.estado,
      userId: game.userId,
      categoriaId: game.categoriaId,
      plataformaId: game.plataformaId,
    });
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setCurrentEditGame(null);
    setEditModalOpen(false);
  };

  const openDeleteModal = (gameId: number) => {
    setSelectedGameIdToDelete(gameId);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedGameIdToDelete(null);
    setDeleteModalOpen(false);
  };
  // --- FIN FUNCIONES MODALES ---

  // --- FETCH: OBTENER JUEGOS (READ ALL) ---
  const fetchGames = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No hay token de autenticación, redirigiendo a /signin');
      navigate('/signin');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/games', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error('Error de autenticación/autorización. Token inválido o expirado. Redirigiendo a /signin.');
          localStorage.removeItem('token');
          navigate('/signin');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Error HTTP! Estado: ${response.status}`);
      }
      const data: Game[] = await response.json();
      setGames(data);
    } catch (err: any) {
      console.error("Error al obtener juegos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUserName(); // <-- LLAMADA PARA OBTENER EL NOMBRE DEL USUARIO
    fetchOptions();
    fetchGames();
  }, [navigate]);

  // --- FUNCIONES DE CRUD (con AUTHENTICATION HEADER) ---

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'price' || name === 'categoriaId' || name === 'plataformaId' || name === 'userId' ? parseFloat(value) : value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token de autenticación. Por favor, inicia sesión.');
      setLoading(false);
      navigate('/signin');
      return;
    }

    if (formData.categoriaId === 0 || formData.plataformaId === 0) {
      setError('Por favor, selecciona una Categoría y una Plataforma válidas.');
      setLoading(false);
      return;
    }

    try {
      const url = currentEditGame ? `http://localhost:3000/api/games/${currentEditGame.id}` : 'http://localhost:3000/api/games';
      const method = currentEditGame ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            console.error('Error de autenticación/autorización. Token inválido o expirado.');
            localStorage.removeItem('token');
            navigate('/signin');
            return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al ${currentEditGame ? 'actualizar' : 'crear'} el juego!`);
      }

      await fetchGames();
      closeAddModal();
      closeEditModal();

    } catch (err: any) {
      console.error(`Error al ${currentEditGame ? 'actualizar' : 'crear'} juego:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (selectedGameIdToDelete === null) return;
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token de autenticación. Por favor, inicia sesión.');
      setLoading(false);
      closeDeleteModal();
      navigate('/signin');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/games/${selectedGameIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            console.error('Error de autenticación/autorización. Token inválido o expirado.');
            localStorage.removeItem('token');
            navigate('/signin');
            return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al eliminar el juego!`);
      }

      await fetchGames();
      closeDeleteModal();
    } catch (err: any) {
      console.error("Error al eliminar juego:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // --- FIN FUNCIONES DE CRUD ---


  // --- Renderizado de estados de carga/error ---
  if (loading || loadingOptions) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <h2>Cargando datos...</h2>
      </div>
    );
  }

  if (error || errorOptions) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', color: 'red' }}>
        <h2>Error al cargar los juegos o sus opciones: {error || errorOptions}</h2>
      </div>
    );
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="fondo2 p-4 text-white" style={{ width: "25%", minHeight: "100vh" }}>
        <div className="d-flex flex-column align-items-center">
          <div className="logo_Admin">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <h2 className="admin-title">{currentUserName}</h2> {/* <-- CAMBIO CLAVE: Muestra el nombre dinámico */}
          <Link to={"/Usuarios"} className="btn btn-purple w-100 mb-2 text-start">Users</Link>
          <Link to={"/AdminGames"} className="btn btn-purple w-100 mb-2 text-start">Games</Link>
          <Link to={"/Noticias"} className="btn btn-purple w-100 mb-2 text-start">News</Link>
          <Link to={'/Estadisticas'} className="btn btn-purple w-100 mb-4 text-start">Statistics</Link>
          <Link to={"/"} className="logout-btn">Log Out</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white p-4" style={{ width: "75%" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-dark">JUEGOS</h1>
          <div>
            <button className="btn btn-secondary me-2" onClick={openFilterModal}>Filter</button>
            <button className="btn btn-success" onClick={openAddModal}>+ADD</button>
          </div>
        </div>

        {/* Filter Modal */}
        {isFilterModalOpen && (
          <div className="modal_overlay">
            <div className="modal_content bg-light p-4 rounded" style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
              <h4 className="mb-4">Filter Games</h4>
              <div className="mb-3">
                <label className="form-label">Release Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Categorie</label>
                <input type="text" className="form-control" placeholder="Enter category" />
              </div>
              <div className="mb-3">
                <label className="form-label">Price Range</label>
                <div className="d-flex gap-2">
                  <input type="text" placeholder="Min" className="form-control rounded-pill" />
                  <input type="text" placeholder="Max" className="form-control rounded-pill" />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={closeFilterModal}>Cancel</button>
                <button className="btn btn-primary" onClick={closeFilterModal}>Submit</button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {(isAddModalOpen || isEditModalOpen) && (
          <div className="modal_overlay">
            <div className="modal_content bg-light p-4 rounded" style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
              <h2 className="mb-4">{currentEditGame ? 'Editar Juego' : 'Agregar Juego'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio Base</label>
                  <input type="number" step="0.01" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Publicador</label>
                  <input type="text" className="form-control" name="publisher" value={formData.publisher} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-control"
                    name="categoriaId"
                    value={formData.categoriaId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Plataforma</label>
                  <select
                    className="form-control"
                    name="plataformaId"
                    value={formData.plataformaId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una plataforma</option>
                    {plataformas.map(plat => (
                      <option key={plat.id} value={plat.id}>{plat.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="estaOferta" name="estaOferta" checked={formData.estaOferta} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="estaOferta">¿Está en Oferta?</label>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="estado" name="estado" checked={formData.estado} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="estado">¿Está Activo?</label>
                </div>
                <input type="hidden" name="userId" value={formData.userId} />

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" onClick={currentEditGame ? closeEditModal : closeAddModal}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">{currentEditGame ? 'Actualizar' : 'Agregar'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Games Table */}
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">FECHA</th>
              <th scope="col">CATEGORIA</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">PRECIO BASE</th>
              <th scope="col">OFERTA</th>
              <th scope="col">ESTADO</th>
              <th scope="col">CREADO POR</th>
              <th scope="col">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {games.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center">No hay juegos disponibles.</td>
              </tr>
            ) : (
              games.map((game) => (
                <tr key={game.id}>
                  <td>{game.id}</td>
                  <td>{new Date(game.createdAt).toLocaleDateString()}</td>
                  <td>{game.categoria?.nombre || 'N/A'}</td>
                  <td>{game.title}</td>
                  <td>S/. {game.price.toFixed(2)}</td>
                  <td>{game.estaOferta ? 'Sí' : 'No'}</td>
                  <td>{game.estado ? 'Activo' : 'Inactivo'}</td>
                  <td>{game.user?.name || 'Desconocido'}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(game)}>✏️</button>
                    <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(game.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <EliminarJuegos
          isOpen={isDeleteModalOpen}
          onCancel={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default AdminGames;