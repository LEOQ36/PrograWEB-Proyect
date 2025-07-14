// frontend_project/src/pages/Noticias.tsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Interfaz para los datos de una noticia, que coincide con tu modelo Prisma News
interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string; // Opcional en el backend, por eso es opcional aquí
  createdAt: string;
  updatedAt: string;
  // activo: boolean; // Campo 'activo' eliminado de la interfaz, si ya no lo usas
}

const Noticias = () => {
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState<string>('Cargando...');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Estado para errores generales

  // Estados para controlar la visibilidad de tus modales
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Estado para la noticia que se está editando/eliminando
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);

  // Estado para el formulario de agregar/editar noticias
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    imageUrl: '',
    // activo: true, // Campo 'activo' eliminado del estado del formulario si ya no lo usas
  });

  // Estado para diferenciar entre agregar y editar en el modal genérico
  const [isEditing, setIsEditing] = useState(false);

  // --- Funciones para Abrir/Cerrar Modales ---

  const handleEditClick = (newsItem: NewsItem) => {
    setIsEditing(true);
    setCurrentNews(newsItem);
    setNewsForm({
      title: newsItem.title,
      content: newsItem.content,
      imageUrl: newsItem.imageUrl || '',
      // activo: newsItem.activo, // Campo 'activo' eliminado
    });
    setEditModalOpen(true);
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentNews(null);
    setNewsForm({ title: '', content: '', imageUrl: '' });
    setAddModalOpen(true);
  };

  const handleDeleteClick = (newsItem: NewsItem) => {
    setCurrentNews(newsItem);
    setDeleteModalOpen(true);
  };

  const handleCancelClick = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setCurrentNews(null);
    setNewsForm({ title: '', content: '', imageUrl: '' });
    setError(null); // Limpia cualquier error al cerrar el modal
  };

  // --- Lógica de Interacción con el Backend (CRUD) ---

  // Obtener noticias
  const fetchNews = async () => {
    setLoading(true);
    setError(null); // Limpia errores antes de la nueva carga
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicie sesión.');
      navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/news', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error('Error de autenticación/autorización al cargar noticias. Redirigiendo a /signin.'); // CAMBIO CLAVE: Mensaje de log
          localStorage.removeItem('token');
          navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al cargar noticias: ${response.statusText}`);
      }

      const data: NewsItem[] = await response.json();
      setNews(data);
    } catch (err: any) {
      console.error("Error al obtener noticias:", err);
      setError(err.message); // Muestra el error en la UI
    } finally {
      setLoading(false);
    }
  };

  // Agregar o Editar noticia (manejador para el submit del formulario)
  const handleSubmitNewsForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Podrías añadir un estado de carga para el formulario
    setError(null); // Limpia errores antes del submit

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicie sesión.');
      setLoading(false);
      navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
      return;
    }

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:3000/api/news/${currentNews?.id}`
      : 'http://localhost:3000/api/news';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newsForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al ${isEditing ? 'actualizar' : 'crear'} noticia.`);
      }

      handleCancelClick();
      fetchNews();
    } catch (err: any) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'crear'} noticia:`, err);
      setError(err.message); // Muestra el error en la UI
    } finally {
      setLoading(false); // Finaliza la carga del formulario
    }
  };

  // Eliminar noticia (manejador para confirmar la eliminación)
  const handleConfirmDelete = async () => {
    if (!currentNews) return;

    setLoading(true); // Podrías añadir un estado de carga para la eliminación
    setError(null); // Limpia errores antes de la eliminación

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado. Por favor, inicie sesión.');
      setLoading(false);
      navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/news/${currentNews.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al eliminar noticia.`);
      }

      handleCancelClick();
      fetchNews();
    } catch (err: any) {
      console.error("Error al eliminar noticia:", err);
      setError(err.message); // Muestra el error en la UI
    } finally {
      setLoading(false); // Finaliza la carga de la eliminación
    }
  };

  // Maneja los cambios en los campos del formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewsForm({
      ...newsForm,
      [name]: value,
    });
  };

  // --- Efectos de Carga Inicial ---

  useEffect(() => {
    // Función para obtener el nombre del usuario logueado (para el sidebar)
    const fetchCurrentUserName = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCurrentUserName('No Autenticado');
        navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
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
            console.error('Token inválido o expirado al intentar obtener perfil. Redirigiendo a /signin.'); // CAMBIO CLAVE: Mensaje de log
            localStorage.removeItem('token');
            navigate('/signin'); // CAMBIO CLAVE: Redirigir a '/signin'
          }
          throw new Error(`Error al obtener el perfil del usuario: ${response.statusText}`);
        }

        const userData = await response.json();
        setCurrentUserName(userData.name);
      } catch (err) {
        console.error("Error al obtener el nombre del usuario:", err);
        setCurrentUserName('Error al cargar usuario');
      }
    };

    fetchCurrentUserName();
    fetchNews();
  }, [navigate]);

  // --- Renderizado de la UI (Carga, Error, Contenido) ---

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#282c34', color: 'white' }}>
        <h2>Cargando Noticias...</h2>
      </div>
    );
  }

  // Muestra el error general del componente
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#282c34', color: 'red' }}>
        <h2>Error al cargar Noticias: {error}</h2>
      </div>
    );
  }

  return (
    <div className="d-flex">
      {/* Sidebar - Asegúrate de que las clases y estilos coincidan con tu AdminGames */}
      <div className="fondo2 p-4 text-white" style={{ width: "25%", minHeight: "100vh" }}>
        <div className="d-flex flex-column align-items-center">
          <div className="logo_Admin mb-3">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="rounded-circle w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <h2 className="admin-title mb-4">{currentUserName}</h2>
          <Link to={"/Usuarios"} className="btn btn-purple w-100 mb-2 text-start">Users</Link>
          <Link to={"/AdminGames"} className="btn btn-purple w-100 mb-2 text-start">Games</Link>
          <Link to={"/Noticias"} className="btn btn-purple w-100 mb-2 text-start">News</Link>
          <Link to={'/Estadisticas'} className="btn btn-purple w-100 mb-4 text-start">Statistics</Link>
          <Link to="/" className="logout-btn btn btn-danger w-100">Log Out</Link>
        </div>
      </div>

      {/* Main Content - Noticias */}
      <div className="bg-white p-4" style={{ width: "75%" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-dark">NEWS</h1>
          <button className="btn btn-success" onClick={handleAddClick}>+ADD</button>
        </div>

        {/* Modal Base Structure (Apply Bootstrap modal classes) */}
        {(editModalOpen || addModalOpen || deleteModalOpen) && (
          <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              {/* EDIT Modal Content */}
              {editModalOpen && currentNews && (
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit News</h5>
                    <button type="button" className="btn-close" onClick={handleCancelClick} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmitNewsForm}>
                      <div className="mb-3">
                        <label htmlFor="editTitle" className="form-label">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editTitle"
                          name="title"
                          value={newsForm.title}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="editContent" className="form-label">Content</label>
                        <textarea
                          className="form-control"
                          id="editContent"
                          name="content"
                          value={newsForm.content}
                          onChange={handleFormChange}
                          required
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="editImageUrl" className="form-label">Image URL</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editImageUrl"
                          name="imageUrl"
                          value={newsForm.imageUrl}
                          onChange={handleFormChange}
                          placeholder="Optional: Enter image URL"
                        />
                      </div>
                      <div className="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ADD Modal Content */}
              {addModalOpen && (
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add New News</h5>
                    <button type="button" className="btn-close" onClick={handleCancelClick} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmitNewsForm}>
                      <div className="mb-3">
                        <label htmlFor="addTitle" className="form-label">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="addTitle"
                          name="title"
                          value={newsForm.title}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="addContent" className="form-label">Content</label>
                        <textarea
                          className="form-control"
                          id="addContent"
                          name="content"
                          value={newsForm.content}
                          onChange={handleFormChange}
                          required
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="addImageUrl" className="form-label">Image URL</label>
                        <input
                          type="text"
                          className="form-control"
                          id="addImageUrl"
                          name="imageUrl"
                          value={newsForm.imageUrl}
                          onChange={handleFormChange}
                          placeholder="Optional: Enter image URL"
                        />
                      </div>
                      <div className="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Add News
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* DELETE Modal Content */}
              {deleteModalOpen && currentNews && (
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Deletion</h5>
                    <button type="button" className="btn-close" onClick={handleCancelClick} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete the news item: <strong>"{currentNews.title}"</strong>?</p>
                  </div>
                  <div className="modal-footer d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>
                      Cancel
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tabla de Noticias - Estilos Bootstrap */}
        <div className="table-responsive">
          <table className="table table-striped table-hover table-dark">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Photo</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-3">No news to display.</td>
                </tr>
              ) : (
                news.map((noticia) => (
                  <tr key={noticia.id}>
                    <td>{noticia.id}</td>
                    <td>
                      <img
                        src={noticia.imageUrl && noticia.imageUrl.trim() !== '' ? noticia.imageUrl : "https://via.placeholder.com/50"}
                        alt={noticia.title}
                        className="rounded-circle"
                        style={{ width: "50px", height: "50px", objectFit: "cover", border: "1px solid #ccc" }}
                      />
                    </td>
                    <td>{noticia.title}</td>
                    <td>{noticia.content.substring(0, 100)}{noticia.content.length > 100 ? '...' : ''}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditClick(noticia)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteClick(noticia)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Noticias;