import React from 'react';

class Contacto extends React.Component {
  render() {
    return (
      <div className="container mx-auto">
        <div className="mt-8 md:flex md:justify-between">

          {/* Sección Izquierda - Dirección */}
          <div className="seccion-contacto md:w-1/3 md:mx-2 my-4 p-4 bg-custom-color text-white">
            <h2 className="text-lg font-bold mb-4">DIRECCIÓN</h2>
            <p className="text-sm md:text-base">AV. Independencia con calle La Paz, sede Mirabel, Urbanización Mirabel Plata I, diagonal al parque Sapnnaet. Valera Edo. Trujillo-Venezuela.</p>
          </div>

          {/* Sección Central - Teléfonos */}
          <div className="seccion-contacto md:w-1/3 md:mx-2 my-4 p-4 bg-custom-color text-white">
            <h2 className="text-lg font-bold mb-4">TELÉFONOS</h2>
            <p className="text-sm md:text-base">
              Admisión: +58-0412-5833189<br />
              Cobranzas: +58-0424-7539480 <br />
              Control de Estudios: +58-0426-1381631<br />
              Postgrado: +58-0412-6808061
            </p>
          </div>

          {/* Sección Derecha - Horario de Atención Sedes */}
          <div className="seccion-contacto md:w-1/3 md:mx-2 my-4 p-4 bg-custom-color text-white">
            <h2 className="text-lg font-bold mb-4">HORARIO DE ATENCIÓN SEDES</h2>
            <p className="text-sm md:text-base">De Lunes a Viernes 08:00 am a 03:00 pm en horario corrido</p>
          </div>

        </div>

        {/* Sección Inferior - Redes Sociales */}
        <div className="seccion-contacto-inferior bg-custom-color text-white my-4 p-4 text-center">
          <span className="text-lg md:text-xl mr-2">SIGUENOS EN:</span>

          {/* Facebook */}
          <a href="https://www.facebook.com/univalledelmomboy/" className="red-social-icon">
            <img src="./imagenes/face48.png" alt="Facebook" className="inline-block mx-2" />
          </a>

          {/* Twitter */}
          <a href="https://twitter.com/univallemomboy?lang=es" className="red-social-icon">
            <img src="./imagenes/twi48.png" alt="Twitter" className="inline-block mx-2" />
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/univalledelmomboy/?hl=es" className="red-social-icon">
            <img src="./imagenes/insta48.png" alt="Instagram" className="inline-block mx-2" />
          </a>
        </div>
      </div>
    );
  }
}

export default Contacto;
