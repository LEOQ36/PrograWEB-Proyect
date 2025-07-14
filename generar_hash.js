    // generar_hash.js
    import bcrypt from 'bcryptjs'; // CAMBIO CLAVE: Usar import
    // Si bcryptjs no tiene un export default, podría ser:
    // import * as bcrypt from 'bcryptjs';

    async function generarHash(password) {
      const salt = await bcrypt.genSalt(10); // Puedes ajustar el costo del salt
      const hash = await bcrypt.hash(password, salt);
      return hash;
    }

    // Ejemplo de uso
    const passwordOriginal = 'micontrasena123'; // <-- ¡CAMBIA ESTO POR LA CONTRASEÑA REAL!

    generarHash(passwordOriginal)
      .then(hash => {
        console.log('Contraseña original:', passwordOriginal);
        console.log('Hash generado:', hash);
      })
      .catch(error => {
        console.error('Error al generar el hash:', error);
      });
    