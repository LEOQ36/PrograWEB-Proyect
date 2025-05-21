
import React, { useState } from 'react';
import './UsuarioActualizacion.css'; 



interface DatosPerfil {
  firstName: string;
  lastName: string;
  email: string;
  archivoImagenPerfil?: File | null;
}


interface UsuarioActualizacionProps {
  show: boolean; 
  handleClose: () => void; 
  alGuardar?: (datos: DatosPerfil) => void; 
}


const UsuarioActualizacion: React.FC<UsuarioActualizacionProps> = ({ show, handleClose, alGuardar }) => {
  const [datosPerfil, setDatosPerfil] = useState<DatosPerfil>({
    firstName: '',
    lastName: '',
    email: '',
    archivoImagenPerfil: null,
  });


  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosPerfil({ ...datosPerfil, [name]: value });
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDatosPerfil({ ...datosPerfil, archivoImagenPerfil: file });


      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setDatosPerfil({ ...datosPerfil, archivoImagenPerfil: null });
      setPreviewImageUrl(null);
    }
  };


  const handleGuardar = () => {
    console.log('Datos de perfil actualizados:', datosPerfil);
    if (alGuardar) {
      alGuardar(datosPerfil); 
    }
    handleClose(); 
  };


  if (!show) {
    return null;
  }


  return (
   
    <div className="modal fade show d-block custom-modal-overlay" tabIndex={-1}> 
      
      <div className="custom-modal-dialog">

        <div className="custom-modal-content">

          <div className="custom-modal-header">
            <h5 className="modal-title">Actualizar Información de Usuario</h5> 
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button> 
          </div>



          <div className="custom-modal-body">
            <form>
              <div className="row"> 
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center mb-3 profile2image-section">
                  <div className="position-relative" style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#6c757d', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {previewImageUrl ? (
                      <img src={previewImageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span className="placeholder-image-text-custom">Your Profile Image</span>
                    )}
                  </div>
                  <div className="mb-3 mt-3 w-100">
                    <label htmlFor="formProfileImage" className="text-center w-100 custom-form-label">Upload Profile Image</label> 
                    <input
                      type="file"
                      className="custom-form-control" 
                      id="formProfileImage"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>
                </div>



                <div className="col-md-6"> 
                  <div className="mb-3">
                    <label htmlFor="formFirstName" className="custom-form-label">Nombre</label> 
                    <input
                      type="text"
                      className="custom-form-control" 
                      id="formFirstName"
                      placeholder="Ingresa tu nombre"
                      name="firstName"
                      value={datosPerfil.firstName}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="mb-3">
                    <label htmlFor="formLastName" className="custom-form-label">Apellido</label>
                    <input
                      type="text"
                      className="custom-form-control" 
                      id="formLastName"
                      placeholder="Ingresa tu apellido"
                      name="lastName"
                      value={datosPerfil.lastName}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="mb-3">
                    <label htmlFor="formEmail" className="custom-form-label">Email</label> 
                    <input
                      type="email"
                      className="custom-form-control" 
                      id="formEmail"
                      placeholder="Ingresa tu email"
                      name="email"
                      value={datosPerfil.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>


          <div className="custom-modal-footer">
            <button type="button" className="custom-btn custom-btn-secondary" onClick={handleClose}> 
              Cancelar
            </button>
            <button type="button" className="custom-btn custom-btn-primary" onClick={handleGuardar}> 
              Guardar Información
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UsuarioActualizacion;

