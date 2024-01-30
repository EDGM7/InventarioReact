Con el uso de Visual Studio y teniendo buena conexión de internet instala las dependencias básicas (npm install).
2.	Instalar el resto de las dependencias utilizadas.
    "axios": "^1.6.7",  
   "buffer": "^6.0.3",    
    "cors": "^2.8.5",    
    "express": "^4.18.2",
    "mysql": "^2.18.1",    
    "react": "^18.2.0",     
   "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.3",    
    "react-scripts": "^5.0.1",     
    "tailwindcss": "^3.4.1"
Instalar un servidor mysql local porque deberás instalar la base de datos inventariouvm, que te dejo disponible.
Una vez listo los pasos anteriores y teniendo el servicio de mysql en ejecución (en mi caso ya contaba con el servidor local XAMPP, lo que hice fue aprovechar el recurso y ejecutar solo mysql). Abrir con Visual Studio 2 terminales: 
En uno ejecutaras nmp start, y en el otro node server.js
Para confirmar si se levantaron bien en el terminal donde ejecutas npm start te saldrá un mensaje como el siguiente: wepack compiled successfully además te dara la url por donde veras tu proyecto online: http//localhost:3000

Para confirmar si se levantaron bien en el terminal donde ejecutas node server.js te saldrá un mensaje como el siguiente: Servidor en ejecución en el puerto 5000 y Conexión exitosa a la base de datos MySQL
