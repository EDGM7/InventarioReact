import React from 'react';

class Historia extends React.Component {
  render() {
    return (      
      <div className="flex space-x-8 p-4 border bg-green-500 bg-opacity-75">
        {/* Sección de texto */}
        <div className="w-1/2 bg-white p-8 rounded">
          <h1 className="text-2xl font-bold mb-4 text-green-500">Historia de la Universidad</h1>
          <p style={{ textAlign: 'justify' }}>
          Gracias a su meritoria trayectoria el 16 de diciembre de 1872, mediante Decreto No. 1.787 del Presidente Antonio Guzmán Blanco, se transforma en la Universidad de Trujillo, y a partir de 1873 comenzó a otorgar títulos profesionales en ciencias políticas, ciencias eclesiásticas y ciencias médicas. Lamentablemente fue cerrado en el año de 1900 por el Presidente Cipriano Castro y pierde sus cuantiosos bienes.

En la historia de la educación superior trujillana cuenta la iniciativa privada de creación en 1923 de la Escuela de Ciencias Políticas. Poco después y ante las dificultades para su sostenimiento se adscribe a la Gobernación del Estado y bajo la tutela académica de la Universidad de Los Andes. Tras también una meritoria labor, pero penetrada por los vicios de la politiquería, cierra definitivamente sus puertas en 1947. El 7 de octubre de 1958 la Universidad de Los Andes inicia los estudios universitarios en la ciudad de Valera .

Con la creación de algunas cátedras de medicina en el Hospital Central de Valera. Más tarde y luego de una lucha sostenida por la comunidad trujillana, respaldada en Mérida por la Asociación de Estudiantes Trujillanos, el 7 de octubre de 1972 la Universidad de Los Andes crea el Núcleo Universitario Rafael Rangel en la ciudad de Trujillo, con carreras de Educación y luego Ingeniería Agrícola, Administración y otras.
      
          </p>
        </div>

       
        <div className="w-1/2">
          <img
            src="./imagenes/historia-1.jpg"
            alt="Historia"
            className="w-full h-auto"
          />
        </div>
      </div>
    );
  }
}

export default Historia;
